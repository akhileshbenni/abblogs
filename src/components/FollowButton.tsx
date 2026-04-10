"use client";

import { useState } from "react";
import { toggleFollow } from "@/actions/follow";

type Props = {
  targetUserId: string;
  initialIsFollowing: boolean;
};

export default function FollowButton({ targetUserId, initialIsFollowing }: Props) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);

  const handleFollowToggle = async () => {
    setIsPending(true);
    // Optimistic UI update
    setIsFollowing(!isFollowing);

    try {
      await toggleFollow(targetUserId);
    } catch (error) {
      console.error(error);
      setIsFollowing(isFollowing); // Revert on failure
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isPending}
      className={isFollowing ? "btn-secondary" : "btn-primary"}
      style={{
        padding: '6px 16px',
        fontWeight: 'bold',
        minWidth: '100px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        opacity: isPending ? 0.7 : 1,
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
