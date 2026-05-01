import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const listHtml = readFileSync(new URL('../feedback-list.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');
const writeHtml = readFileSync(new URL('../write-feedback.html', import.meta.url), 'utf8');

const requiredListSnippets = [
  '<main class="feedback-list"',
  '피드백 요청 목록',
  '상단 검색',
  '상태 필터',
  '프로젝트 필터',
  '마감일 필터',
  '피드백 요청 카드',
  '확인받고 싶은 관점',
  '보고 싶은 화면 / 링크',
  '댓글 수',
  '마감 임박',
  'write-feedback.html',
  'dashboard.html',
];

for (const snippet of requiredListSnippets) {
  assert.ok(listHtml.includes(snippet), `Missing feedback-list snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="feedback-list.html"'), 'dashboard should link to feedback-list.html');
assert.ok(writeHtml.includes('href="feedback-list.html"'), 'feedback writer should link to feedback-list.html');
