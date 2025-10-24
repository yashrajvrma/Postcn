"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth/auth-server";
import { RequestType } from "@/types";
import { headers } from "next/headers";

export async function addRequest({ name, parentId, type }: RequestType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const request = await prisma.collection.create({
    data: {
      userId: userId as string,
      name: name,
      type: type,
      parentId: String(parentId),
    },
  });

  return request;
}
