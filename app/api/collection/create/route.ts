import prisma from "@/db";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/signin");
    }

    console.log("collection name is", name);

    if (!name) {
      return new Response("Collection name is required", {
        status: 400,
      });
    }

    const userId = session.user.id;

    const collection = await prisma.collection.create({
      data: {
        name,
        userId,
        type: "FOLDER",
      },
    });

    return Response.json({
      message: "Collection created successfully",
      collection,
    });
  } catch (error) {
    console.error("Error is", error);

    return new Response("Internal server error", {
      status: 500,
    });
  }
}
