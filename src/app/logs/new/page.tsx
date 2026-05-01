import { WriteForm } from "@/components/forms/WriteForm";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildLogForm } from "@/data/write-forms";

export default function NewLogPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="New Build Log"
        title="빌드로그 작성"
        description="오늘 작업한 것, 막힌 부분, 시도한 방법, 사용한 AI 프롬프트를 기록합니다."
      />
      <WriteForm {...buildLogForm} />
    </AppShell>
  );
}
