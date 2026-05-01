import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./AppShell";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

describe("AppShell", () => {
  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/logs");
  });
  it("renders primary navigation and main content", () => {
    render(
      <AppShell>
        <h1>대시보드</h1>
      </AppShell>,
    );

    expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "빌드로그" })).toHaveAttribute("href", "/logs");
    expect(screen.getByRole("link", { name: "빌드로그 작성" })).toHaveAttribute("href", "/logs/new");
    expect(screen.getByRole("link", { name: "질문 작성" })).toHaveAttribute("href", "/questions/new");
    expect(screen.getByText("멤버 전용")).toBeInTheDocument();
    expect(screen.getByText("로그인 중")).toBeInTheDocument();
    expect(screen.getByText("빌더 A")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "내 작업공간" })).toHaveAttribute("href", "/builders/builder-a");
    expect(screen.getByRole("main")).toHaveTextContent("대시보드");
    expect(screen.getByRole("link", { name: "빌드로그" })).toHaveAttribute("aria-current", "page");
  });
});
