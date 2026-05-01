import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { sampleLogs } from "@/data/sample-content";

export default function LogsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Build Logs"
        title="빌드로그"
        description="빌더들이 오늘 만든 것, 막힌 부분, 해결한 방법, 다음 작업을 공유하는 제작 기록입니다."
      />
      <CardSection
        title="최근 빌드로그"
        description="작업 과정, 막힌 부분, 해결 방식이 다음 빌더의 힌트가 됩니다."
        items={sampleLogs}
      />
    </AppShell>
  );
}
