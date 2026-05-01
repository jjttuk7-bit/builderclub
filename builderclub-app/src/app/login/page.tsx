"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/dashboard");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/dashboard");
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: nextPath,
    });

    if (result?.error) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    } else {
      router.push(nextPath);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Members Only</p>
        <h1>빌더클럽 로그인</h1>
        <p>클럽 멤버만 대시보드와 개인 빌더룸에 접근할 수 있습니다.</p>
        <p className={styles.hint}>이메일과 비밀번호로 로그인하세요.</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">
            이메일
            <input id="email" name="email" type="email" defaultValue="builder-a@builderclub.local" required />
          </label>
          <label htmlFor="password">
            비밀번호
            <input id="password" name="password" type="password" required />
          </label>
          <button type="submit">로그인</button>
        </form>
      </section>
    </main>
  );
}
