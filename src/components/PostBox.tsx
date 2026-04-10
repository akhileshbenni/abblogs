"use client";

import { createPost } from "@/actions/post";
import { useRef, useState } from "react";
import styles from "./PostBox.module.css";
import { useSession } from "next-auth/react";

export default function PostBox() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!session) {
    return (
      <div className={styles.loginPrompt}>
        <p>Log in to join the conversation.</p>
      </div>
    );
  }

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      await createPost(formData);
      formRef.current?.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={styles.postBox}>
      <div className={styles.avatar}>
        {session.user?.name?.charAt(0).toUpperCase()}
      </div>
      <form ref={formRef} action={action} className={styles.form}>
        <textarea
          name="content"
          className={styles.textarea}
          placeholder="What is happening?!"
          maxLength={280}
        />
        <div className={styles.formFooter}>
          <div className={styles.actions}>
            <label className={styles.mediaUploadLbl}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </svg>
              <input type="file" name="media" accept="image/*,video/*" style={{display: 'none'}} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            </label>
            {selectedFile && <span style={{fontSize: '13px', marginLeft: '8px', color: 'var(--primary)'}}>{selectedFile.name}</span>}
          </div>
          <button
            type="submit"
            className={`btn-primary ${styles.submitBtn}`}
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
