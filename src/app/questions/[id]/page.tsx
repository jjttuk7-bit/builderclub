import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { sampleQuestionDetail } from "@/data/sample-content";

export default function QuestionDetailPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Question Detail"
        title="질문 상세"
        description="질문 맥락과 답변을 확인하고, 해결된 내용을 지식으로 남깁니다."
      />
      <DetailContent {...sampleQuestionDetail} />
    </AppShell>
  );
}
