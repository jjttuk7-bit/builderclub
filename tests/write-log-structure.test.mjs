import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const writeHtml = readFileSync(new URL('../write-log.html', import.meta.url), 'utf8');
const roomHtml = readFileSync(new URL('../builder-room.html', import.meta.url), 'utf8');

const requiredWriteSnippets = [
  '<main class="write-log"',
  '빌드로그 작성',
  '오늘 작업한 것',
  '막힌 부분',
  '시도한 방법',
  '해결한 방법',
  '사용한 AI 프롬프트',
  '오늘 배운 점',
  '다음 작업',
  '공유 범위',
  'builder-room.html',
  'dashboard.html',
];

for (const snippet of requiredWriteSnippets) {
  assert.ok(writeHtml.includes(snippet), `Missing write-log snippet: ${snippet}`);
}

assert.ok(roomHtml.includes('href="write-log.html"'), 'builder room should link to write-log.html');
