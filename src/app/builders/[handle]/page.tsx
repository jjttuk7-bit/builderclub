import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { sampleBuilderWorkspace } from "@/data/sample-content";
import styles from "./page.module.css";

export default function BuilderRoomPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Builder Room"
        title="빌더룸"
        description="빌더의 프로젝트, 작업 기록, 막힌 부분, 피드백, 다음 작업을 모아보는 개인 작업 공간입니다."
      />
      <section className={styles.workspace} aria-label="빌더룸 작업 현황">
        <article className={styles.panel}>
          <h2>{sampleBuilderWorkspace.focus}</h2>
          <h3>{sampleBuilderWorkspace.name}</h3>
          <p>{sampleBuilderWorkspace.summary}</p>
        </article>
        <article className={styles.panel}>
          <h2>다음 액션</h2>
          <ul className={styles.actions}>
            {sampleBuilderWorkspace.nextActions.map((action) => (
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
