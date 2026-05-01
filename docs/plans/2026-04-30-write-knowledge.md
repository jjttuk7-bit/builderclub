# Knowledge Write Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone knowledge sharing write screen connected from the builder room and dashboard.

**Architecture:** Keep existing static pages intact. Create `write-knowledge.html` as a form-first static prototype for turning solved problems and lessons into reusable community knowledge. Link it from `builder-room.html` and `dashboard.html`. Verify the expected fields and navigation with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/write-knowledge-structure.test.mjs`

**Steps:**
1. Assert `write-knowledge.html` exists.
2. Assert the page contains the required knowledge sharing fields.
3. Assert `builder-room.html` and `dashboard.html` link to `write-knowledge.html`.

### Task 2: Write Page

**Files:**
- Create: `write-knowledge.html`
- Modify: `builder-room.html`
- Modify: `dashboard.html`

**Steps:**
1. Build a knowledge-sharing form, not a landing page.
2. Include fields for title, category, background, core content, applied method, AI prompt, reference links, reuse tips, tags, and visibility.
3. Include navigation back to the builder room and dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/write-knowledge-structure.test.mjs`.
2. Run all existing structure tests.
