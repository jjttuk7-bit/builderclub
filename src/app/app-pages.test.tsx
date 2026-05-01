import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardPage from "./dashboard/page";
import FeedbackPage from "./feedback/page";
import KnowledgePage from "./knowledge/page";
import LogsPage from "./logs/page";
import ProjectsPage from "./projects/page";
import QuestionsPage from "./questions/page";

describe("top-level app pages", () => {
  it("renders dashboard", () => {
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { name: "빌더클럽 대시보드" })).toBeInTheDocument();
  });

  it("renders projects", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: "프로젝트" })).toBeInTheDocument();
  });

  it("renders logs", () => {
    render(<LogsPage />);
    expect(screen.getByRole("heading", { name: "빌드로그" })).toBeInTheDocument();
  });

  it("renders questions", () => {
    render(<QuestionsPage />);
    expect(screen.getByRole("heading", { name: "질문" })).toBeInTheDocument();
  });

  it("renders feedback", () => {
    render(<FeedbackPage />);
    expect(screen.getByRole("heading", { name: "피드백" })).toBeInTheDocument();
  });

  it("renders knowledge", () => {
    render(<KnowledgePage />);
    expect(screen.getByRole("heading", { name: "지식 공유" })).toBeInTheDocument();
  });
});
