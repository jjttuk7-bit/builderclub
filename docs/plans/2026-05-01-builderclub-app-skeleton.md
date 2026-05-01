# Builderclub App Skeleton Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 정적 HTML 프로토타입을 보존한 상태에서 `builderclub-app/` 폴더에 실제 앱의 1단계 뼈대, 라우트, 공통 레이아웃, 기본 테스트를 만든다.

**Architecture:** Next.js App Router 기반으로 화면 라우트를 먼저 고정한다. 데이터 저장은 아직 붙이지 않고, 샘플 데이터와 재사용 컴포넌트 자리만 만든다. 기존 루트 HTML 파일들은 변경하지 않는다.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules 또는 전역 CSS 토큰, Vitest, Testing Library.

---

## Context

현재 루트에는 정적 HTML 프로토타입이 이미 존재한다.

```text
dashboard.html
builder-room.html
write-log.html
write-question.html
write-feedback.html
write-knowledge.html
knowledge-list.html
questions-list.html
logs-list.html
feedback-list.html
projects-list.html
knowledge-detail.html
question-detail.html
log-detail.html
feedback-detail.html
```

이번 계획에서는 위 파일을 삭제하거나 이동하지 않는다.

참고 문서:

```text
docs/builderclub-app-routes.md
docs/builderclub-component-map.md
docs/builderclub-data-model.md
docs/builderclub-implementation-plan.md
```

최종 앱 폴더:

```text
builderclub-app/
```

---

## Task 1: Create The App Project

**Files:**

- Create: `builderclub-app/`
- Preserve: root `*.html`

**Step 1: Confirm no existing app folder**

Run:

```powershell
Test-Path -LiteralPath .\builderclub-app
```

Expected:

```text
False
```

If it returns `True`, inspect the folder before continuing.

**Step 2: Create the Next.js app**

Run:

```powershell
npx create-next-app@latest builderclub-app --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*"
```

Expected:

```text
Success! Created builderclub-app
```

If the command asks interactive questions, choose:

```text
TypeScript: Yes
ESLint: Yes
App Router: Yes
src directory: Yes
Tailwind: No
import alias: @/*
```

**Step 3: Verify package scripts**

Run:

```powershell
Get-Content -LiteralPath .\builderclub-app\package.json
```

Expected:

- `dev`
- `build`
- `start`
- `lint`

**Step 4: Run the initial build**

Run:

```powershell
cd .\builderclub-app
npm run build
```

Expected:

```text
Compiled successfully
```

---

## Task 2: Add Test Setup

**Files:**

- Modify: `builderclub-app/package.json`
- Create: `builderclub-app/vitest.config.ts`
- Create: `builderclub-app/src/test/setup.ts`
- Create: `builderclub-app/src/test/smoke.test.ts`

**Step 1: Install test dependencies**

Run:

```powershell
cd .\builderclub-app
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected:

```text
added
```

**Step 2: Add test scripts**

Modify `builderclub-app/package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Keep any existing scripts that Next.js generated unless they conflict.

**Step 3: Create Vitest config**

Create `builderclub-app/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 4: Install React plugin if needed**

If `@vitejs/plugin-react` is not installed, run:

```powershell
npm install -D @vitejs/plugin-react
```

**Step 5: Create test setup**

Create `builderclub-app/src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 6: Create smoke test**

Create `builderclub-app/src/test/smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test setup", () => {
  it("runs vitest", () => {
    expect(true).toBe(true);
  });
});
```

**Step 7: Run tests**

Run:

```powershell
npm test
```

Expected:

```text
1 passed
```

---

## Task 3: Add Route Registry

**Files:**

- Create: `builderclub-app/src/config/routes.ts`
- Create: `builderclub-app/src/config/routes.test.ts`

**Step 1: Write failing route test**

Create `builderclub-app/src/config/routes.test.ts`:

```ts
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
```

**Step 2: Run test to verify it fails**

Run:

```powershell
npm test -- src/config/routes.test.ts
```

Expected:

```text
FAIL
Cannot find module './routes'
```

**Step 3: Implement route registry**

Create `builderclub-app/src/config/routes.ts`:

