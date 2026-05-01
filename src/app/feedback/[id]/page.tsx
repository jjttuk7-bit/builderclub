import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFeedbackDetailById } from "@/lib/mock-db";

type FeedbackDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FeedbackDetailPage({ params }: FeedbackDetailPageProps) {
  const { id } = await params;
  const detail = getFeedbackDetailById(id);

  if (!detail) {
    return (
      <AppShell>
        <PageHeader
          eyebrow="Feedback Detail"
          title="피드백을 찾을 수 없습니다"
          description="요청하신 피드백이 존재하지 않습니다."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feedback Detail"
        title="피드백 상세"
        description="요청 내용, 피드백 댓글, 반영 상태를 확인합니다."
      />
      <DetailContent {...detail} />
    </AppShell>
  );
}
