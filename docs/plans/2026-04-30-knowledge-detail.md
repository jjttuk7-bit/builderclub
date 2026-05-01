# Knowledge Detail Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone knowledge detail screen connected from the knowledge list.

**Architecture:** Keep existing static pages intact. Create `knowledge-detail.html` as a detail view for one shared knowledge post. Link it from `knowledge-list.html`. Verify the expected reading sections and navigation with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/knowledge-detail-structure.test.mjs`

**Steps:**
1. Assert `knowledge-detail.html` exists.
2. Assert the page contains the required knowledge detail sections.
3. Assert `knowledge-list.html` links to `knowledge-detail.html`.

### Task 2: Detail Page

**Files:**
- Create: `knowledge-detail.html`
- Modify: `knowledge-list.html`

**Steps:**
1. Build a readable detail layout, not a landing page.
2. Include title, author, background, core content, applied method, AI prompt, reuse tip, tags, linked build log, comments, and navigation back to list/dashboard.
3. Keep responsive CSS inline so the file opens directly in a browser.

### Task 3: Verification

**Steps:**
1. Run `node tests/knowledge-detail-structure.test.mjs`.
2. Run all existing structure tests.
