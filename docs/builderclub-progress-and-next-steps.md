# 빌더클럽 프로토타입 진행 기록과 다음 단계

작성일: 2026-04-30

## 1. 작업 목적

초기 랜딩 페이지 설명 중심 구조에서 벗어나, 실제 빌더클럽 서비스의 핵심 흐름을 볼 수 있는 정적 HTML 프로토타입을 만들었다.

이번 작업의 목표는 다음과 같다.

- 공용 대시보드 구조를 만든다.
- 빌더별 개인공간인 빌더룸 구조를 만든다.
- 기록, 질문, 피드백, 지식 공유의 작성 흐름을 만든다.
- 작성된 내용을 모아보는 목록 화면을 만든다.
- 목록에서 들어가는 상세 화면을 만든다.
- 이후 실제 앱 개발로 전환할 때 필요한 화면 명세와 데이터 구조의 기준을 확보한다.

## 2. 작업 방식

작업은 기존 `index.html` 랜딩 페이지를 유지한 상태에서, 새 HTML 파일을 하나씩 추가하는 방식으로 진행했다.

각 화면은 다음 순서로 만들었다.

1. 필요한 화면 구조를 먼저 정했다.
2. 해당 화면이 반드시 포함해야 할 항목을 테스트 파일로 작성했다.
3. 테스트를 먼저 실행해 실패를 확인했다.
4. 새 HTML 파일을 만들었다.
5. 기존 화면에서 새 화면으로 이동하는 링크를 연결했다.
6. 구조 테스트를 다시 실행해 통과 여부를 확인했다.

즉, 단순히 화면을 그린 것이 아니라 각 화면의 핵심 구성 요소를 테스트로 고정하면서 진행했다.

## 3. 현재 만들어진 화면

### 기존 랜딩

- `index.html`
  - 기존 랜딩 페이지.
  - 삭제하지 않고 그대로 보존했다.

### 공용 대시보드

- `dashboard.html`
  - 전체 커뮤니티 활동 중심 대시보드.
  - 최근 활동 피드, 질문, 피드백, 프로젝트, 빌더룸, Claude Code 노하우를 한 화면에서 볼 수 있다.

### 빌더별 개인공간

- `builder-room.html`
  - 빌더 A의 개인 작업실 예시.
  - 프로젝트 목표, 오늘 작업, 막힌 부분, 시도/해결, AI 프롬프트, 받은 피드백, 다음 작업을 볼 수 있다.

### 작성 화면

- `write-log.html`
  - 빌드로그 작성 화면.
  - 오늘 작업한 것, 막힌 부분, 시도한 방법, 해결한 방법, 사용한 AI 프롬프트, 오늘 배운 점, 다음 작업, 공유 범위를 기록한다.

- `write-question.html`
  - 질문 작성 화면.
  - 막힌 상황, 에러/증상, 이미 시도한 방법, 관련 코드나 프롬프트, 원하는 도움, 긴급도, 태그를 기록한다.

- `write-feedback.html`
  - 피드백 요청 작성 화면.
  - 보고 싶은 화면, 현재 상태, 확인받고 싶은 관점, 사용자가 해야 할 행동, 마감일을 기록한다.

- `write-knowledge.html`
  - 지식 공유 작성 화면.
  - 배운 배경, 핵심 내용, 적용한 방법, AI 프롬프트, 참고 링크, 재사용 팁, 태그를 기록한다.

### 목록 화면

- `knowledge-list.html`
  - 지식 공유 목록.
  - 검색, 카테고리 필터, 태그 필터, 정렬, 고정 지식, Claude Code 노하우를 포함한다.

- `questions-list.html`
  - 질문 & 노하우 목록.
  - 열린 질문, 답변 대기, 해결된 노하우를 볼 수 있다.

- `logs-list.html`
  - 빌드로그 목록.
  - 빌더별 제작 기록, 막힌 부분, 해결 방법, AI 프롬프트를 볼 수 있다.

- `feedback-list.html`
  - 피드백 요청 목록.
  - 대기/진행/완료 상태, 마감 임박 요청, 피드백 관점을 볼 수 있다.

