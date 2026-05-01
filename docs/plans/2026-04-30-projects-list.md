# Projects List Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone projects list screen connected from the dashboard and builder room.

**Architecture:** Keep existing static pages intact. Create `projects-list.html` as a searchable, filterable static prototype for browsing active builder projects. Link it from `dashboard.html`, `builder-room.html`, and writer pages that reference projects. Verify the expected browsing controls and sections with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/projects-list-structure.test.mjs`

**Steps:**
1. Assert `projects-list.html` exists.
2. Assert the page contains the required project browsing sections.
3. Assert `dashboard.html` and `builder-room.html` link to `projects-list.html`.

### Task 2: List Page

**Files:**
- Create: `projects-list.html`
- Modify: `dashboard.html`
- Modify: `builder-room.html`

**Steps:**
1. Build a project-board layout, not a landing page.
2. Include search, builder filter, status filter, progress filter, project cards, progress bars, recent build logs, needed help, active builders, and builder room links.
3. Include navigation back to the dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/projects-list-structure.test.mjs`.
2. Run all existing structure tests.
