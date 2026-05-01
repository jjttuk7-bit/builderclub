import { redirect } from "next/navigation";
import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { knowledgeForm } from "@/data/write-forms";
import { appRoutes } from "@/config/routes";
import { createKnowledgePost } from "@/lib/mock-db";

async function createKnowledgePostAction(formData: FormData) {
  "use server";

  const item = createKnowledgePost({
    background: String(formData.get("배운 배경")),
    coreContent: String(formData.get("핵심 내용")),
    appliedMethod: String(formData.get("적용한 방법")),
    reuseTip: String(formData.get("재사용 팁")),
    visibility: String(formData.get("visibility")),
  });

  redirect(appRoutes.knowledge.detail(item.id ?? ""));
}

export default function NewKnowledgePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Knowledge"
        title="지식 공유 작성"
        description="배운 배경, 핵심 내용, 적용 방법, 재사용 팁을 정리합니다."
      />
      <WriteForm {...knowledgeForm} action={createKnowledgePostAction} />
    </AppShell>
  );
}
