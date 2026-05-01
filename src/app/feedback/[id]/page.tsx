import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { sampleFeedbackDetail } from "@/data/sample-content";

export default function FeedbackDetailPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Feedback Detail"
        title="피드백 상세"
        description="요청 내용, 피드백 댓글, 반영 상태를 확인합니다."
      />
      <DetailContent {...sampleFeedbackDetail} />
    </AppShell>
  );
}
