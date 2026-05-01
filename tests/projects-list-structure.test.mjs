import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const listHtml = readFileSync(new URL('../projects-list.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');
const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');

const requiredListSnippets = [
  '<main class="projects-list"',
  '프로젝트 목록',
  '상단 검색',
  '빌더 필터',
  '상태 필터',
  '진행률 필터',
  '프로젝트 카드',
  '최근 빌드로그',
  '필요한 도움',
  '활발한 빌더',
  'builder-room.html',
  'dashboard.html',
];

for (const snippet of requiredListSnippets) {
  assert.ok(listHtml.includes(snippet), `Missing projects-list snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="projects-list.html"'), 'dashboard should link to projects-list.html');
assert.ok(roomHtml.includes('href="projects-list.html"'), 'builder room should link to projects-list.html');
