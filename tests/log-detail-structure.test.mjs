import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const detailHtml = readFileSync(new URL('../log-detail.html', import.meta.url), 'utf8');
const listHtml = readFileSync(new URL('../logs-list.html', import.meta.url), 'utf8');

const requiredDetailSnippets = [
  '<main class="log-detail"',
  '빌드로그 상세',
  '작성자',
  '관련 프로젝트',
  '오늘 작업한 것',
  '막힌 부분',
  '시도한 방법',
  '해결한 방법',
  '사용한 AI 프롬프트',
  '오늘 배운 점',
  '다음 작업',
  '질문으로 전환',
  '지식으로 공유',
  '피드백 요청',
  '태그',
  'logs-list.html',
  'dashboard.html',
];

for (const snippet of requiredDetailSnippets) {
  assert.ok(detailHtml.includes(snippet), `Missing log-detail snippet: ${snippet}`);
}

assert.ok(listHtml.includes('href="log-detail.html"'), 'logs list should link to log-detail.html');
