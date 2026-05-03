"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원가입에 실패했습니다.");
      }

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Join Builders</p>
        <h1>빌더클럽 회원가입</h1>
        <p className={styles.hint}>나만의 빌드로그를 작성하고 지식을 공유하세요.</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">
            이메일
            <input id="email" name="email" type="email" required />
          </label>
          <label htmlFor="password">
            비밀번호
            <input id="password" name="password" type="password" minLength={6} required />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "가입 중..." : "가입하기"}
          </button>
        </form>
        <p className={styles.loginLink}>
          이미 계정이 있으신가요? <Link href="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}
