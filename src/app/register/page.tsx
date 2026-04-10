"use client";

import { registerUser } from "@/actions/auth";
import Link from "next/link";
import { useState } from "react";
import styles from "./auth.module.css";

export default function RegisterPage() {
  const [error, setError] = useState("");

  async function clientAction(formData: FormData) {
    try {
      await registerUser(formData);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.logo}>
          <span style={{ fontSize: '32px', fontWeight: '900', color: 'var(--foreground)' }}>AB</span>
        </div>
        <h1 className={styles.title}>Join today.</h1>
        <form action={clientAction} className={styles.form}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            className="input-base"
          />
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
            Create account
          </button>
        </form>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
