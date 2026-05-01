import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { sampleKnowledgeDetail } from "@/data/sample-content";

export default function KnowledgeDetailPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Knowledge Detail"
        title="지식 공유 상세"
        description="노하우의 배경, 핵심 내용, 프롬프트, 댓글을 확인합니다."
      />
      <DetailContent {...sampleKnowledgeDetail} />
    </AppShell>
  );
}
