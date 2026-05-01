import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

async function loginAction(formData: FormData) {
  "use server";

  const nextPath = String(formData.get("next") || "/dashboard");
  const cookieStore = await cookies();

  cookieStore.set("builderclub_session", "builder-a", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect(nextPath.startsWith("/") ? nextPath : "/dashboard");
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const nextPath = params.next || "/dashboard";

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>Members Only</p>
        <h1>빌더클럽 로그인</h1>
        <p>클럽 멤버만 대시보드와 개인 빌더룸에 접근할 수 있습니다.</p>
        <p className={styles.hint}>현재 프로토타입은 빌더 A로 입장하는 목업 로그인입니다.</p>
        <form action={loginAction} className={styles.form}>
          <input type="hidden" name="next" value={nextPath} />
          <label htmlFor="email">
            이메일
            <input id="email" name="email" defaultValue="builder-a@builderclub.local" />
          </label>
          <button type="submit">빌더 A로 입장</button>
        </form>
      </section>
    </main>
  );
}
