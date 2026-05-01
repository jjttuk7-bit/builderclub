import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getKnowledgeDetailById } from "@/lib/mock-db";

type KnowledgeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KnowledgeDetailPage({ params }: KnowledgeDetailPageProps) {
  const { id } = await params;
  const detail = getKnowledgeDetailById(id);

  if (!detail) {
    return (
      <AppShell>
        <PageHeader
          eyebrow="Knowledge Detail"
          title="지식 공유를 찾을 수 없습니다"
          description="요청하신 지식 공유가 존재하지 않습니다."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Knowledge Detail"
        title="지식 공유 상세"
        description="노하우의 배경, 핵심 내용, 프롬프트, 댓글을 확인합니다."
      />
      <DetailContent {...detail} />
    </AppShell>
  );
}
