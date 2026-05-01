import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');

const requiredSnippets = [
  '<main class="dashboard"',
  '전체 커뮤니티 활동',
  '최근 활동 피드',
  '도움이 필요한 질문',
  '최근 피드백 요청',
  '빌더별 개인공간',
  'builder-rooms',
  '프로젝트 진행 현황',
  'Claude Code 노하우',
  'aria-label="주요 대시보드 메뉴"',
  'type="search"',
];

for (const snippet of requiredSnippets) {
  assert.ok(html.includes(snippet), `Missing dashboard snippet: ${snippet}`);
}

assert.ok(!html.includes('각자의 작업실, 하나의 빌더클럽'), 'dashboard.html should not reuse the landing hero headline');
assert.ok(html.includes('href="index.html"'), 'dashboard should retain a path back to the existing landing page');
