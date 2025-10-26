import { openai } from "@ai-sdk/openai";
import {
  UIMessage,
  streamText,
  convertToModelMessages,
  stepCountIs,
  validateUIMessages,
  tool,
  Experimental_Agent as Agent,
  Experimental_InferAgentUIMessage as InferAgentUIMessage,
  TypedToolCall,
  TypedToolResult,
  NoSuchToolError,
  InvalidToolInputError,
} from "ai";
import { systemInstruction } from "@/lib/prompt";
import { z } from "zod";
import { RouteMethod } from "@/lib/constant";
import prisma from "@/db";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// export async function POST(req: Request) {
// const {
//   messages,
//   model,
//   webSearch,
// }: {
//   messages: UIMessage[];
//   model: string;
//   webSearch: boolean;
// } = await req.json();

//   const result = streamText({
//     model: webSearch ? "perplexity/sonar" : openai(model),
// messages: convertToModelMessages(messages),
//     system:
//       "You are a helpful assistant that can answer questions and help with tasks",
//   });

//   // send sources and reasoning back to the client
//   return result.toUIMessageStreamResponse({
//     sendSources: true,
//     sendReasoning: true,
//   });
// }

// const userId = "123";
// const collectionId = "123";

const toolSet = {
  createMockRoute: tool({
    description: "Create a new Mock endpoint for the user",
    inputSchema: z.object({
      userId: z
        .string()
        .describe("a valid id of user for creating mock routes"),
      method: z
        .enum(RouteMethod)
        .describe("supported http method for api routes"),
      path: z.string().describe("mock api path"),
      response: z.object({}).describe("api response"),
    }),
    execute: async (
      { method, path, response },
      { experimental_context: context }
    ) => {
      const { userId, collectionId } = context as {
        userId: string;
        collectionId: string;
      };

      const route = await prisma.mockRoute.create({
        data: {
          userId: userId,
          collectionId: collectionId,
          method: method,
          path: path,
          response: response,
        },
      });
      return {
        message: "Mock route created",
        route: route,
      };
    },
  }),
  updateMockRoute: tool({
    description: "Update an existing Mock API endpoint for the user",
    inputSchema: z.object({
      method: z
        .enum(RouteMethod)
        .describe("The updated new http method of mock api route"),
      path: z.string().describe("The updated new path of the mock api route"),
      response: z
        .object({})
        .describe("The updated new response of the mock api route"),
    }),
    execute: async (
      { method, path, response },
      { experimental_context: context }
    ) => {
      const { userId, collectionId } = context as {
        userId: string;
        collectionId: string;
      };

      const route = await prisma.mockRoute.updateMany({
        where: {
          userId: userId,
          collectionId: collectionId,
        },
        data: {
          method: method,
          path: path,
          response: response,
        },
      });
      return {
        message: "Route updated successfully",
        updatedRoute: route,
      };
    },
  }),
  listMockRoute: tool({
    description: "List all mock API's of user for the current api collection",
    inputSchema: z.object({}),
    execute: async ({ experimental_context: context }) => {
      const { userId, collectionId } = context as {
        userId: string;
        collectionId: string;
      };

      const route = await prisma.mockRoute.findMany({
        where: {
          userId: userId,
          collectionId: collectionId,
        },
      });
      return {
        message: "Fetched all mock api routes",
        route: route,
      };
    },
  }),
};

export async function POST(req: Request) {
  const {
    message,
    model,
    webSearch,
    nodeId,
  }: {
    message: UIMessage;
    model: string;
    webSearch: boolean;
    nodeId: string;
  } = await req.json();

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    // TODD : remove this hard coded id
    const collectionId = nodeId || "2e900b7a-aed4-4dd7-8737-a4e43f0f9725";

    // load previous messages from database
    const previousMessages = await prisma.message.findMany({
      where: {
        userId: userId,
        collectionId: collectionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const messages = [...previousMessages, message];

    // const validatedMessages = await validateUIMessages({
    //   messages: [...previousMessages, message],
    //   // @ts-ignore
    //   tools: toolSet,
    // });

    // save the user message in db
    console.log("messages recieved from client is", message);
    console.log("text is", message.parts[0].type);
    // @ts-ignore
    const userMessage = message.parts[0].text;
    await prisma.message.create({
      data: {
        userId: userId,
        collectionId: collectionId,
        content: JSON.stringify(userMessage),
        role: "USER",
      },
    });

    // TODO : add web search tool later on

    const result = streamText({
      model: model ? openai(model) : openai("gpt-4o"),
      system: systemInstruction,
      stopWhen: stepCountIs(10),
      messages: convertToModelMessages(messages),
      tools: toolSet,
      experimental_context: {
        userId: userId,
        collectionId: collectionId,
      },
    });

    result.consumeStream();

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ messages }) => {
        console.log("messages is :", JSON.stringify(messages));

        const assistantMsg = messages.findLast((m) => m.role === "assistant");
        console.log("assistant msg is", assistantMsg);

        await prisma.message.create({
          data: {
            userId: userId,
            collectionId: collectionId,
            role: "ASSISTANT",
            content: JSON.stringify(assistantMsg),
          },
        });
      },
      onError: (error) => {
        if (NoSuchToolError.isInstance(error)) {
          return "The model tried to call a unknown tool.";
        } else if (InvalidToolInputError.isInstance(error)) {
          return "The model called a tool with invalid inputs.";
        } else {
          return "An unknown error occurred.";
        }
      },
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
