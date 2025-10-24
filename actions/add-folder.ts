"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth/auth-server";
import { FolderType } from "@/types";
import { headers } from "next/headers";

export async function addFolder({ name, parentId, type }: FolderType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const folder = await prisma.collection.create({
    data: {
      name: name,
      parentId: parentId as string,
      type: type,
      userId: userId as string,
    },
  });

  return folder;
}
