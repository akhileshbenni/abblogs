"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const website = formData.get("website") as string;

  const avatarFile = formData.get("avatar") as File | null;
  const coverFile = formData.get("coverImage") as File | null;

  const updateData: any = {
    name: name || null,
    bio: bio || null,
    location: location || null,
    website: website || null,
  };

  const saveFile = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueFileName);
    await fs.writeFile(uploadPath, buffer);
    return `/uploads/${uniqueFileName}`;
  };

  if (avatarFile && avatarFile.size > 0) {
    updateData.image = await saveFile(avatarFile);
  }

  if (coverFile && coverFile.size > 0) {
    updateData.coverImage = await saveFile(coverFile);
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  });

  revalidatePath("/profile");
}
