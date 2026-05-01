# Feedback List Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone feedback request list screen connected from the dashboard and feedback writer.

**Architecture:** Keep existing static pages intact. Create `feedback-list.html` as a searchable, filterable static prototype for browsing user-perspective feedback requests. Link it from `dashboard.html` and `write-feedback.html`. Verify the expected browsing controls and sections with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/feedback-list-structure.test.mjs`

**Steps:**
1. Assert `feedback-list.html` exists.
2. Assert the page contains the required feedback browsing sections.
3. Assert `dashboard.html` and `write-feedback.html` link to `feedback-list.html`.

### Task 2: List Page

**Files:**
- Create: `feedback-list.html`
- Modify: `dashboard.html`
- Modify: `write-feedback.html`

**Steps:**
1. Build a feedback-board layout, not a landing page.
2. Include search, status filter, project filter, due date filter, feedback request cards, review focus, screen links, comment counts, due-soon requests, and a write button.
3. Include navigation back to the dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/feedback-list-structure.test.mjs`.
2. Run all existing structure tests.
