import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { sampleLogDetail } from "@/data/sample-content";

export default function LogDetailPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Build Log Detail"
        title="빌드로그 상세"
        description="작업 기록을 확인하고 질문, 피드백, 지식 공유로 전환합니다."
      />
      <DetailContent {...sampleLogDetail} />
    </AppShell>
  );
}
