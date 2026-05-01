import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeedbackDetailPage from "./feedback/[id]/page";
import KnowledgeDetailPage from "./knowledge/[id]/page";
import LogDetailPage from "./logs/[id]/page";
import QuestionDetailPage from "./questions/[id]/page";

describe("detail pages with sample content", () => {
  it("renders build log detail content and conversion actions", () => {
    render(<LogDetailPage />);

    expect(screen.getByText("로그인 화면 플로우 정리")).toBeInTheDocument();
    expect(screen.getByText("오늘 작업한 것")).toBeInTheDocument();
    expect(screen.getByText("질문으로 전환")).toBeInTheDocument();
    expect(screen.getByText("지식으로 전환")).toBeInTheDocument();
  });

  it("renders question detail content and answers", () => {
    render(<QuestionDetailPage />);

    expect(screen.getByText("Supabase RLS 정책이 예상보다 넓게 열립니다")).toBeInTheDocument();
    expect(screen.getByText("막힌 상황")).toBeInTheDocument();
    expect(screen.getByText("채택된 답변")).toBeInTheDocument();
    expect(screen.getByText("해결 노하우로 전환")).toBeInTheDocument();
  });

  it("renders feedback detail content and comments", () => {
    render(<FeedbackDetailPage />);

    expect(screen.getByText("빌더룸 첫 화면 피드백 요청")).toBeInTheDocument();
    expect(screen.getByText("확인받고 싶은 관점")).toBeInTheDocument();
    expect(screen.getByText("피드백 댓글")).toBeInTheDocument();
    expect(screen.getByText("반영 상태 업데이트")).toBeInTheDocument();
  });

  it("renders knowledge detail content and reuse tips", () => {
    render(<KnowledgeDetailPage />);

    expect(screen.getByText("Claude Code에게 화면 구조를 맡길 때 좋은 요청 방식")).toBeInTheDocument();
    expect(screen.getByText("핵심 내용")).toBeInTheDocument();
    expect(screen.getByText("재사용 팁")).toBeInTheDocument();
    expect(screen.getByText("관련 질문 보기")).toBeInTheDocument();
  });
});
