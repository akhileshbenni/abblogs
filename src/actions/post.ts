"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to post.");
  }

  const content = formData.get("content") as string;
  const media = formData.get("media") as File | null;

  if ((!content || content.trim().length === 0) && (!media || media.size === 0)) {
    throw new Error("Post cannot be empty.");
  }

  let mediaUrl: string | null = null;
  let mediaType: string | null = null;

  if (media && media.size > 0) {
    const bytes = await media.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueFileName = `${Date.now()}-${media.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueFileName);
    
    await fs.writeFile(uploadPath, buffer);
    mediaUrl = `/uploads/${uniqueFileName}`;
    mediaType = media.type;
  }

  await prisma.post.create({
    data: {
      content: content || "",
      mediaUrl,
      mediaType,
      authorId: session.user.id,
    },
  });

  revalidatePath("/");
}

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to like.");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
  }

  revalidatePath("/");
}
