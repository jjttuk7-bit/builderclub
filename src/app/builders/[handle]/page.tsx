export const dynamic = "force-dynamic";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getBuilderByHandle, getProjectsByBuilderName } from "@/lib/mock-db";
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

  let projects = getProjectsByBuilderName(builder.display_name);

  if (supabase) {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("*")
      .eq("builder_id", builder.id)
      .order("created_at", { ascending: false });
    
    if (dbProjects) {
      const dbMappedProjects = dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        href: `/projects/${p.id}`,
        status: p.status,
        author: p.author,
        tags: p.tags
      }));
      projects = [...dbMappedProjects, ...projects.filter(p => !dbMappedProjects.some(dbP => dbP.title === p.title))];
    }
  }

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
        <header className={styles.sectionHeader}>
          <div>
            <h2>내 프로젝트</h2>
            <p>{builder.display_name}님이 현재 진행 중인 프로젝트 목록입니다.</p>
          </div>
          <Link href="/projects/new" className={styles.createProjectBtn}>
            + 새 프로젝트 시작하기
          </Link>
        </header>

        <div className={styles.projectsGrid}>
          <CardSection
            title=""
            description=""
            items={projects}
          />
        </div>
      </section>
    </AppShell>
  );
}
