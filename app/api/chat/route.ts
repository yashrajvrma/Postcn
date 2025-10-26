import { streamText, UIMessage, convertToModelMessages } from "ai";
import { tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { Experimental_Agent as Agent } from "ai";
import { validateUIMessages } from "ai";
import { systemInstruction } from "@/lib/prompt";
import { z } from "zod";
import { RouteMethod } from "@/lib/constant";
import { method } from "lodash";

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
//     messages: convertToModelMessages(messages),
//     system:
//       "You are a helpful assistant that can answer questions and help with tasks",
//   });

//   // send sources and reasoning back to the client
//   return result.toUIMessageStreamResponse({
//     sendSources: true,
//     sendReasoning: true,
//   });
// }

const tools = {
  createMockRoute: tool({
    description: "Create a new Mock endpoint for the user",
    inputSchema: z.object({
      method: z.enum(RouteMethod),
      path: z.string(),
      response: z.object({}),
    }),
    execute : async ({}) => {
      await 
    }
  }),
  updateMockRoute: tool({
    description: "Update an existing Mock API endpoint for the user",
    inputSchema: z.object({
      method: z.enum(RouteMethod),
      path: z.string(),
      response: z.object({}),
    }),
  }),
  listMockRoute: tool({
    description: "List all mock API's of the current chat",
    inputSchema: z.object({}),
  }),
};

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
  } = await req.json();

  // TODO : add web search tool later on

  const agent = new Agent({
    model: openai(model),
    system: systemInstruction,
  });

  return agent.respond({
    messages: await validateUIMessages({ messages }),
  });
}
