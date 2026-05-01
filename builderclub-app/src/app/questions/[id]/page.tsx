import { DetailContent } from "@/components/detail/DetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getQuestionDetailById } from "@/lib/mock-db";

type QuestionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const { id } = await params;
  const detail = getQuestionDetailById(id);

  if (!detail) {
    return (
      <AppShell>
        <PageHeader
          eyebrow="Question Detail"
          title="질문을 찾을 수 없습니다"
          description="요청하신 질문이 존재하지 않습니다."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Question Detail"
        title="질문 상세"
        description="질문 맥락과 답변을 확인하고, 해결된 내용을 지식으로 남깁니다."
      />
      <DetailContent {...detail} />
    </AppShell>
  );
}
