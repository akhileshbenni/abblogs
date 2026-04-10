import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FeedItem from "@/components/FeedItem";
import styles from "../page.module.css";
import EditProfileModalWrapper from "@/components/EditProfileModalWrapper";
import FollowButton from "@/components/FollowButton";

export default async function DynamicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!(session?.user as any)?.id) {
    redirect("/login");
  }

  const currentUserId = (session?.user as any).id;
  const isOwnProfile = currentUserId === id;

  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          likes: true,
        },
      },
      followers: true,
      following: true,
    },
  });

  if (!user) {
    return <div style={{padding: '24px', textAlign: 'center'}}>User not found</div>;
  }

  const isFollowing = user.followers.some((f: any) => f.followerId === currentUserId);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>{user.name}</h1>
        <span className={styles.subtitle}>{user.posts.length} posts</span>
      </div>
      
      <div className={styles.coverImage} style={{ backgroundImage: (user as any).coverImage ? `url(${(user as any).coverImage})` : 'var(--hover)', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      
      <div className={styles.profileInfo}>
        <div className={styles.profileHeaderRow}>
          <img 
            src={(user as any).image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
            alt="Profile" 
            className={styles.avatar} 
            style={{ marginTop: '-60px', border: '4px solid var(--background)', width: '130px', height: '130px', borderRadius: '50%' }}
          />
          {isOwnProfile ? (
            <EditProfileModalWrapper user={user} />
          ) : (
            <FollowButton targetUserId={user.id} initialIsFollowing={isFollowing} />
          )}
        </div>

        <div className={styles.userDetails}>
          <h2 className={styles.userName}>{user.name}</h2>
          <span className={styles.userHandle}>@{user.name?.toLowerCase().replace(/\s/g, '')}</span>
          <div style={{ marginTop: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {user.email}
          </div>
        </div>

        {(user as any).bio && <p className={styles.bio} style={{marginTop: '12px', fontSize: '15px'}}>{(user as any).bio}</p>}

        <div style={{display: 'flex', gap: '16px', marginTop: '12px', color: 'var(--text-muted)', fontSize: '15px'}}>
          {(user as any).location && (
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="18" height="18"><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></svg>
              <span>{(user as any).location}</span>
            </div>
          )}
          {(user as any).website && (
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="18" height="18"><path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path></svg>
              <a href={(user as any).website} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>{(user as any).website.replace(/^https?:\/\//, '')}</a>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
          <span style={{ fontSize: '15px' }}>
            <strong style={{ color: 'var(--foreground)' }}>{user.following.length}</strong> <span style={{ color: '#71767b' }}>Following</span>
          </span>
          <span style={{ fontSize: '15px' }}>
            <strong style={{ color: 'var(--foreground)' }}>{user.followers.length}</strong> <span style={{ color: '#71767b' }}>Followers</span>
          </span>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', display: 'flex', marginTop: '16px' }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '16px', borderBottom: '4px solid var(--primary)', fontWeight: 'bold' }}>
          Posts
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '16px', color: '#71767b' }}>Replies</div>
        <div style={{ flex: 1, textAlign: 'center', padding: '16px', color: '#71767b' }}>Likes</div>
      </div>

      <div>
        {user.posts.map((post: any) => (
          <FeedItem
            key={post.id}
            post={post}
            currentUserId={(session?.user as any)?.id}
          />
        ))}
      </div>
    </main>
  );
}
