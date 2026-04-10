import PostBox from "@/components/PostBox";
import FeedItem from "@/components/FeedItem";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      likes: true,
    },
  });

  return (
    <>
      <div className="glass-header">
        <h1 style={{ fontSize: "20px", fontWeight: "700" }}>Home</h1>
      </div>
      <PostBox />
      <div>
        {posts.map((post: any) => (
          <FeedItem
            key={post.id}
            post={post}
            currentUserId={(session?.user as any)?.id}
          />
        ))}
      </div>
    </>
  );
}
