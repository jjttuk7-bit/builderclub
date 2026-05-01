import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { sampleProjects } from "@/data/sample-content";

export default function ProjectsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Projects"
        title="프로젝트"
        description="빌더들이 만들고 있는 프로젝트의 진행률, 최근 기록, 필요한 도움을 확인합니다."
      />
      <CardSection
        title="진행 중인 프로젝트"
        description="각 빌더가 만들고 있는 프로젝트와 현재 상태를 빠르게 훑어봅니다."
        items={sampleProjects}
      />
    </AppShell>
  );
}
