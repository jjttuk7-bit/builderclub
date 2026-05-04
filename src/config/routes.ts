export const appRoutes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  builderRoom: (handle: string) => `/builders/${handle}`,
  projects: {
    index: "/projects",
    new: "/projects/new",
    detail: (id: string) => `/projects/${id}`,
  },
  logs: {
    index: "/logs",
    new: "/logs/new",
    detail: (id: string) => `/logs/${id}`,
  },
  questions: {
    index: "/questions",
    new: "/questions/new",
    detail: (id: string) => `/questions/${id}`,
  },
  feedback: {
    index: "/feedback",
    new: "/feedback/new",
    detail: (id: string) => `/feedback/${id}`,
  },
  knowledge: {
    index: "/knowledge",
    new: "/knowledge/new",
    detail: (id: string) => `/knowledge/${id}`,
  },
} as const;

export const primaryNavigation = [
  { label: "대시보드", href: appRoutes.dashboard },
  { label: "빌더룸", href: "/builders" },
  { label: "프로젝트", href: appRoutes.projects.index },
  { label: "빌드로그", href: appRoutes.logs.index },
  { label: "질문", href: appRoutes.questions.index },
  { label: "피드백", href: appRoutes.feedback.index },
  { label: "지식 공유", href: appRoutes.knowledge.index },
] as const;

export const writeNavigation = [
  { label: "빌드로그 작성", href: appRoutes.logs.new },
  { label: "질문 작성", href: appRoutes.questions.new },
  { label: "피드백 요청", href: appRoutes.feedback.new },
  { label: "지식 공유 작성", href: appRoutes.knowledge.new },
] as const;
