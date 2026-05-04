import type { Builder } from "@/lib/data-model";
import { currentBuilder } from "@/data/current-builder";
import {
  sampleActivities,
  sampleBuilderWorkspace,
  sampleFeedbackRequests,
  sampleKnowledgePosts,
  sampleProjects,
  sampleQuestions,
  sampleLogs,
} from "@/data/sample-content";

export type CardSectionItem = {
  id?: string;
  title: string;
  summary: string;
  href: string;
  status: string;
  author?: string;
  tags?: string[];
};

export type DetailRecord = {
  id: string;
  title: string;
  status: string;
  builder: string;
  project: string;
  sections: { title: string; body: string }[];
  actions: string[];
};

const sampleLogDetails: DetailRecord[] = [];
const sampleQuestionDetails: DetailRecord[] = [];
const sampleFeedbackDetails: DetailRecord[] = [];
const sampleKnowledgeDetails: DetailRecord[] = [];

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export const sampleBuilders: Builder[] = [currentBuilder];

export function getCurrentBuilder() {
  return currentBuilder;
}

export function getBuilderByHandle(handle: string) {
  return sampleBuilders.find((builder) => builder.handle === handle);
}

export function getBuilderWorkspace(handle: string) {
  const builder = getBuilderByHandle(handle);
  if (!builder) {
    return null;
  }

  return {
    ...sampleBuilderWorkspace,
    handle: builder.handle,
    name: `${builder.display_name}의 작업 공간`,
  };
}

export function getActivityFeed() {
  return sampleActivities;
}

export function createBuildLog(payload: {
  project: string;
  today: string;
  blocked: string;
  prompt: string;
  visibility: string;
}) {
  const id = createId("log");
  const item: Required<CardSectionItem> = {
    id,
    title: `${payload.project} 빌드로그`,
    summary: payload.today,
    href: `/logs/${id}`,
    status: "shared",
    author: currentBuilder.name,
    tags: [payload.project, "빌드로그"],
  };

  sampleLogs.unshift(item);
  sampleActivities.unshift({
    id: createId("activity"),
    title: `${currentBuilder.name}가 빌드로그를 작성했습니다`,
    summary: payload.today,
    href: item.href,
    status: item.status,
    author: currentBuilder.name,
    tags: item.tags,
  });
  sampleLogDetails.unshift({
    id,
    title: item.title,
    status: item.status,
    builder: currentBuilder.name,
    project: payload.project,
    sections: [
      { title: "오늘 작업한 것", body: payload.today },
      { title: "막힌 부분", body: payload.blocked },
      { title: "사용한 AI 프롬프트", body: payload.prompt },
    ],
    actions: ["질문으로 전환", "피드백 요청", "지식으로 전환"],
  });

  return item;
}

export function createQuestion(payload: {
  situation: string;
  symptom: string;
  attempted: string;
  desiredHelp: string;
  visibility: string;
}) {
  const id = createId("question");
  const title = payload.situation.slice(0, 40) || "새 질문";
  const item: Required<CardSectionItem> = {
    id,
    title,
    summary: payload.symptom,
    href: `/questions/${id}`,
    status: "open",
    author: currentBuilder.name,
    tags: ["질문"],
  };

  sampleQuestions.unshift(item);
  sampleActivities.unshift({
    id: createId("activity"),
    title: `${currentBuilder.name}가 질문을 등록했습니다`,
    summary: payload.symptom,
    href: item.href,
    status: item.status,
    author: currentBuilder.name,
    tags: item.tags,
  });
  sampleQuestionDetails.unshift({
    id,
    title,
    status: item.status,
    builder: currentBuilder.name,
    project: "빌더룸 질문",
    sections: [
      { title: "막힌 상황", body: payload.situation },
      { title: "에러/증상", body: payload.symptom },
      { title: "이미 시도한 방법", body: payload.attempted },
      { title: "원하는 도움", body: payload.desiredHelp },
    ],
    actions: ["해결 노하우로 전환"],
  });

  return item;
}

export function createFeedbackRequest(payload: {
  screen: string;
  reviewFocus: string;
  userAction: string;
  dueDate: string;
  visibility: string;
}) {
  const id = createId("feedback");
  const title = payload.screen || "새 피드백 요청";
  const item: Required<CardSectionItem> = {
    id,
    title,
    summary: payload.reviewFocus,
    href: `/feedback/${id}`,
    status: "in_review",
    author: currentBuilder.name,
    tags: ["피드백"],
  };

  sampleFeedbackRequests.unshift(item);
  sampleActivities.unshift({
    id: createId("activity"),
    title: `${currentBuilder.name}가 피드백을 요청했습니다`,
    summary: payload.reviewFocus,
    href: item.href,
    status: item.status,
    author: currentBuilder.name,
    tags: item.tags,
  });
  sampleFeedbackDetails.unshift({
    id,
    title,
    status: item.status,
    builder: currentBuilder.name,
    project: "빌더룸 피드백",
    sections: [
      { title: "피드백 받고 싶은 화면", body: payload.screen },
      { title: "확인받고 싶은 관점", body: payload.reviewFocus },
      { title: "사용자가 해야 할 행동", body: payload.userAction },
      { title: "마감일", body: payload.dueDate },
    ],
    actions: ["반영 상태 업데이트"],
  });

  return item;
}

