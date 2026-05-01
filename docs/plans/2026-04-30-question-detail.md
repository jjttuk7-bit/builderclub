# Question Detail Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone question detail screen connected from the questions list.

**Architecture:** Keep existing static pages intact. Create `question-detail.html` as a detail view for one community question. Link it from `questions-list.html`. Verify the expected reading, answer, and resolution sections with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/question-detail-structure.test.mjs`

**Steps:**
1. Assert `question-detail.html` exists.
2. Assert the page contains the required question detail sections.
3. Assert `questions-list.html` links to `question-detail.html`.

### Task 2: Detail Page

**Files:**
- Create: `question-detail.html`
- Modify: `questions-list.html`

**Steps:**
1. Build a readable question detail layout, not a landing page.
2. Include title, author, related project, blocked situation, error or symptom, attempted methods, related code or prompt, desired help, answers, accepted answer, solved know-how conversion, tags, and navigation back to list/dashboard.
3. Keep responsive CSS inline so the file opens directly in a browser.

### Task 3: Verification

**Steps:**
1. Run `node tests/question-detail-structure.test.mjs`.
2. Run all existing structure tests.
