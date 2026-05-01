import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentCard } from "./ContentCard";

describe("ContentCard", () => {
  it("renders title, summary, status and tags", () => {
    render(
      <ContentCard
        title="로그인 화면 개선"
        summary="오늘 만든 화면과 막힌 부분을 정리했습니다."
        href="/logs/log-1"
        status="shared"
        author="빌더 A"
        tags={["UI", "Claude Code"]}
      />,
    );

    expect(screen.getByRole("link", { name: /로그인 화면 개선/ })).toHaveAttribute(
      "href",
      "/logs/log-1",
    );
    expect(screen.getByText("오늘 만든 화면과 막힌 부분을 정리했습니다.")).toBeInTheDocument();
    expect(screen.getByText("shared")).toBeInTheDocument();
    expect(screen.getByText("작성자: 빌더 A")).toBeInTheDocument();
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
  });
});
