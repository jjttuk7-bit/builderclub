import { describe, expect, it } from "vitest";
import { appRoutes, primaryNavigation } from "./routes";

describe("app routes", () => {
  it("contains the MVP routes", () => {
    expect(appRoutes.dashboard).toBe("/dashboard");
    expect(appRoutes.builderRoom("builder-a")).toBe("/builders/builder-a");
    expect(appRoutes.logs.index).toBe("/logs");
    expect(appRoutes.logs.new).toBe("/logs/new");
    expect(appRoutes.logs.detail("log-1")).toBe("/logs/log-1");
    expect(appRoutes.questions.new).toBe("/questions/new");
    expect(appRoutes.feedback.new).toBe("/feedback/new");
    expect(appRoutes.knowledge.new).toBe("/knowledge/new");
    expect(appRoutes.login).toBe("/login");
  });

  it("contains primary navigation items", () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      "대시보드",
      "빌더룸",
      "프로젝트",
      "빌드로그",
      "질문",
      "피드백",
      "지식 공유",
    ]);
  });
});
