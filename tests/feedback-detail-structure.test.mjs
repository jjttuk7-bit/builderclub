import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const detailHtml = readFileSync(new URL('../feedback-detail.html', import.meta.url), 'utf8');
const listHtml = readFileSync(new URL('../feedback-list.html', import.meta.url), 'utf8');

const requiredDetailSnippets = [
  '<main class="feedback-detail"',
  '피드백 상세',
  '작성자',
  '관련 프로젝트',
  '보고 싶은 화면 / 링크',
  '현재 상태',
  '확인받고 싶은 관점',
  '사용자가 해야 할 행동',
  '특별히 봐줬으면 하는 부분',
  '피드백 댓글',
  '반영 상태',
  '회고 연결',
  'feedback-list.html',
  'dashboard.html',
];

for (const snippet of requiredDetailSnippets) {
  assert.ok(detailHtml.includes(snippet), `Missing feedback-detail snippet: ${snippet}`);
}

assert.ok(listHtml.includes('href="feedback-detail.html"'), 'feedback list should link to feedback-detail.html');
