import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');
const dashboardHtml = readFileSync(new URL('../dashboard.html', import.meta.url), 'utf8');

const requiredRoomSnippets = [
  '<main class="room-dashboard"',
  '빌더 A의 작업실',
  '프로젝트 목표',
  '오늘 작업한 것',
  '막힌 부분',
  '시도한 방법',
  '해결한 방법',
  '사용한 AI 프롬프트',
  '받은 피드백',
  '다음 작업',
  '공용 대시보드로 돌아가기',
];

for (const snippet of requiredRoomSnippets) {
  assert.ok(roomHtml.includes(snippet), `Missing builder room snippet: ${snippet}`);
}

assert.ok(dashboardHtml.includes('href="builder-room.html"'), 'dashboard should link to builder-room.html');
