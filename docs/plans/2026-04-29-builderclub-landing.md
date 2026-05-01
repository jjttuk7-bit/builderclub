# Builderclub Landing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a shareable static landing prototype for Builders Club based on the approved PRD direction and the confirmed builders' personal-room concept.

**Architecture:** Keep the prototype as a single standalone `index.html` file with semantic sections and embedded CSS. The page is a concept landing with builder cards, a personal builder-room mockup, a shared dashboard mockup, and a Claude Code know-how space. It is not a commercial product plan.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

---

### Task 1: Preserve The Approved Planning Artifacts

**Files:**
- Create: `docs/plans/2026-04-29-builderclub-landing-design.md`
- Create: `docs/plans/2026-04-29-builderclub-landing.md`

**Step 1: Write the design summary**

Document the approved landing scope, audience, page structure, visual direction, and out-of-scope items.

**Step 2: Write this implementation plan**

Save this plan with exact files and verification commands.

**Step 3: Commit**

Skip because `D:\projects\services\draft\builderclub` is not currently a git repository.

### Task 2: Update The Landing Page Around Builder Rooms

**Files:**
- Modify: `index.html`

**Step 1: Update document metadata**

Set Korean language metadata, title, and description for a Builders Club concept landing centered on the confirmed builders.

**Step 2: Replace page structure**

Use semantic sections:

- `header`
- `main`
- `section#home`
- `section#why`
- `section#builders`
- `section#builder-room`
- `section#dashboard`
- `section#rhythm`
- `section#club-structure`
- `section#claude-knowledge`
- `section#join`
- `footer`

**Step 3: Add confirmed-builder content**

Create placeholder cards for the confirmed builders. Use letter or name-based labels instead of number-based labels. Include status, latest log, and feedback/help need.

**Step 4: Add personal builder-room preview**

Show the recording surface for one builder, including these fields:

- 오늘 작업한 것
- 막힌 부분
- 시도한 방법
- 해결한 방법
- 사용한 AI 프롬프트
- 오늘 배운 점
- 다음 작업
- 피드백 받고 싶은 부분

**Step 5: Add shared dashboard preview**

Create a dashboard mockup that gathers builder activity: recent build logs, open questions, feedback requests, and project progress.

**Step 6: Explain the builder operating structure**

Show what the current builders need: personal rooms, shared dashboard, common know-how, questions, and feedback.

**Step 7: Add Claude Code knowledge space**

Show common categories from the PRD and existing Claude Code know-how notes: setup, core usage, project workflow, prompts, errors, tips, and wiki references.

**Step 8: Keep visual design grounded**

Use a light editorial/product palette and compact dashboard panels. Avoid fake community statistics, number-fixed labels, commercial roadmap language, and unnecessary target-user sections.

### Task 3: Verify The Static Prototype

**Files:**
- Verify: `index.html`

**Step 1: Parse the HTML**

Run:

```powershell
Select-String -Path .\index.html -Pattern '<main|id="builders"|id="builder-room"|id="dashboard"|id="club-structure"|id="claude-knowledge"|id="join"|aria-label|viewport'
```

Expected: All important semantic and accessibility markers are present.

**Step 2: Check file exists and has meaningful size**

Run:

```powershell
Get-Item .\index.html | Select-Object Name,Length,LastWriteTime
```

Expected: `index.html` exists and has non-trivial length.

**Step 3: Optional browser check**

Open `D:\projects\services\draft\builderclub\index.html` in a browser and review desktop/mobile layout.
