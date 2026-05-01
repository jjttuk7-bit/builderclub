import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { knowledgeForm } from "@/data/write-forms";

export default function NewKnowledgePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Knowledge"
        title="지식 공유 작성"
        description="배운 배경, 핵심 내용, 적용 방법, 재사용 팁을 정리합니다."
      />
      <WriteForm {...knowledgeForm} />
    </AppShell>
  );
}
