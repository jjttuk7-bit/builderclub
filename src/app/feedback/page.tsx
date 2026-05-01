import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getFeedbackRequests } from "@/lib/mock-db";

const feedbackRequests = getFeedbackRequests();

export default function FeedbackPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Feedback"
        title="피드백"
        description="빌더들이 만든 화면과 기능에 대한 검토 요청과 의견을 모아봅니다."
      />
      <CardSection
        title="피드백 요청"
        description="확인받고 싶은 화면, 관점, 반영 상태를 한곳에서 봅니다."
        items={feedbackRequests}
      />
    </AppShell>
  );
}