```ts
export const appRoutes = {
  home: "/",
  dashboard: "/dashboard",
  builderRoom: (handle: string) => `/builders/${handle}`,
  projects: "/projects",
  logs: {
    index: "/logs",
    new: "/logs/new",
    detail: (id: string) => `/logs/${id}`,
  },
  questions: {
    index: "/questions",
    new: "/questions/new",
    detail: (id: string) => `/questions/${id}`,
  },
  feedback: {
    index: "/feedback",
    new: "/feedback/new",
    detail: (id: string) => `/feedback/${id}`,
  },
  knowledge: {
    index: "/knowledge",
    new: "/knowledge/new",
    detail: (id: string) => `/knowledge/${id}`,
  },
} as const;

export const primaryNavigation = [
  { label: "대시보드", href: appRoutes.dashboard },
  { label: "빌더룸", href: appRoutes.builderRoom("builder-a") },
  { label: "프로젝트", href: appRoutes.projects },
  { label: "빌드로그", href: appRoutes.logs.index },
  { label: "질문", href: appRoutes.questions.index },
  { label: "피드백", href: appRoutes.feedback.index },
  { label: "지식 공유", href: appRoutes.knowledge.index },
] as const;
```

**Step 4: Run test**

Run:

```powershell
npm test -- src/config/routes.test.ts
```

Expected:

```text
PASS
```

---

## Task 4: Add Design Tokens And Global Styles

**Files:**

- Modify: `builderclub-app/src/app/globals.css`

**Step 1: Replace global styles**

Modify `builderclub-app/src/app/globals.css`:

```css
:root {
  --bg: #f5f7f4;
  --surface: #fffefa;
  --surface-2: #edf3ef;
  --ink: #17201d;
  --muted: #66716c;
  --line: #d9e0d9;
  --line-strong: #aeb9b1;
  --green: #2f7656;
  --green-dark: #214f3d;
  --blue: #2456a6;
  --clay: #b85f43;
  --amber: #a97813;
  --red: #a93e3e;
  --shadow: 0 16px 38px rgba(34, 43, 38, 0.1);
  --radius: 8px;
  --sidebar: 264px;
}

* {
  box-sizing: border-box;
}

html {
  color-scheme: light;
}

body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(23, 32, 29, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, rgba(23, 32, 29, 0.035) 1px, transparent 1px),
    var(--bg);
  background-size: 34px 34px;
  color: var(--ink);
  font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

:focus-visible {
  outline: 3px solid rgba(36, 86, 166, 0.72);
  outline-offset: 3px;
}
```

**Step 2: Build**

Run:

```powershell
npm run build
```

Expected:

```text
Compiled successfully
```

---

## Task 5: Add Core Layout Components

**Files:**

- Create: `builderclub-app/src/components/layout/AppShell.tsx`
- Create: `builderclub-app/src/components/layout/AppShell.module.css`
- Create: `builderclub-app/src/components/navigation/SidebarNav.tsx`
- Create: `builderclub-app/src/components/navigation/SidebarNav.module.css`
- Create: `builderclub-app/src/components/layout/PageHeader.tsx`
- Create: `builderclub-app/src/components/layout/PageHeader.module.css`
- Create: `builderclub-app/src/components/layout/AppShell.test.tsx`

**Step 1: Write failing layout test**

Create `builderclub-app/src/components/layout/AppShell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders primary navigation and main content", () => {
    render(
      <AppShell>
        <h1>대시보드</h1>
      </AppShell>,
    );

    expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /빌드로그/ })).toHaveAttribute("href", "/logs");
    expect(screen.getByRole("main")).toHaveTextContent("대시보드");
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```powershell
npm test -- src/components/layout/AppShell.test.tsx
```

Expected:

```text
FAIL
Cannot find module './AppShell'
```

**Step 3: Implement `SidebarNav`**

Create `builderclub-app/src/components/navigation/SidebarNav.tsx`:

```tsx
import Link from "next/link";
import { primaryNavigation } from "@/config/routes";
import styles from "./SidebarNav.module.css";

