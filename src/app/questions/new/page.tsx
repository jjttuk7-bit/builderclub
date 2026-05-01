import { redirect } from "next/navigation";
import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { questionForm } from "@/data/write-forms";
import { appRoutes } from "@/config/routes";
import { createQuestion } from "@/lib/mock-db";

async function createQuestionAction(formData: FormData) {
  "use server";

  const item = createQuestion({
    situation: String(formData.get("막힌 상황")),
    symptom: String(formData.get("에러/증상")),
    attempted: String(formData.get("이미 시도한 방법")),
    desiredHelp: String(formData.get("원하는 도움")),
    visibility: String(formData.get("visibility")),
  });

  redirect(appRoutes.questions.detail(item.id ?? ""));
}

export default function NewQuestionPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Question"
        title="질문 작성"
        description="막힌 상황, 에러 증상, 이미 시도한 방법, 원하는 도움을 정리합니다."
      />
      <WriteForm {...questionForm} action={createQuestionAction} />
    </AppShell>
  );
}
