import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const detailHtml = readFileSync(new URL('../question-detail.html', import.meta.url), 'utf8');
const listHtml = readFileSync(new URL('../questions-list.html', import.meta.url), 'utf8');

const requiredDetailSnippets = [
  '<main class="question-detail"',
  '질문 상세',
  '작성자',
  '관련 프로젝트',
  '막힌 상황',
  '에러 메시지 / 증상',
  '이미 시도한 방법',
  '관련 코드나 프롬프트',
  '원하는 도움',
  '답변',
  '채택된 답변',
  '해결 노하우로 전환',
  '태그',
  'questions-list.html',
  'dashboard.html',
];

for (const snippet of requiredDetailSnippets) {
  assert.ok(detailHtml.includes(snippet), `Missing question-detail snippet: ${snippet}`);
}

assert.ok(listHtml.includes('href="question-detail.html"'), 'questions list should link to question-detail.html');
