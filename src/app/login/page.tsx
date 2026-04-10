"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../register/auth.module.css";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Email or Password");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.logo}>
          <span style={{ fontSize: '32px', fontWeight: '900', color: 'var(--foreground)' }}>AB</span>
        </div>
        <h1 className={styles.title}>Sign in to AB Blogs</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input-base"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input-base"
          />
          {error && <p className="text-error">{error}</p>}
          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Log in
          </button>
        </form>
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
