import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuilderRoomPage from "./builders/[handle]/page";
import FeedbackPage from "./feedback/page";
import KnowledgePage from "./knowledge/page";
import LogsPage from "./logs/page";
import ProjectsPage from "./projects/page";
import QuestionsPage from "./questions/page";

describe("section pages with sample content", () => {
  it("renders builder room sample workspace details", () => {
    render(<BuilderRoomPage params={{ handle: "builder-a" }} />);
    expect(screen.getByText("오늘의 작업 초점")).toBeInTheDocument();
    expect(screen.getByText("빌더 A의 작업 공간")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "빌드로그 작성" }).some((link) => link.getAttribute("href") === "/logs/new"),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "질문 작성" }).some((link) => link.getAttribute("href") === "/questions/new"),
    ).toBe(true);
  });

  it("renders project cards", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("노코드 CRM 리빌드")).toBeInTheDocument();
    expect(screen.getByText("랜딩 분석 대시보드")).toBeInTheDocument();
  });

  it("renders build log cards", () => {
    render(<LogsPage />);
    expect(screen.getByText("로그인 화면 플로우 정리")).toBeInTheDocument();
    expect(screen.getByText("온보딩 체크리스트 연결")).toBeInTheDocument();
  });

  it("renders question cards", () => {
    render(<QuestionsPage />);
    expect(screen.getByText("Supabase RLS 정책이 예상보다 넓게 열립니다")).toBeInTheDocument();
    expect(screen.getByText("Next 라우트에서 상세 페이지 params 타입이 헷갈립니다")).toBeInTheDocument();
  });

  it("renders feedback request cards", () => {
    render(<FeedbackPage />);
    expect(screen.getByText("빌더룸 첫 화면 피드백 요청")).toBeInTheDocument();
    expect(screen.getByText("질문 상세 답변 흐름 검토")).toBeInTheDocument();
  });

  it("renders knowledge cards", () => {
    render(<KnowledgePage />);
    expect(screen.getByText("Claude Code에게 화면 구조를 맡길 때 좋은 요청 방식")).toBeInTheDocument();
    expect(screen.getByText("빌드로그를 질문으로 전환하는 기준")).toBeInTheDocument();
  });
});
