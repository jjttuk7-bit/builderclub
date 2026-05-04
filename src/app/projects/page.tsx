import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getProjects } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";

export default async function ProjectsPage() {
  let projects = getProjects();

  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) {
      // Convert Supabase data to CardSectionItem format
      const dbProjects = data.map(p => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        href: `/projects/${p.id}`,
        status: p.status,
        author: p.author,
        tags: p.tags
      }));
      
      // Combine with mock projects (optional, or just use DB)
      projects = dbProjects;
    }
  }

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
        items={projects}
      />
    </AppShell>
  );
}
