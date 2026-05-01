import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const knowledgeHtml = readFileSync(new URL('../write-knowledge.html', import.meta.url), 'utf8');
const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');

const requiredKnowledgeSnippets = [
  '<main class="write-knowledge"',
  '지식 공유 작성',
  '지식 공유 제목',
  '카테고리',
  '배운 배경 / 문제 상황',
  '핵심 내용',
  '적용한 방법',
  '사용한 AI 프롬프트',
  '참고 링크',
  '재사용 팁',
  '태그',
  '공개 범위',
  'builder-room.html',
  'dashboard.html',
];

for (const snippet of requiredKnowledgeSnippets) {
  assert.ok(knowledgeHtml.includes(snippet), `Missing write-knowledge snippet: ${snippet}`);
}

assert.ok(roomHtml.includes('href="write-knowledge.html"'), 'builder room should link to write-knowledge.html');
assert.ok(dashboardHtml.includes('href="write-knowledge.html"'), 'dashboard should link to write-knowledge.html');
