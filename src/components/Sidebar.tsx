import Link from 'next/link';
import LogoutButton from './LogoutButton';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--foreground)' }}>AB</span>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <g>
              <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318 1.054 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
            </g>
          </svg>
          <span className={styles.navText}>Home</span>
        </Link>
        <Link href="/profile" className={styles.navLink}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <g>
              <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4s-4-1.79-4-4z"></path>
            </g>
          </svg>
          <span className={styles.navText}>Profile</span>
        </Link>
      </nav>

      <button className={`btn-primary ${styles.postButton}`}>
        <span>Post</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={styles.postIcon}>
          <g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g>
        </svg>
      </button>

      {/* User profile section at the bottom would go here */}
      <div className={styles.bottomSection}>
        <LogoutButton />
      </div>
    </div>
  );
}
