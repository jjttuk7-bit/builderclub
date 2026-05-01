import { redirect } from "next/navigation";
import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildLogForm } from "@/data/write-forms";
import { appRoutes } from "@/config/routes";
import { createBuildLog } from "@/lib/mock-db";

async function createBuildLogAction(formData: FormData) {
  "use server";

  const item = createBuildLog({
    project: String(formData.get("프로젝트")),
    today: String(formData.get("오늘 작업한 것")),
    blocked: String(formData.get("막힌 부분")),
    prompt: String(formData.get("사용한 AI 프롬프트")),
    visibility: String(formData.get("visibility")),
  });

  redirect(appRoutes.logs.detail(item.id ?? ""));
}

export default function NewLogPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Build Log"
        title="빌드로그 작성"
        description="오늘 작업한 것, 막힌 부분, 시도한 방법, 사용한 AI 프롬프트를 기록합니다."
      />
      <WriteForm {...buildLogForm} action={createBuildLogAction} />
    </AppShell>
  );
}
