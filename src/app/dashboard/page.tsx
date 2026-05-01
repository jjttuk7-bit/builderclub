import { ContentCard } from "@/components/cards/ContentCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getActivityFeed } from "@/lib/mock-db";
import styles from "./page.module.css";

const activities = getActivityFeed();

export default function DashboardPage() {
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
          {activities.map((activity) => (
            <ContentCard
              key={activity.href}
              title={activity.title}
              summary={activity.summary}
              href={activity.href}
              status={activity.status}
              author={activity.author}
              tags={activity.tags}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
