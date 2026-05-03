import type { CardSectionItem } from "@/lib/mock-db";

export const sampleActivities: CardSectionItem[] = [];
export const sampleProjects: CardSectionItem[] = [];
export const sampleLogs: CardSectionItem[] = [];
export const sampleQuestions: CardSectionItem[] = [];
export const sampleFeedbackRequests: CardSectionItem[] = [];
export const sampleKnowledgePosts: CardSectionItem[] = [];

export const sampleBuilderWorkspace = {
  handle: "",
  name: "새 작업 공간",
  focus: "오늘의 작업 초점",
  summary: "작업 목표를 설정해 주세요.",
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
