import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const listHtml = readFileSync(new URL('../questions-list.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');
const writeHtml = readFileSync(new URL('../write-question.html', import.meta.url), 'utf8');

const requiredListSnippets = [
  '<main class="questions-list"',
  '질문 & 노하우 목록',
  '상단 검색',
  '상태 필터',
  '태그 필터',
  '긴급도순',
  '답변순',
  '열린 질문',
  '답변 대기',
  '해결된 노하우',
  '질문 카드',
  'write-question.html',
  'dashboard.html',
];

for (const snippet of requiredListSnippets) {
  assert.ok(listHtml.includes(snippet), `Missing questions-list snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="questions-list.html"'), 'dashboard should link to questions-list.html');
assert.ok(writeHtml.includes('href="questions-list.html"'), 'question writer should link to questions-list.html');
