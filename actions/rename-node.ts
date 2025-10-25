"use server";

import prisma from "@/db";
import { RenameNode } from "@/types";

export default async function renameNode({ newName, nodeId }: RenameNode) {
  const newNode = await prisma.collection.update({
    where: {
      id: nodeId,
    },
    data: {
      name: newName,
    },
  });

  return newNode;
}
