export const dynamic = "force-dynamic";
import { ContentCard } from "@/components/cards/ContentCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getActivityFeed } from "@/lib/mock-db";
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
  let activities = [...getActivityFeed()];

  if (supabase) {
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (projects) {
      const projectActivities = projects.map(p => ({
        id: `activity-p-${p.id}`,
        title: p.title,
        summary: p.summary || "",
        href: `/projects/${p.id}`,
        status: p.status,
        author: p.author,
        tags: p.tags || [],
        created_at: p.created_at
      }));
      
      activities = [...projectActivities, ...activities];
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
            activities.map((activity) => {
              const canDelete = activity.id?.startsWith("activity-p-");
              const projectId = canDelete && activity.id ? activity.id.replace("activity-p-", "") : null;
              
              return (
                <ContentCard
                  key={activity.id || activity.href}
                  title={activity.title}
                  summary={activity.summary}
                  href={activity.href}
                  status={activity.status}
                  author={activity.author}
                  tags={activity.tags}
                  createdAt={formatCreatedAt(activity.created_at)}
                  onDelete={projectId ? (e) => {
                    e.preventDefault();
                    if (confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
                      const form = document.createElement("form");
                      form.method = "POST";
                      form.action = window.location.pathname;
                      const actionInput = document.createElement("input");
                      actionInput.type = "hidden";
                      actionInput.name = "action";
                      actionInput.value = "delete";
                      form.appendChild(actionInput);
                      const input = document.createElement("input");
                      input.type = "hidden";
                      input.name = "project-id";
                      input.value = projectId;
                      form.appendChild(input);
                      document.body.appendChild(form);
                      form.submit();
                    }
                  } : undefined}
                />
              );
            })
          ) : (
            <p className={styles.empty}>최근 활동이 없습니다.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}
