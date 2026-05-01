import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { questionForm } from "@/data/write-forms";

export default function NewQuestionPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Question"
        title="질문 작성"
        description="막힌 상황, 에러 증상, 이미 시도한 방법, 원하는 도움을 정리합니다."
      />
      <WriteForm {...questionForm} />
    </AppShell>
  );
}