export function createKnowledgePost(payload: {
  background: string;
  coreContent: string;
  appliedMethod: string;
  reuseTip: string;
  visibility: string;
}) {
  const id = createId("knowledge");
  const title = payload.coreContent.slice(0, 40) || "새 지식 공유";
  const item: Required<CardSectionItem> = {
    id,
    title,
    summary: payload.background,
    href: `/knowledge/${id}`,
    status: "published",
    author: currentBuilder.name,
    tags: ["지식 공유"],
  };

  sampleKnowledgePosts.unshift(item);
  sampleActivities.unshift({
    id: createId("activity"),
    title: `${currentBuilder.name}가 지식 공유를 추가했습니다`,
    summary: payload.background,
    href: item.href,
    status: item.status,
    author: currentBuilder.name,
    tags: item.tags,
  });
  sampleKnowledgeDetails.unshift({
    id,
    title,
    status: item.status,
    builder: currentBuilder.name,
    project: '빌더룸 지식 공유',
    sections: [
      { title: '배운 배경', body: payload.background },
      { title: '핵심 내용', body: payload.coreContent },
      { title: '적용한 방법', body: payload.appliedMethod },
      { title: '재사용 팁', body: payload.reuseTip },
    ],
    actions: ['관련 질문 보기'],
  });

  return item;
}

export async function createProjectToSupabase(payload: {
  name: string;
  summary: string;
  problem: string;
  features: string;
  visibility: string;
  builder_id?: string;
  author: string;
}) {
  const id = createId("project");
  
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .insert([{
        id,
        title: payload.name,
        summary: payload.summary,
        problem_definition: payload.problem,
        core_features: payload.features,
        visibility: payload.visibility,
        builder_id: payload.builder_id,
        author: payload.author,
        status: "building",
        tags: ["Project"],
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (!error && data) {
      // Also add to activity feed in Supabase if you have one, 
      // or at least keep the local mock updated for the current session
      const item: Required<CardSectionItem> = {
        id: data.id,
        title: data.title,
        summary: data.summary,
        href: `/projects/${data.id}`,
        status: data.status,
        author: data.author,
        tags: data.tags,
      };
      sampleProjects.unshift(item);
      return item;
    }
  }

  // Fallback to mock if Supabase fails or is not available
  return createProject(payload);
}

export function createProject(payload: {
  name: string;
  summary: string;
  problem: string;
  features: string;
  visibility: string;
  author?: string;
}) {
  const id = createId("project");
  const authorName = payload.author || currentBuilder.name;
  const item: Required<CardSectionItem> = {
    id,
    title: payload.name,
    summary: payload.summary,
    href: `/projects/${id}`,
    status: "building",
    author: authorName,
    tags: ["Project"],
  };

  sampleProjects.unshift(item);
  sampleActivities.unshift({
    id: createId("activity"),
    title: `${authorName}님이 새 프로젝트를 시작했습니다: ${payload.name}`,
    summary: payload.summary,
    href: item.href,
    status: item.status,
    author: authorName,
    tags: item.tags,
  });

  return item;
}

export function getProjects(): CardSectionItem[] {
  return sampleProjects as CardSectionItem[];
}

export function getProjectById(id: string) {
  return sampleProjects.find((p) => p.id === id) ?? null;
}

export function getProjectsByBuilderName(name: string): CardSectionItem[] {
  return sampleProjects.filter((p) => p.author === name) as CardSectionItem[];
}

export function getBuildLogs(): CardSectionItem[] {
  return sampleLogs as CardSectionItem[];
}

export function getQuestions(): CardSectionItem[] {
  return sampleQuestions as CardSectionItem[];
}

export function getFeedbackRequests(): CardSectionItem[] {
  return sampleFeedbackRequests as CardSectionItem[];
}

export function getKnowledgePosts(): CardSectionItem[] {
  return sampleKnowledgePosts as CardSectionItem[];
}

export function getLogDetailById(id: string) {
  return sampleLogDetails.find((detail) => detail.id === id) ?? null;
}

export function getQuestionDetailById(id: string) {
  return sampleQuestionDetails.find((detail) => detail.id === id) ?? null;
}

export function getFeedbackDetailById(id: string) {
  return sampleFeedbackDetails.find((detail) => detail.id === id) ?? null;
}

export function getKnowledgeDetailById(id: string) {
  return sampleKnowledgeDetails.find((detail) => detail.id === id) ?? null;
}

export function getBuilderByEmail(email: string) {
  return sampleBuilders.find((builder) => builder.email === email);
}

export function addMockBuilder(builder: Builder) {
  sampleBuilders.push(builder);
}
