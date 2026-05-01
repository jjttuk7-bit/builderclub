import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const listHtml = readFileSync(new URL('../logs-list.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');
const writeHtml = readFileSync(new URL('../write-log.html', import.meta.url), 'utf8');

const requiredListSnippets = [
  '<main class="logs-list"',
  '빌드로그 목록',
  '상단 검색',
  '빌더 필터',
  '프로젝트 필터',
  '상태 필터',
  '날짜 필터',
  '빌드로그 카드',
  '오늘 작업한 것',
  '막힌 부분',
  '해결한 방법',
  '사용한 AI 프롬프트',
  'write-log.html',
  'dashboard.html',
];

for (const snippet of requiredListSnippets) {
  assert.ok(listHtml.includes(snippet), `Missing logs-list snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="logs-list.html"'), 'dashboard should link to logs-list.html');
assert.ok(writeHtml.includes('href="logs-list.html"'), 'build-log writer should link to logs-list.html');
