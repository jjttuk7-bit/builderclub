export const dynamic = "force-dynamic";
import { ContentCard } from "@/components/cards/ContentCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getActivityFeed } from "@/lib/mock-db";
import { getSessionBuilder } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

function formatCreatedAt(createdAt?: string): string {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

async function deleteProject(formData: FormData) {
  "use server";
  const projectId = formData.get("project-id") as string;
  
  if (supabase && projectId) {
    await supabase.from("projects").delete().eq("id", projectId);
  }
}

export default async function DashboardPage() {
  const builder = await getSessionBuilder();
  let activities = [...getActivityFeed()];

  if (supabase) {
    try {
      const { data: logs, error: logsError } = await supabase
        .from("logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (logsError) {
        console.error("Supabase logs fetch error:", logsError);
      } else if (logs) {
        const logActivities = logs.map(l => ({
          id: `activity-l-${l.id}`,
          title: l.title,
          summary: l.summary || "",
          href: `/logs/${l.id}`,
          status: "shared",
          author: l.author,
          tags: l.tags || [],
          created_at: l.created_at
        }));
        activities = [...logActivities, ...activities.filter(a => !logActivities.some(la => la.href === a.href))];
      }

      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (questionsError) {
        console.error("Supabase questions fetch error:", questionsError);
      } else if (questions) {
        const questionActivities = questions.map(q => ({
          id: `activity-q-${q.id}`,
          title: q.title,
          summary: q.summary || "",
          href: `/questions/${q.id}`,
          status: "open",
          author: q.author,
          tags: q.tags || [],
          created_at: q.created_at
        }));
        activities = [...questionActivities, ...activities.filter(a => !questionActivities.some(qa => qa.href === a.href))];
      }

      const { data: feedback, error: feedbackError } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (feedbackError) {
        console.error("Supabase feedback fetch error:", feedbackError);
      } else if (feedback) {
        const feedbackActivities = feedback.map(f => ({
          id: `activity-f-${f.id}`,
          title: f.title,
          summary: f.summary || "",
          href: `/feedback/${f.id}`,
          status: f.status,
          author: f.author,
          tags: f.tags || [],
          created_at: f.created_at
        }));
        activities = [...feedbackActivities, ...activities.filter(a => !feedbackActivities.some(fa => fa.href === a.href))];
      }

      const { data: knowledge, error: knowledgeError } = await supabase
        .from("knowledge")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (knowledgeError) {
        console.error("Supabase knowledge fetch error:", knowledgeError);
      } else if (knowledge) {
        const knowledgeActivities = knowledge.map(k => ({
          id: `activity-k-${k.id}`,
          title: k.title,
          summary: k.summary || "",
          href: `/knowledge/${k.id}`,
          status: "shared",
          author: k.author,
          tags: k.tags || [],
          created_at: k.created_at
        }));
        activities = [...knowledgeActivities, ...activities.filter(a => !knowledgeActivities.some(ka => ka.href === a.href))];
      }
    } catch (err) {
      console.error("Dashboard data loading error:", err);
      // 에러 발생 시에도 Mock DB 데이터는 표시
    }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Community Activity"
        title="빌더클럽 대시보드"
        description="빌더들의 기록, 질문, 피드백, 지식 공유가 모이는 전체 커뮤니티 활동 화면입니다."
      />

      <section className={styles.activitySection} aria-labelledby="recent-activity-title">
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="recent-activity-title">최근 커뮤니티 활동</h2>
            <p>빌더들의 기록, 질문, 피드백, 지식 공유가 한 흐름으로 쌓입니다.</p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ContentCard
                key={activity.id || activity.href}
                title={activity.title}
                summary={activity.summary}
                href={activity.href}
                status={activity.status}
                author={activity.author}
                tags={activity.tags}
                createdAt={formatCreatedAt(activity.created_at)}
              />
            ))
          ) : (
            <p className={styles.empty}>최근 활동이 없습니다.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}
