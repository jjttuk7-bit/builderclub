export const dynamic = "force-dynamic";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getBuilderByHandle } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

type BuilderRoomPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function BuilderRoomPage({ params }: BuilderRoomPageProps) {
  const { handle } = await params;
  let builder = getBuilderByHandle(handle);

  if (!builder && supabase) {
    const { data } = await supabase
      .from("builders")
      .select("*")
      .eq("handle", handle)
      .single();
    if (data) {
      builder = data;
    }
  }

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

  return (
    <AppShell>
      <PageHeader
        eyebrow="Builder Room"
        title={`${builder.display_name}의 빌더룸`}
        description={builder.bio || "빌더의 작업 기록, 막힌 부분, 피드백을 모아보는 공간입니다."}
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

      <section className={styles.workspace} aria-label="빌더 활동">
        <header className={styles.sectionHeader}>
          <div>
            <h2>빌더 활동</h2>
            <p>{builder.display_name}님의 최근 활동과 기록을 확인하세요.</p>
          </div>
        </header>

        <div className={styles.activityGrid}>
          <div className={styles.activityCard}>
            <h3>빌드로그</h3>
            <p>프로젝트 진행 과정과 학습 내용을 기록합니다.</p>
            <Link href="/logs" className={styles.activityLink}>보러가기 →</Link>
          </div>
          <div className={styles.activityCard}>
            <h3>질문</h3>
            <p>막힌 부분이나 궁금한 점을 공유합니다.</p>
            <Link href="/questions" className={styles.activityLink}>보러가기 →</Link>
          </div>
          <div className={styles.activityCard}>
            <h3>피드백</h3>
            <p>프로젝트에 대한 조언을 구합니다.</p>
            <Link href="/feedback" className={styles.activityLink}>보러가기 →</Link>
          </div>
          <div className={styles.activityCard}>
            <h3>지식 공유</h3>
            <p>배운 내용을 다른 빌더들과 공유합니다.</p>
            <Link href="/knowledge" className={styles.activityLink}>보러가기 →</Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
