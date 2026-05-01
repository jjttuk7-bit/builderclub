import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const listHtml = readFileSync(new URL('../knowledge-list.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');
const writeHtml = readFileSync(new URL('../write-knowledge.html', import.meta.url), 'utf8');

const requiredListSnippets = [
  '<main class="knowledge-list"',
  '지식 공유 목록',
  '상단 검색',
  '카테고리 필터',
  '태그 필터',
  '최신순',
  '인기순',
  '해결됨',
  '고정 지식',
  '지식 글 카드',
  'Claude Code 노하우',
  'write-knowledge.html',
  'dashboard.html',
];

for (const snippet of requiredListSnippets) {
  assert.ok(listHtml.includes(snippet), `Missing knowledge-list snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="knowledge-list.html"'), 'dashboard should link to knowledge-list.html');
assert.ok(writeHtml.includes('href="knowledge-list.html"'), 'knowledge writer should link to knowledge-list.html');
