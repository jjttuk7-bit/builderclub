export const dynamic = "force-dynamic";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardSection } from "@/components/sections/CardSection";
import { getProjects } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";

function formatTimeAgo(dateString?: string): string {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  
  return date.toLocaleDateString("ko-KR", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
}

async function deleteProject(formData: FormData) {
  "use server";
  const projectId = formData.get("project-id");
  const action = formData.get("action");
  
  if (action !== "delete" || !projectId) return;
  
  if (supabase) {
    await supabase.from("projects").delete().eq("id", projectId as string);
  }
}

export default async function ProjectsPage() {
  let projects = getProjects();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase projects fetch error:", error);
      } else if (data) {
        // Convert Supabase data to CardSectionItem format
        const dbProjects = data.map(p => ({
          id: p.id,
          title: p.title,
          summary: p.summary,
          href: `/projects/${p.id}`,
          status: p.status,
          author: p.author,
          tags: p.tags,
          created_at: p.created_at
        }));
        
        // Combine with mock projects
        projects = [...dbProjects, ...projects.filter(p => !dbProjects.some(dbP => dbP.title === p.title))];
      }
    } catch (error) {
      console.error("Failed to load projects from Supabase:", error);
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
        formatCreatedAt={formatTimeAgo}
        deleteAction={deleteProject}
      />
    </AppShell>
  );
}
