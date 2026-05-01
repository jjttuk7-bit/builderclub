import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getBuilderWorkspace } from "@/lib/mock-db";
import styles from "./page.module.css";

type BuilderRoomPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function BuilderRoomPage({ params }: BuilderRoomPageProps) {
  const { handle } = await params;
  const workspace = getBuilderWorkspace(handle);

  if (!workspace) {
    return (
      <AppShell>
        <PageHeader
          eyebrow="Builder Room"
          title="빌더룸을 찾을 수 없습니다"
          description="존재하지 않는 빌더입니다."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Builder Room"
        title="빌더룸"
        description="빌더의 프로젝트, 작업 기록, 막힌 부분, 피드백, 다음 작업을 모아보는 개인 작업 공간입니다."
      />
      <section className={styles.workspace} aria-label="빌더룸 작업 현황">
        <article className={styles.panel}>
          <h2>{workspace.focus}</h2>
          <h3>{workspace.name}</h3>
          <p>{workspace.summary}</p>
        </article>
        <article className={styles.panel}>
          <h2>다음 액션</h2>
          <ul className={styles.actions}>
            {workspace.nextActions.map((action) => (
              <li key={action.href}>
                <Link href={action.href}>{action.label}</Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
