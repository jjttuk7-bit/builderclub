# Questions List Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone questions and know-how list screen connected from the dashboard and question writer.

**Architecture:** Keep existing static pages intact. Create `questions-list.html` as a searchable, filterable static prototype for browsing open questions and solved know-how. Link it from `dashboard.html` and `write-question.html`. Verify the expected browsing controls and sections with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/questions-list-structure.test.mjs`

**Steps:**
1. Assert `questions-list.html` exists.
2. Assert the page contains the required question browsing sections.
3. Assert `dashboard.html` and `write-question.html` link to `questions-list.html`.

### Task 2: List Page

**Files:**
- Create: `questions-list.html`
- Modify: `dashboard.html`
- Modify: `write-question.html`

**Steps:**
1. Build a question-board layout, not a landing page.
2. Include search, status filter, tag filter, sort controls, open questions, solved know-how, waiting-for-answer cards, and a question write button.
3. Include navigation back to the dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/questions-list-structure.test.mjs`.
2. Run all existing structure tests.
