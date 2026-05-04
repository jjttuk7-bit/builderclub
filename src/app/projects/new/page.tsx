import { redirect } from "next/navigation";
import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { projectForm } from "@/data/write-forms";
import { createProject } from "@/lib/mock-db";

async function createProjectAction(formData: FormData) {
  "use server";
  const { getSessionBuilder } = await import("@/lib/auth");
  const { createProjectToSupabase } = await import("@/lib/mock-db");
  
  const builder = await getSessionBuilder();
  if (!builder) {
    throw new Error("로그인이 필요합니다.");
  }

  const item = await createProjectToSupabase({
    name: String(formData.get("프로젝트-이름")),
    summary: String(formData.get("한-줄-요약")),
    problem: String(formData.get("문제-정의")),
    features: String(formData.get("핵심-기능")),
    visibility: String(formData.get("visibility")),
    builder_id: builder.id,
    author: builder.display_name,
  });

  redirect(`/projects/${item.id}`);
}

export default function NewProjectPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Project"
        title="새 프로젝트 시작"
        description="이루고 싶은 목표와 해결하려는 문제를 정의하고 프로젝트를 시작합니다."
      />
      <WriteForm {...projectForm} action={createProjectAction} />
    </AppShell>
  );
}
