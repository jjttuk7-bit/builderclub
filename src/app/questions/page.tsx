import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getQuestions } from "@/lib/mock-db";

const questions = getQuestions();

export default function QuestionsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Questions"
        title="질문"
        description="막힌 부분을 공유하고, 답변이 쌓이면 해결 노하우로 전환하는 공간입니다."
      />
      <CardSection
        title="열린 질문"
        description="지금 막힌 문제와 답변이 필요한 질문을 모았습니다."
        items={questions}
      />
    </AppShell>
  );
}
