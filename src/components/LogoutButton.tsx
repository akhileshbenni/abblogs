"use client";

import { signOut } from "next-auth/react";
import styles from "./Sidebar.module.css";

export default function LogoutButton() {
  return (
    <button 
      className={styles.logoutButton} 
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24">
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm11 6l-4 4v-3H9v-2h4V8l4 4z"></path>
      </svg>
      <span>Log out</span>
    </button>
  );
}
