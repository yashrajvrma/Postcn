import prisma from "@/db";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const fetchAllCollections = await prisma.collection.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        type: true,
        parentId: true,
      },
    });

    const collection = fetchAllCollections.map((item) => ({
      id: item.id,
      parent: item.parentId ?? 0,
      text: item.name,
      data: { type: item.type },
    }));

    return Response.json({
      message: "Collection fetched successfully",
      collection,
    });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
