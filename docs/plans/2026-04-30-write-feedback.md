# Feedback Request Write Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a standalone feedback request writing screen connected from the builder room and dashboard.

**Architecture:** Keep existing static pages intact. Create `write-feedback.html` as a form-first static prototype for asking other builders to review a screen or flow from a user perspective. Link it from `builder-room.html` and `dashboard.html`. Verify the expected fields and navigation with a Node structure test.

**Tech Stack:** Static HTML, CSS, Node.js built-in assertions.

---

### Task 1: Structure Check

**Files:**
- Create: `tests/write-feedback-structure.test.mjs`

**Steps:**
1. Assert `write-feedback.html` exists.
2. Assert the page contains the required feedback request fields.
3. Assert `builder-room.html` and `dashboard.html` link to `write-feedback.html`.

### Task 2: Write Page

**Files:**
- Create: `write-feedback.html`
- Modify: `builder-room.html`
- Modify: `dashboard.html`

**Steps:**
1. Build a feedback-request form, not a landing page.
2. Include fields for request title, related project, screen or link, current status, review focus, expected user action, specific review points, due date, and share scope.
3. Include navigation back to the builder room and dashboard.

### Task 3: Verification

**Steps:**
1. Run `node tests/write-feedback-structure.test.mjs`.
2. Run all existing structure tests.
