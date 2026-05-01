import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const questionHtml = readFileSync(new URL('../write-question.html', import.meta.url), 'utf8');
const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');

const requiredQuestionSnippets = [
  '<main class="write-question"',
  '질문 작성',
  '질문 제목',
  '관련 프로젝트',
  '막힌 상황',
  '에러 메시지 / 증상',
  '이미 시도한 방법',
  '관련 코드나 프롬프트',
  '원하는 도움',
  '긴급도',
  '태그',
  '공유 범위',
  'builder-room.html',
  'dashboard.html',
];

for (const snippet of requiredQuestionSnippets) {
  assert.ok(questionHtml.includes(snippet), `Missing write-question snippet: ${snippet}`);
}

assert.ok(roomHtml.includes('href="write-question.html"'), 'builder room should link to write-question.html');
assert.ok(dashboardHtml.includes('href="write-question.html"'), 'dashboard should link to write-question.html');