- `projects-list.html`
  - 프로젝트 목록.
  - 빌더별 프로젝트 진행률, 최근 빌드로그, 필요한 도움, 빌더룸 연결을 볼 수 있다.

### 상세 화면

- `knowledge-detail.html`
  - 지식 공유 상세.
  - 배운 배경, 핵심 내용, 적용 방법, AI 프롬프트, 재사용 팁, 댓글을 볼 수 있다.

- `question-detail.html`
  - 질문 상세.
  - 막힌 상황, 에러/증상, 시도한 방법, 관련 프롬프트, 답변, 채택된 답변, 해결 노하우 전환을 볼 수 있다.

- `log-detail.html`
  - 빌드로그 상세.
  - 오늘 작업, 막힌 부분, 시도/해결, AI 프롬프트, 다음 작업을 보고 질문/지식/피드백으로 전환할 수 있다.

- `feedback-detail.html`
  - 피드백 상세.
  - 요청 화면, 확인 관점, 사용자 행동, 피드백 댓글, 반영 상태, 회고 연결을 볼 수 있다.

## 4. 현재 화면 흐름

현재 프로토타입은 아래 흐름을 가진다.

```text
index.html
└── dashboard.html
    ├── builder-room.html
    │   ├── write-log.html
    │   ├── write-question.html
    │   ├── write-feedback.html
    │   └── write-knowledge.html
    │
    ├── knowledge-list.html
    │   └── knowledge-detail.html
    │
    ├── questions-list.html
    │   └── question-detail.html
    │
    ├── logs-list.html
    │   └── log-detail.html
    │
    ├── feedback-list.html
    │   └── feedback-detail.html
    │
    └── projects-list.html
        └── builder-room.html
```

핵심 루프는 다음과 같다.

```text
빌더룸에서 기록한다
→ 막히면 질문한다
→ 만든 화면은 피드백을 요청한다
→ 해결하거나 배운 내용은 지식으로 공유한다
→ 공용 대시보드와 목록 화면에 모인다
```

## 5. 검증 방식

각 화면마다 구조 테스트를 만들었다.

현재 테스트 파일은 다음과 같다.

- `tests/dashboard-structure.test.mjs`
- `tests/builder-room-structure.test.mjs`
- `tests/write-log-structure.test.mjs`
- `tests/write-question-structure.test.mjs`
- `tests/write-feedback-structure.test.mjs`
- `tests/write-knowledge-structure.test.mjs`
- `tests/knowledge-list-structure.test.mjs`
- `tests/questions-list-structure.test.mjs`
- `tests/logs-list-structure.test.mjs`
- `tests/feedback-list-structure.test.mjs`
- `tests/projects-list-structure.test.mjs`
- `tests/knowledge-detail-structure.test.mjs`
- `tests/question-detail-structure.test.mjs`
- `tests/log-detail-structure.test.mjs`
- `tests/feedback-detail-structure.test.mjs`

각 테스트는 해당 HTML 파일이 존재하는지, 필수 문구와 링크가 포함되어 있는지 확인한다.

## 6. 지금까지 정리된 제품 구조

빌더클럽은 다음 구조로 보는 것이 가장 자연스럽다.

```text
공용 대시보드
├── 전체 활동 피드
├── 지식 공유
├── 질문 & 노하우
├── 빌드로그
├── 피드백 요청
├── 프로젝트 현황
└── 빌더별 개인공간
```

빌더별 개인공간은 다음 역할을 한다.

```text
빌더룸
├── 프로젝트 목표
├── 오늘 작업한 것
├── 막힌 부분
├── 시도한 방법
├── 해결한 방법
├── 사용한 AI 프롬프트
├── 받은 피드백
├── 다음 작업
└── 공용 공간으로 전환할 기록
```

## 7. 실제 앱으로 전환할 때 필요한 데이터 모델

다음 단계에서 실제 서비스를 만들려면 아래 데이터 모델을 정리해야 한다.

