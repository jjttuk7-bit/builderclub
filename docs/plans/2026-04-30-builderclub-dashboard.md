# Builderclub Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new standalone community-activity dashboard while preserving the existing landing page.

**Architecture:** Keep `index.html` untouched. Create `dashboard.html` as a static, browser-openable dashboard prototype with inline CSS and semantic HTML. Add a lightweight Node structure check so the page can be verified without installing dependencies.

**Tech Stack:** Static HTML, CSS, vanilla browser behavior, Node.js built-in assertions for verification.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/dashboard-structure.test.mjs`

**Steps:**
1. Write a failing Node test that expects `dashboard.html` to exist.
2. Assert that the page contains the main dashboard landmarks and community activity sections.
3. Run `node tests/dashboard-structure.test.mjs`; expected result before implementation is a missing file failure.

### Task 2: Dashboard Page

**Files:**
- Create: `dashboard.html`
- Keep: `index.html`

**Steps:**
1. Build the first screen as a dashboard, not a landing hero.
2. Include sidebar navigation for dashboard, knowledge sharing, Q&A, build logs, projects, feedback, resources, and my page.
3. Include a top bar with search and quick actions.
4. Include weekly summary cards, a community activity feed, questions needing help, feedback requests, active projects, and Claude Code knowledge cards.
5. Use responsive CSS so the dashboard works on desktop and mobile.

### Task 3: Verification

**Steps:**
1. Run `node tests/dashboard-structure.test.mjs`.
2. Confirm `index.html` remains present and unmodified in purpose.
3. Open `dashboard.html` directly in a browser or through the app if visual review is needed.
