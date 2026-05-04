import { ContentCard } from "@/components/cards/ContentCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getActivityFeed } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

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
        title: `${p.author}님이 새 프로젝트를 시작했습니다: ${p.title}`,
        summary: p.summary,
        href: `/projects/${p.id}`,
        status: p.status,
        author: p.author,
        tags: p.tags
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
            activities.map((activity) => (
              <ContentCard
                key={activity.id || activity.href}
                title={activity.title}
                summary={activity.summary}
                href={activity.href}
                status={activity.status}
                author={activity.author}
                tags={activity.tags}
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
