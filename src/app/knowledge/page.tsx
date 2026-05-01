import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getKnowledgePosts } from "@/lib/mock-db";

const knowledgePosts = getKnowledgePosts();

export default function KnowledgePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Knowledge"
        title="지식 공유"
        description="해결한 문제, Claude Code 노하우, 재사용 가능한 프롬프트와 패턴을 모읍니다."
      />
      <CardSection
        title="공유된 노하우"
        description="질문과 빌드로그에서 정리된 재사용 가능한 지식을 모았습니다."
        items={knowledgePosts}
      />
    </AppShell>
  );
}
