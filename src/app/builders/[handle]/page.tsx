import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getBuilderByHandle, getProjectsByBuilderName } from "@/lib/mock-db";
import styles from "./page.module.css";

type BuilderRoomPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function BuilderRoomPage({ params }: BuilderRoomPageProps) {
  const { handle } = await params;
  const builder = getBuilderByHandle(handle);

  if (!builder) {
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

  const projects = getProjectsByBuilderName(builder.display_name);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Builder Room"
        title={`${builder.display_name}의 빌더룸`}
        description={builder.bio || "빌더의 프로젝트, 작업 기록, 막힌 부분, 피드백을 모아보는 공간입니다."}
      />
      
      <section className={styles.profilePanel}>
        <div className={styles.tagsGroup}>
          <div className={styles.tagList}>
            <strong>관심사</strong>
            {builder.interests?.map(i => <span key={i} className={styles.tag}>{i}</span>)}
          </div>
          <div className={styles.tagList}>
            <strong>사용 도구</strong>
            {builder.tools?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.workspace} aria-label="진행 중인 프로젝트">
        <CardSection
          title="내 프로젝트"
          description={`${builder.display_name}님이 현재 진행 중인 프로젝트 목록입니다.`}
          items={projects}
        />
      </section>
    </AppShell>
  );
}
