"use client";

import { useRef, useState } from "react";
import styles from "./EditProfileModal.module.css";
import { updateProfile } from "@/actions/profile";

type Props = {
  user: {
    name: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    image: string | null;
    coverImage: string | null;
  };
  onClose: () => void;
};

export default function EditProfileModal({ user, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [avatarName, setAvatarName] = useState<string | null>(null);
  const [coverName, setCoverName] = useState<string | null>(null);

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
            </svg>
          </button>
          <h2 className={styles.title}>Edit profile</h2>
          <button 
            type="submit" 
            form="edit-profile-form" 
            className="btn-primary" 
            style={{ padding: '6px 16px', minWidth: '0' }}
            disabled={isPending}
          >
            Save
          </button>
        </div>

        <form id="edit-profile-form" ref={formRef} action={action} className={styles.formContent}>
          {/* Cover upload */}
          <div className={styles.coverUploadArea} style={{ backgroundImage: user.coverImage ? `url(${user.coverImage})` : 'var(--hover)' }}>
            <label className={styles.uploadBtn}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 4.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z"></path>
                <path d="M19 6h-3.586l-1.707-1.707c-.188-.188-.442-.293-.707-.293h-2c-.265 0-.52.105-.707.293L8.586 6H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm0 12H5V8h4.414l1.707-1.707h1.758l1.707 1.707H19v10z"></path>
              </svg>
              <input type="file" name="coverImage" accept="image/*" style={{display: 'none'}} onChange={(e) => setCoverName(e.target.files?.[0]?.name || null)} />
            </label>
            {coverName && <span className={styles.fileName}>{coverName}</span>}
          </div>

          {/* Avatar upload */}
          <div className={styles.avatarUploadArea}>
            <div className={styles.avatarWrapper}>
              <img src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || "User"}`} alt="Avatar" className={styles.avatarPreview} />
              <div className={styles.avatarOverlay}>
                <label className={styles.uploadBtn}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 4.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z"></path>
                    <path d="M19 6h-3.586l-1.707-1.707c-.188-.188-.442-.293-.707-.293h-2c-.265 0-.52.105-.707.293L8.586 6H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm0 12H5V8h4.414l1.707-1.707h1.758l1.707 1.707H19v10z"></path>
                  </svg>
                  <input type="file" name="avatar" accept="image/*" style={{display: 'none'}} onChange={(e) => setAvatarName(e.target.files?.[0]?.name || null)} />
                </label>
              </div>
            </div>
            {avatarName && <span className={styles.fileName}>{avatarName}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input type="text" name="name" defaultValue={user.name || ""} placeholder="Name" required />
          </div>
          
          <div className={styles.inputGroup}>
            <textarea name="bio" defaultValue={user.bio || ""} placeholder="Bio" rows={3}></textarea>
          </div>

          <div className={styles.inputGroup}>
            <input type="text" name="location" defaultValue={user.location || ""} placeholder="Location" />
          </div>

          <div className={styles.inputGroup}>
            <input type="url" name="website" defaultValue={user.website || ""} placeholder="Website" />
          </div>
        </form>
      </div>
    </div>
  );
}
