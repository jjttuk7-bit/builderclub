import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getProjectById, getBuildLogs, getQuestions, getFeedbackRequests, getKnowledgePosts } from "@/lib/mock-db";
import { CardSection } from "@/components/sections/CardSection";
import Link from "next/link";
import styles from "./page.module.css";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return (
      <AppShell>
        <PageHeader eyebrow="Project" title="프로젝트를 찾을 수 없습니다" description="존재하지 않는 프로젝트입니다." />
      </AppShell>
    );
  }

  // 더미 데이터이므로 이름이나 태그로 연관 데이터를 필터링합니다.
  const logs = getBuildLogs().filter((l) => l.tags?.includes(project.title) || l.author === project.author);
  const questions = getQuestions().filter((q) => q.author === project.author);
  const feedbacks = getFeedbackRequests().filter((f) => f.author === project.author);
  
  return (
    <AppShell>
      <PageHeader 
        eyebrow="Project"
        title={project.title}
        description={project.summary}
      />
      
      <section className={styles.actionsPanel}>
        <h3>무엇을 남기시겠어요?</h3>
        <div className={styles.actionButtons}>
          <Link href={`/logs/new?project=${id}`} className={styles.actionBtn}>
            <strong>📝 빌드로그 작성</strong>
            <span>오늘의 작업 기록 남기기</span>
          </Link>
          <Link href={`/questions/new?project=${id}`} className={styles.actionBtn}>
            <strong>❓ 질문하기</strong>
            <span>막힌 부분 도움 요청하기</span>
          </Link>
          <Link href={`/feedback/new?project=${id}`} className={styles.actionBtn}>
            <strong>👀 피드백 요청</strong>
            <span>만든 화면 의견 듣기</span>
          </Link>
        </div>
      </section>

      <div className={styles.history}>
        {logs.length > 0 && <CardSection title="빌드로그" description="이 프로젝트의 작업 기록입니다." items={logs} />}
        {questions.length > 0 && <CardSection title="질문 내역" description="진행 중 발생한 질문들입니다." items={questions} />}
        {feedbacks.length > 0 && <CardSection title="피드백 요청" description="사용자 피드백을 요청한 내역입니다." items={feedbacks} />}
      </div>
    </AppShell>
  );
}
