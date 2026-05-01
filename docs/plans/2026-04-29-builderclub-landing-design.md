# Builderclub Landing Design

## Goal

Create a shareable landing-page prototype for Builders Club as a concept page for the confirmed builders.

The page should help the confirmed builders understand how their personal builder rooms, shared dashboard, and common knowledge spaces fit together. This is not a commercial product plan. It should only show a structure that can also give a room to additional builders later if the group grows.

## Audience

- People joining or reviewing the Builders Club idea
- Side-project builders who want motivation, feedback, and shared learning
- AI coding tool users who want to document prompts, errors, and workflows
- Early collaborators who need to align on product scope before implementation

## Positioning

Builders Club is a process-first builder community. It is not a showcase for finished products only. The page should make four ideas clear:

1. Share knowledge and know-how.
2. Give each builder a personal space to record their process.
3. Collect each builder's progress into a shared dashboard.
4. Keep Claude Code knowledge and practical know-how in a common space.
5. Exchange user-perspective feedback when builders need it.

## Page Structure

1. Hero
   - Main message: "각자의 작업실, 하나의 빌더클럽"
   - Supporting copy explains confirmed builders, personal builder rooms, and shared progress.
   - CTA buttons: "빌더 작업 보기", "빌더룸 미리보기"

2. Problem
   - Show the pain points from the PRD: scattered notes, blocked solo work, lost AI prompts, weak feedback loops.

3. Confirmed Builders
   - Show the confirmed builders as placeholder cards without number-based labels.
   - Each card should include project status, progress, latest log, and current help/feedback need.

4. Personal Builder Room Preview
   - Show the private/self-owned recording surface for one builder.
   - Include project goal, progress, build logs, blocked issues, AI prompts, feedback received, and next actions.

5. Shared Dashboard Preview
   - Include a dashboard-style mockup with recent logs from the builders, open questions, feedback requests, and project progress.
   - This is a visual prototype, not a working app.

6. Monthly Build Rhythm
   - Show the monthly cycle: declare, log, ask, solve, request feedback, share, reflect.

7. Builder Operating Structure
   - Explain the structure the current builders need: personal rooms, shared dashboard, common know-how, questions, and feedback.

8. Claude Code Knowledge Space
   - Create a common space for Claude Code setup, core usage, project workflow, prompts, errors, tips, and wiki-style references.

9. Final CTA
   - Invite the builders to review the structure together.

## Visual Direction

Use a calm, product-focused community interface rather than a decorative marketing page. Avoid fake growth statistics, number-fixed labels, and commercial roadmap language. Make the builder cards, personal builder room, shared dashboard, and Claude Code know-how space feel tangible enough for the current builders to discuss.

The visual style should be warm, precise, and editorial:

- Light background with ink, clay, green, and blue accents
- Compact cards and dashboard panels with clear hierarchy
- Responsive layout for desktop and mobile
- Semantic HTML and accessible navigation
- No external dependencies

## Builder Room Record Fields

The landing should preview these recording fields:

- 오늘 작업한 것
- 막힌 부분
- 시도한 방법
- 해결한 방법
- 사용한 AI 프롬프트
- 오늘 배운 점
- 다음 작업
- 피드백 받고 싶은 부분

## Out Of Scope

- Real login
- Database
- Posting, commenting, or search behavior
- Supabase integration
- Admin tools
- Mobile app
- Commercial product roadmap

## Implementation Target

Modify `index.html` as a standalone static prototype that can be opened directly in a browser.
