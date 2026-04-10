"use client";

import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

type Props = {
  user: any;
};

export default function EditProfileModalWrapper({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="btn-secondary" 
        style={{ padding: '6px 16px', fontWeight: 'bold' }}
        onClick={() => setIsOpen(true)}
      >
        Edit profile
      </button>

      {isOpen && (
        <EditProfileModal user={user} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
