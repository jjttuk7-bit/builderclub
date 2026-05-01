# Knowledge List Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone knowledge sharing list screen connected from the dashboard and knowledge writer.

**Architecture:** Keep existing static pages intact. Create `knowledge-list.html` as a searchable, filterable static prototype for browsing shared knowledge. Link it from `dashboard.html` and `write-knowledge.html`. Verify the expected browsing controls and sections with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/knowledge-list-structure.test.mjs`

**Steps:**
1. Assert `knowledge-list.html` exists.
2. Assert the page contains the required list browsing sections.
3. Assert `dashboard.html` and `write-knowledge.html` link to `knowledge-list.html`.

### Task 2: List Page

**Files:**
- Create: `knowledge-list.html`
- Modify: `dashboard.html`
- Modify: `write-knowledge.html`

**Steps:**
1. Build a list-first layout, not a landing page.
2. Include search, category filter, tag filter, sort controls, pinned knowledge, knowledge cards, Claude Code know-how, and a write button.
3. Include navigation back to the dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/knowledge-list-structure.test.mjs`.
2. Run all existing structure tests.
