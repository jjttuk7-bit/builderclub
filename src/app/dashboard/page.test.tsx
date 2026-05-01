import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardPage from "./page";

describe("DashboardPage", () => {
  it("renders community activity cards", () => {
    render(<DashboardPage />);

    expect(screen.getByText("빌더 A가 빌드로그를 공유했습니다")).toBeInTheDocument();
    expect(screen.getByText("빌더 B가 질문을 등록했습니다")).toBeInTheDocument();
  });
});
