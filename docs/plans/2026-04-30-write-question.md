# Question Write Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone question writing screen connected from the builder room and dashboard.

**Architecture:** Keep existing static pages intact. Create `write-question.html` as a form-first static prototype for turning blocked builder-room notes into community questions. Link it from `builder-room.html` and `dashboard.html`. Verify the required fields with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/write-question-structure.test.mjs`

**Steps:**
1. Assert `write-question.html` exists.
2. Assert the page contains the required question fields.
3. Assert `builder-room.html` and `dashboard.html` link to `write-question.html`.

### Task 2: Write Page

**Files:**
- Create: `write-question.html`
- Modify: `builder-room.html`
- Modify: `dashboard.html`

**Steps:**
1. Build a question form, not a landing page.
2. Include fields for title, project, blocked situation, error or symptom, attempted methods, related code or prompt, desired help, urgency, tags, and share scope.
3. Include navigation back to the builder room and dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/write-question-structure.test.mjs`.
2. Run `node tests/write-log-structure.test.mjs`.
3. Run `node tests/builder-room-structure.test.mjs`.
4. Run `node tests/dashboard-structure.test.mjs`.