```text
builders
projects
build_logs
knowledge_posts
questions
feedback_requests
comments
tags
attachments
activity_feed
```

각 테이블의 주요 역할은 다음과 같다.

- `builders`: 빌더 프로필과 개인공간의 소유자.
- `projects`: 빌더가 진행 중인 프로젝트.
- `build_logs`: 제작 과정 기록.
- `knowledge_posts`: 해결 과정과 노하우를 정리한 글.
- `questions`: 막힌 부분을 공용 질문으로 전환한 글.
- `feedback_requests`: 사용자 관점 피드백 요청.
- `comments`: 질문 답변, 피드백 댓글, 지식 글 댓글.
- `tags`: 검색과 분류를 위한 태그.
- `attachments`: 화면 캡처, 링크, 참고 자료.
- `activity_feed`: 대시보드에 표시할 통합 활동 기록.

## 8. 앞으로 진행할 작업

### 1단계: 데이터 모델 문서화

다음으로 할 가장 좋은 작업은 데이터 모델 정리다.

만들 문서:

```text
docs/builderclub-data-model.md
```

포함할 내용:

- 테이블 목록
- 필드 정의
- 관계 구조
- 공개 범위
- 활동 피드 생성 기준
- 작성 화면과 테이블 매핑

### 2단계: 실제 앱 라우트 설계

정적 HTML을 실제 앱 구조로 옮기기 위한 라우트를 정의한다.

예상 라우트:

```text
/dashboard
/builders/[id]
/projects
/knowledge
/knowledge/[id]
/questions
/questions/[id]
/logs
/logs/[id]
/feedback
/feedback/[id]
/write/log
/write/question
/write/feedback
/write/knowledge
```

### 3단계: 공통 컴포넌트 분리 설계

실제 앱에서 반복될 UI를 컴포넌트로 정리한다.

예상 컴포넌트:

```text
AppLayout
Sidebar
Topbar
FilterBar
SummaryCard
ActivityFeed
BuilderRoomCard
ProjectCard
PostCard
DetailHeader
CommentList
WriteForm
ProgressBar
TagList
```

### 4단계: Next.js 또는 React 앱으로 전환

정적 HTML을 실제 앱으로 옮긴다.

진행 순서:

```text
1. 프로젝트 생성
2. 공통 레이아웃 구현
3. 정적 데이터를 사용해 화면 이식
4. 작성 폼 상태 처리
5. Supabase 또는 DB 연결
6. 로그인 연결
7. 저장 기능 구현
8. 댓글 기능 구현
9. 검색/필터 구현
10. 배포
```

### 5단계: 실제 저장 기능 구현

우선순위는 다음과 같다.

```text
1. 빌더/프로젝트 등록
2. 빌드로그 작성 및 저장
3. 질문 작성 및 답변
4. 피드백 요청 및 댓글
5. 지식 공유 작성
6. 통합 활동 피드 생성
```

## 9. 다음 추천 작업

바로 다음 작업은 `docs/builderclub-data-model.md` 작성이다.

이유:

- 화면 구조는 충분히 많이 잡혔다.
- 이제 실제 앱으로 넘어가려면 데이터 구조가 필요하다.
- 데이터 모델이 정리되면 Next.js, Supabase, API 설계로 넘어가기 쉬워진다.

추천 다음 순서:

```text
1. docs/builderclub-data-model.md 작성
2. docs/builderclub-app-routes.md 작성
3. docs/builderclub-implementation-plan.md 작성
4. 실제 앱 프로젝트 생성
```

## 10. 현재 상태 요약

현재는 실제 저장 기능은 없지만, 빌더클럽의 핵심 제품 흐름은 정적 HTML로 거의 확인할 수 있다.

완성된 흐름:

- 대시보드
- 빌더룸
- 작성 화면 4종
- 목록 화면 5종
- 상세 화면 4종

남은 큰 작업:

- 데이터 모델 정리
- 앱 라우트 정리
- 공통 컴포넌트 설계
- 실제 앱 구현
- DB/로그인/저장/댓글/검색 연결
