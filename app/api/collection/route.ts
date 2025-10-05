// import prisma from "@/db";

// export async function POST(request: Request) {
//   try {
//     const name = await request.json();

//     console.log("collection name is", name);

//     if (!name) {
//       throw new Error("Collection name is required");
//     }

//     const collection = await prisma.collection.create({
//       data: {
//         name,
//       },
//     });

//     return Response.json(collection);
//   } catch (error) {
//     console.error("Error is", error);

//     return new Response("Internal server error", {
//       status: 500,
//     });
//   }
// }
