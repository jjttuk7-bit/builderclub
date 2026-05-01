import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { feedbackForm } from "@/data/write-forms";

export default function NewFeedbackPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Feedback"
        title="피드백 요청 작성"
        description="확인받고 싶은 화면, 관점, 사용자 행동, 마감일을 정리합니다."
      />
      <WriteForm {...feedbackForm} />
    </AppShell>
  );
}
