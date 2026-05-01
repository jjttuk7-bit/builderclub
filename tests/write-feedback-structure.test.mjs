import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const feedbackHtml = readFileSync(new URL('../write-feedback.html', import.meta.url), 'utf8');
const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');

const requiredFeedbackSnippets = [
  '<main class="write-feedback"',
  '피드백 요청 작성',
  '피드백 요청 제목',
  '관련 프로젝트',
  '보고 싶은 화면 / 링크',
  '현재 상태',
  '확인받고 싶은 관점',
  '사용자가 해야 할 행동',
  '특별히 봐줬으면 하는 부분',
  '마감일',
  '공유 범위',
  'builder-room.html',
  'dashboard.html',
];

for (const snippet of requiredFeedbackSnippets) {
  assert.ok(feedbackHtml.includes(snippet), `Missing write-feedback snippet: ${snippet}`);
}

assert.ok(roomHtml.includes('href="write-feedback.html"'), 'builder room should link to write-feedback.html');
assert.ok(dashboardHtml.includes('href="write-feedback.html"'), 'dashboard should link to write-feedback.html');
