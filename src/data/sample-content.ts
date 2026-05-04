import type { CardSectionItem } from "@/lib/mock-db";

export const sampleProjects: CardSectionItem[] = [
  {
    id: "project-1",
    title: "빌더클럽 커뮤니티 OS",
    summary: "빌더들이 서로의 성장을 돕는 투명한 협업 플랫폼을 만듭니다.",
    href: "/projects/project-1",
    status: "building",
    author: "알렉스",
    tags: ["Next.js", "Supabase", "Design System"],
  },
  {
    id: "project-2",
    title: "AI 여행 가이드",
    summary: "사용자의 취향을 분석하여 최적의 여행 경로를 추천하는 AI 에이전트입니다.",
    href: "/projects/project-2",
    status: "building",
    author: "김철수",
    tags: ["React", "OpenAI", "Tailwind"],
  }
];

export const sampleActivities: CardSectionItem[] = [
  {
    id: "activity-1",
    title: "알렉스님이 새 빌드로그를 작성했습니다",
    summary: "오늘 커뮤니티 OS의 사이드바 네비게이션을 완성했습니다.",
    href: "/logs/log-1",
    status: "shared",
    author: "알렉스",
    tags: ["빌드로그", "UI/UX"],
  },
  {
    id: "activity-2",
    title: "김철수님이 질문을 등록했습니다",
    summary: "OpenAI API 응답 속도를 개선할 수 있는 방법이 있을까요?",
    href: "/questions/question-1",
    status: "open",
    author: "김철수",
    tags: ["질문", "AI"],
  }
];

export const sampleLogs: CardSectionItem[] = [
  {
    id: "log-1",
    title: "빌더클럽 빌드로그 #1",
    summary: "프로젝트 레이아웃 및 디자인 시스템 기초 설계를 완료했습니다.",
    href: "/logs/log-1",
    status: "shared",
    author: "알렉스",
    tags: ["빌드로그", "설계"],
  }
];

export const sampleQuestions: CardSectionItem[] = [
  {
    id: "question-1",
    title: "OpenAI API 스트리밍 처리 관련 질문",
    summary: "Vercel Edge Functions에서 스트리밍 응답을 처리하는 효율적인 방식이 궁금합니다.",
    href: "/questions/question-1",
    status: "open",
    author: "김철수",
    tags: ["질문", "Next.js"],
  }
];

export const sampleFeedbackRequests: CardSectionItem[] = [];
export const sampleKnowledgePosts: CardSectionItem[] = [];

export const sampleBuilderWorkspace = {
  handle: "alex",
  name: "알렉스의 작업 공간",
  focus: "프로젝트 가시성 이슈 해결",
  summary: "사용자들이 프로젝트를 더 쉽게 찾고 관리할 수 있도록 UI를 개선 중입니다.",
  nextActions: [
    { label: "빌드로그 작성", href: "/logs/new" },
    { label: "질문 작성", href: "/questions/new" },
    { label: "피드백 요청", href: "/feedback/new" },
  ],
};

export const sampleLogDetail = null;
export const sampleQuestionDetail = null;
export const sampleFeedbackDetail = null;
export const sampleKnowledgeDetail = null;
