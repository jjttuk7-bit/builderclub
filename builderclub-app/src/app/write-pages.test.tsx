import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewFeedbackPage from "./feedback/new/page";
import NewKnowledgePage from "./knowledge/new/page";
import NewLogPage from "./logs/new/page";
import NewQuestionPage from "./questions/new/page";

describe("write pages", () => {
  it("renders build log form fields", () => {
    render(<NewLogPage />);

    expect(screen.getByLabelText("프로젝트")).toBeInTheDocument();
    expect(screen.getByText("작성자")).toBeInTheDocument();
    expect(screen.getAllByText("빌더 A").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("저장 위치")).toBeInTheDocument();
    expect(screen.getByText("내 빌더룸")).toBeInTheDocument();
    expect(screen.getByLabelText("오늘 작업한 것")).toBeInTheDocument();
    expect(screen.getByLabelText("막힌 부분")).toBeInTheDocument();
    expect(screen.getByText("빌드로그 저장")).toBeInTheDocument();
  });

  it("renders question form fields", () => {
    render(<NewQuestionPage />);

    expect(screen.getByLabelText("막힌 상황")).toBeInTheDocument();
    expect(screen.getByText("작성자")).toBeInTheDocument();
    expect(screen.getAllByText("빌더 A").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByLabelText("에러/증상")).toBeInTheDocument();
    expect(screen.getByLabelText("원하는 도움")).toBeInTheDocument();
    expect(screen.getByText("질문 등록")).toBeInTheDocument();
  });

  it("renders feedback request form fields", () => {
    render(<NewFeedbackPage />);

    expect(screen.getByLabelText("피드백 받고 싶은 화면")).toBeInTheDocument();
    expect(screen.getByLabelText("확인받고 싶은 관점")).toBeInTheDocument();
    expect(screen.getByLabelText("마감일")).toBeInTheDocument();
    expect(screen.getByText("피드백 요청 저장")).toBeInTheDocument();
  });

  it("renders knowledge post form fields", () => {
    render(<NewKnowledgePage />);

    expect(screen.getByLabelText("배운 배경")).toBeInTheDocument();
    expect(screen.getByLabelText("핵심 내용")).toBeInTheDocument();
    expect(screen.getByLabelText("재사용 팁")).toBeInTheDocument();
    expect(screen.getByText("지식 공유 저장")).toBeInTheDocument();
  });
});
