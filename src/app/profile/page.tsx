import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FeedItem from "@/components/FeedItem";
import styles from "./page.module.css";
import EditProfileModalWrapper from "@/components/EditProfileModalWrapper";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!(session?.user as any)?.id) {
    redirect("/login");
  }

  redirect(`/profile/${(session?.user as any).id}`);
}