export function SidebarNav() {
  return (
    <nav aria-label="주요 메뉴" className={styles.nav}>
      <div className={styles.brand}>
        <strong>Builder Club</strong>
        <span>Community OS</span>
      </div>
      <ul className={styles.list}>
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

Create `builderclub-app/src/components/navigation/SidebarNav.module.css`:

```css
.nav {
  position: sticky;
  top: 0;
  height: 100vh;
  border-right: 1px solid var(--line);
  background: rgba(255, 254, 250, 0.94);
  padding: 22px 16px;
  overflow-y: auto;
}

.brand {
  display: grid;
  gap: 2px;
  margin-bottom: 24px;
  padding: 0 8px;
}

.brand strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.6rem;
  line-height: 1;
}

.brand span {
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list a {
  display: flex;
  align-items: center;
  min-height: 44px;
  border-radius: var(--radius);
  padding: 8px 10px;
  color: #34413c;
  font-weight: 850;
}

.list a:hover {
  background: var(--surface-2);
  color: var(--green-dark);
}
```

**Step 4: Implement `AppShell`**

Create `builderclub-app/src/components/layout/AppShell.tsx`:

```tsx
import { ReactNode } from "react";
import { SidebarNav } from "@/components/navigation/SidebarNav";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <SidebarNav />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
```

Create `builderclub-app/src/components/layout/AppShell.module.css`:

```css
.shell {
  display: grid;
  grid-template-columns: var(--sidebar) minmax(0, 1fr);
  min-height: 100vh;
}

.main {
  min-width: 0;
  padding: 28px;
}

@media (max-width: 860px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .main {
    padding: 18px;
  }
}
```

**Step 5: Implement `PageHeader`**

Create `builderclub-app/src/components/layout/PageHeader.tsx`:

```tsx
import { ReactNode } from "react";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
```

Create `builderclub-app/src/components/layout/PageHeader.module.css`:

```css
.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--green-dark);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 0.96;
}

.description {
  max-width: 680px;
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 1rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
```

**Step 6: Run layout test**

Run:

```powershell
npm test -- src/components/layout/AppShell.test.tsx
```

Expected:

```text
PASS
```

---

## Task 6: Add Route Pages

**Files:**

- Modify: `builderclub-app/src/app/page.tsx`
- Create: `builderclub-app/src/app/dashboard/page.tsx`
- Create: `builderclub-app/src/app/builders/[handle]/page.tsx`
- Create: `builderclub-app/src/app/projects/page.tsx`
- Create: `builderclub-app/src/app/logs/page.tsx`
- Create: `builderclub-app/src/app/logs/new/page.tsx`
- Create: `builderclub-app/src/app/logs/[id]/page.tsx`
- Create: `builderclub-app/src/app/questions/page.tsx`
- Create: `builderclub-app/src/app/questions/new/page.tsx`
- Create: `builderclub-app/src/app/questions/[id]/page.tsx`
- Create: `builderclub-app/src/app/feedback/page.tsx`
- Create: `builderclub-app/src/app/feedback/new/page.tsx`
- Create: `builderclub-app/src/app/feedback/[id]/page.tsx`
- Create: `builderclub-app/src/app/knowledge/page.tsx`
- Create: `builderclub-app/src/app/knowledge/new/page.tsx`
- Create: `builderclub-app/src/app/knowledge/[id]/page.tsx`

**Step 1: Create a small route page pattern**

Each page should use:

```tsx
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Builder Club"
        title="화면 제목"
        description="화면 설명"
      />
    </AppShell>
  );
}
```

**Step 2: Modify root page**

Modify `builderclub-app/src/app/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/dashboard");
}
```

**Step 3: Create dashboard page**

Create `builderclub-app/src/app/dashboard/page.tsx`:

```tsx
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Community Activity"
        title="빌더클럽 대시보드"
        description="빌더들의 기록, 질문, 피드백, 지식 공유가 모이는 전체 커뮤니티 활동 화면입니다."
      />
    </AppShell>
  );
}
```

**Step 4: Create remaining pages**

Use these titles:

| Route | Title |
|---|---|
| `/builders/[handle]` | 빌더룸 |
| `/projects` | 프로젝트 |
| `/logs` | 빌드로그 |
| `/logs/new` | 빌드로그 작성 |
| `/logs/[id]` | 빌드로그 상세 |
| `/questions` | 질문 |
| `/questions/new` | 질문 작성 |
| `/questions/[id]` | 질문 상세 |
| `/feedback` | 피드백 |
| `/feedback/new` | 피드백 요청 작성 |
| `/feedback/[id]` | 피드백 상세 |
| `/knowledge` | 지식 공유 |
| `/knowledge/new` | 지식 공유 작성 |
| `/knowledge/[id]` | 지식 공유 상세 |

**Step 5: Run build**

Run:

```powershell
npm run build
```

Expected:

```text
Compiled successfully
```

---

## Task 7: Add Page Structure Tests

**Files:**

- Create: `builderclub-app/src/app/app-pages.test.tsx`

**Step 1: Create page smoke tests**

Create `builderclub-app/src/app/app-pages.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardPage from "./dashboard/page";
import ProjectsPage from "./projects/page";
import LogsPage from "./logs/page";
import QuestionsPage from "./questions/page";
import FeedbackPage from "./feedback/page";
import KnowledgePage from "./knowledge/page";

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
```

**Step 2: Run tests**

Run:

```powershell
npm test
```

Expected:

```text
PASS
```

---

## Task 8: Add Skeleton Content Components

**Files:**

- Create: `builderclub-app/src/components/cards/ContentCard.tsx`
- Create: `builderclub-app/src/components/cards/ContentCard.module.css`
- Create: `builderclub-app/src/components/status/StatusBadge.tsx`
- Create: `builderclub-app/src/components/status/StatusBadge.module.css`
- Create: `builderclub-app/src/components/tags/TagList.tsx`
- Create: `builderclub-app/src/components/tags/TagList.module.css`
- Create: `builderclub-app/src/components/cards/ContentCard.test.tsx`

**Step 1: Write failing card test**

Create `builderclub-app/src/components/cards/ContentCard.test.tsx`:

```tsx
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
        tags={["UI", "Claude Code"]}
      />,
    );

    expect(screen.getByRole("link", { name: /로그인 화면 개선/ })).toHaveAttribute("href", "/logs/log-1");
    expect(screen.getByText("shared")).toBeInTheDocument();
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
  });
});
```

**Step 2: Implement status and tags**

Create `StatusBadge.tsx`:

```tsx
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={styles.badge}>{status}</span>;
}
```

Create `TagList.tsx`:

```tsx
import styles from "./TagList.module.css";

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
```

**Step 3: Implement content card**

Create `ContentCard.tsx`:

```tsx
import Link from "next/link";
import { StatusBadge } from "@/components/status/StatusBadge";
import { TagList } from "@/components/tags/TagList";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  title: string;
  summary: string;
  href: string;
  status: string;
  tags?: string[];
};

export function ContentCard({ title, summary, href, status, tags = [] }: ContentCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <StatusBadge status={status} />
      </div>
      <h2>
        <Link href={href}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <TagList tags={tags} />
    </article>
  );
}
```

**Step 4: Add minimal CSS**

Create matching CSS modules with simple, stable styles:

```css
.card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 254, 250, 0.96);
  padding: 18px;
  box-shadow: var(--shadow);
}
```

Use similar small classes for badges and tags.

**Step 5: Run tests**

Run:

```powershell
npm test
```

Expected:

```text
PASS
```

---

## Task 9: Wire Sample Cards Into Dashboard

**Files:**

- Create: `builderclub-app/src/data/sample-content.ts`
- Modify: `builderclub-app/src/app/dashboard/page.tsx`
- Create: `builderclub-app/src/app/dashboard/page.test.tsx`

**Step 1: Add sample data**

Create `builderclub-app/src/data/sample-content.ts`:

```ts
export const sampleActivities = [
  {
    title: "빌더 A가 빌드로그를 공유했습니다",
    summary: "로그인 화면의 사용자 흐름을 정리하고 다음 작업을 남겼습니다.",
    href: "/logs/log-1",
    status: "shared",
    tags: ["빌드로그", "UI"],
  },
  {
    title: "빌더 B가 질문을 등록했습니다",
    summary: "Supabase 권한 정책에서 막힌 부분을 질문으로 남겼습니다.",
    href: "/questions/question-1",
    status: "open",
    tags: ["질문", "Supabase"],
  },
];
```

**Step 2: Write dashboard test**

Create `builderclub-app/src/app/dashboard/page.test.tsx`:

```tsx
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
```

**Step 3: Update dashboard page**

Modify `builderclub-app/src/app/dashboard/page.tsx` to render `sampleActivities` with `ContentCard`.

**Step 4: Run tests**

Run:

```powershell
npm test
```

Expected:

```text
PASS
```

---

## Task 10: Final Verification

**Files:**

- Modify: `docs/builderclub-implementation-plan.md` only if the actual implementation changes the intended order.
- Do not modify root HTML files.

**Step 1: Run test suite**

Run:

```powershell
cd .\builderclub-app
npm test
```

Expected:

```text
PASS
```

**Step 2: Run build**

Run:

```powershell
npm run build
```

Expected:

```text
Compiled successfully
```

**Step 3: Confirm static prototype files remain**

Run from repository root:

```powershell
Test-Path .\dashboard.html
Test-Path .\builder-room.html
Test-Path .\index.html
```

Expected:

```text
True
True
True
```

**Step 4: Start dev server**

Run:

```powershell
cd .\builderclub-app
npm run dev
```

Expected:

```text
Local: http://localhost:3000
```

Open:

```text
http://localhost:3000/dashboard
```

Manual checks:

- Sidebar navigation is visible.
- Dashboard heading is visible.
- Sample activity cards are visible.
- `/builders/builder-a`, `/logs`, `/questions`, `/feedback`, `/knowledge` routes open.

---

## Handoff

Plan complete and saved to:

```text
docs/plans/2026-05-01-builderclub-app-skeleton.md
```

Recommended execution mode:

```text
현재 세션에서 Task 1부터 순서대로 실행
```

이 계획의 완료 기준은 `builderclub-app/` 안에 실제 앱 뼈대가 생기고, 테스트와 빌드가 통과하는 것이다.
