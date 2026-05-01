import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const detailHtml = readFileSync(new URL('../knowledge-detail.html', import.meta.url), 'utf8');
const listHtml = readFileSync(new URL('../knowledge-list.html', import.meta.url), 'utf8');

const requiredDetailSnippets = [
  '<main class="knowledge-detail"',
  '지식 공유 상세',
  '작성자',
  '배운 배경 / 문제 상황',
  '핵심 내용',
  '적용한 방법',
  '사용한 AI 프롬프트',
  '재사용 팁',
  '태그',
  '연결된 빌드로그',
  '댓글',
  'knowledge-list.html',
  'dashboard.html',
];

for (const snippet of requiredDetailSnippets) {
  assert.ok(detailHtml.includes(snippet), `Missing knowledge-detail snippet: ${snippet}`);
}

assert.ok(listHtml.includes('href="knowledge-detail.html"'), 'knowledge list should link to knowledge-detail.html');
