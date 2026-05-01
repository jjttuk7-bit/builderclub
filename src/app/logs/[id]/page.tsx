import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getLogDetailById } from "@/lib/mock-db";

type LogDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LogDetailPage({ params }: LogDetailPageProps) {
  const { id } = await params;
  const detail = getLogDetailById(id);

  if (!detail) {
    return (
      <AppShell>
        <PageHeader
          eyebrow="Build Log Detail"
          title="빌드로그를 찾을 수 없습니다"
          description="요청하신 빌드로그가 존재하지 않습니다."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Build Log Detail"
        title="빌드로그 상세"
        description="작업 기록을 확인하고 질문, 피드백, 지식 공유로 전환합니다."
      />
      <DetailContent {...detail} />
    </AppShell>
  );
}
