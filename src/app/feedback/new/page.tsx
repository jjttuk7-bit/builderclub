import { redirect } from "next/navigation";
import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { feedbackForm } from "@/data/write-forms";
import { appRoutes } from "@/config/routes";
import { createFeedbackRequest } from "@/lib/mock-db";

async function createFeedbackRequestAction(formData: FormData) {
  "use server";

  const item = createFeedbackRequest({
    screen: String(formData.get("피드백 받고 싶은 화면")),
    reviewFocus: String(formData.get("확인받고 싶은 관점")),
    userAction: String(formData.get("사용자가 해야 할 행동")),
    dueDate: String(formData.get("마감일")),
    visibility: String(formData.get("visibility")),
  });

  redirect(appRoutes.feedback.detail(item.id ?? ""));
}

export default function NewFeedbackPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Feedback"
        title="피드백 요청 작성"
        description="확인받고 싶은 화면, 관점, 사용자 행동, 마감일을 정리합니다."
      />
      <WriteForm {...feedbackForm} action={createFeedbackRequestAction} />
    </AppShell>
  );
}
