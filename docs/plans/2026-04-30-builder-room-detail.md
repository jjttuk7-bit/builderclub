# Builder Room Detail Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone builder room detail page connected from the community dashboard.

**Architecture:** Keep the landing page and dashboard page intact. Create `builder-room.html` as a static prototype for one builder's personal workspace, then link the dashboard builder-room cards to it. Verify the required room sections with a lightweight Node script.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/builder-room-structure.test.mjs`

**Steps:**
1. Assert `builder-room.html` exists.
2. Assert the page contains the required builder-room recording sections.
3. Assert `dashboard.html` links to `builder-room.html`.

### Task 2: Builder Room Page

**Files:**
- Create: `builder-room.html`
- Modify: `dashboard.html`

**Steps:**
1. Build a workspace-first page, not a landing page.
2. Include project summary, progress, today's work, blocked issues, attempts, solved items, AI prompts, feedback, next actions, and share controls.
3. Keep responsive CSS inline so the file opens directly in a browser.
4. Add navigation back to `dashboard.html`.

### Task 3: Verification

**Steps:**
1. Run `node tests/builder-room-structure.test.mjs`.
2. Run `node tests/dashboard-structure.test.mjs`.
