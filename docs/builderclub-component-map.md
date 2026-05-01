# 빌더클럽 컴포넌트 맵

작성일: 2026-05-01

## 1. 목적

이 문서는 현재 정적 HTML 프로토타입을 실제 앱으로 전환할 때 반복해서 재사용할 UI 컴포넌트를 정리한다.

앞선 문서들이 화면 흐름과 데이터 모델을 정리했다면, 이 문서는 화면을 구현 단위로 나누는 역할을 한다.

## 2. 컴포넌트 설계 원칙

- 대시보드, 목록, 상세, 작성 화면에서 반복되는 구조를 먼저 컴포넌트화한다.
- 빌더룸은 별도 화면처럼 보이지만, 내부 요소는 카드, 타임라인, 폼, 댓글, 상태 배지로 재사용한다.
- 콘텐츠 유형이 달라도 공통 속성은 같은 컴포넌트로 처리한다.
- 화면별 특수한 문구보다 데이터 타입, 상태, 액션을 기준으로 컴포넌트를 나눈다.
- 초기 MVP에서는 컴포넌트를 과하게 쪼개지 않고, 반복이 2회 이상 확인된 요소부터 분리한다.

## 3. 최상위 레이아웃 컴포넌트

| 컴포넌트 | 사용 화면 | 역할 |
|---|---|---|
| `AppShell` | 대시보드, 목록, 상세 | 사이드바와 메인 영역을 감싸는 기본 앱 레이아웃 |
| `SidebarNav` | 대시보드, 목록, 상세 | 주요 메뉴, 현재 위치, 항목 수 표시 |
| `TopBar` | 빌더룸, 작성 화면 | 브랜드, 뒤로가기, 주요 액션 버튼 표시 |
| `PageHeader` | 모든 주요 화면 | 제목, 설명, 상태, 보조 액션 표시 |
| `ContentGrid` | 대시보드, 목록 | 카드형 콘텐츠를 2열 또는 3열로 배치 |
| `DetailLayout` | 상세 화면 | 본문, 메타 정보, 댓글 영역을 배치 |
| `FormLayout` | 작성 화면 | 입력 섹션, 저장 액션, 공개 범위를 배치 |

## 4. 탐색 컴포넌트

### `SidebarNav`

역할:

- 대시보드, 빌드로그, 질문, 피드백, 지식 공유, 프로젝트, 빌더룸으로 이동한다.
- 현재 페이지를 `aria-current`로 표시한다.
- 각 메뉴의 새 활동 수를 표시할 수 있다.

필요 데이터:

```text
items: {
  label
  href
  icon
  count
  current
}
```

### `Breadcrumb`

사용 화면:

- 상세 화면
- 작성 화면
- 빌더룸 내부 하위 흐름

예시:

```text
대시보드 / 질문 / 질문 상세
대시보드 / 빌더룸 / 빌드로그 작성
```

## 5. 카드 컴포넌트

### `ActivityCard`

사용 화면:

- `/dashboard`

역할:

- 최근 활동 피드 한 건을 보여준다.
- 빌드로그, 질문, 피드백, 지식 공유를 같은 형태로 표시한다.

필요 데이터:

```text
type
title
summary
builder
project
createdAt
href
status
tags
```

### `ContentCard`

사용 화면:

- `/logs`
- `/questions`
- `/feedback`
- `/knowledge`
- `/projects`

역할:

- 목록 화면에서 콘텐츠 한 건을 보여준다.
- 콘텐츠 유형에 따라 하단 액션만 달라진다.

변형:

| 변형 | 사용처 |
|---|---|
| `log` | 빌드로그 목록 |
| `question` | 질문 목록 |
| `feedback` | 피드백 목록 |
| `knowledge` | 지식 공유 목록 |
| `project` | 프로젝트 목록 |

### `BuilderRoomCard`

사용 화면:

- `/dashboard`
- `/builders/[handle]`
- `/projects`

역할:

- 빌더의 개인 공간 진입점을 보여준다.
- 현재 프로젝트, 최근 작업, 필요한 도움을 요약한다.

### `MetricCard`

사용 화면:

- `/dashboard`
- `/builders/[handle]`

역할:

- 열린 질문 수, 진행 중 피드백 수, 이번 주 빌드로그 수, 공유 지식 수를 보여준다.

## 6. 상태와 메타 컴포넌트

### `StatusBadge`

역할:

- 콘텐츠의 현재 상태를 표시한다.

상태 예시:

| 콘텐츠 | 상태 |
|---|---|
| 프로젝트 | `planning`, `building`, `feedback`, `completed`, `paused` |
| 빌드로그 | `draft`, `shared`, `converted`, `archived` |
| 질문 | `open`, `answered`, `solved`, `archived` |
| 피드백 | `requested`, `in_review`, `applied`, `closed` |
| 지식 공유 | `draft`, `published`, `pinned`, `archived` |

### `VisibilityBadge`

역할:

- 공개 범위를 표시한다.

값:

```text
private
club
public
archived
```

### `TagList`

역할:

- 검색과 필터에 쓰이는 태그를 보여준다.
- 카드, 상세, 작성 화면에서 모두 재사용한다.

### `BuilderMeta`

역할:

- 작성자, 프로젝트, 작성일, 업데이트 시간을 한 줄로 표시한다.

필요 데이터:

```text
builder
project
createdAt
updatedAt
```

## 7. 작성 폼 컴포넌트

### `BuildLogForm`

사용 화면:

- `/logs/new`

입력 항목:

- 프로젝트
- 오늘 작업한 것
- 막힌 부분
- 시도한 방법
- 해결한 방법
- 사용한 AI 프롬프트
- 오늘 배운 점
- 다음 작업
- 공개 범위
- 태그

### `QuestionForm`

사용 화면:

- `/questions/new`

입력 항목:

- 막힌 상황
- 에러/증상
- 이미 시도한 방법
- 관련 코드 또는 프롬프트
- 원하는 도움
- 긴급도
- 태그
- 출처 빌드로그

### `FeedbackRequestForm`

사용 화면:

- `/feedback/new`

입력 항목:

- 피드백 받고 싶은 화면
- 현재 상태
- 확인받고 싶은 관점
- 사용자가 해야 할 행동
- 마감일
- 첨부 링크 또는 이미지

### `KnowledgePostForm`

사용 화면:

- `/knowledge/new`

입력 항목:

- 배운 배경
- 핵심 내용
- 적용한 방법
- 사용한 AI 프롬프트
- 참고 링크
- 재사용 팁
- 태그
- 출처 질문 또는 빌드로그

## 8. 상세 화면 컴포넌트

### `DetailHeader`

역할:

- 제목, 상태, 작성자, 프로젝트, 공개 범위, 주요 액션을 표시한다.

### `DetailSection`

역할:

- 상세 본문의 반복 섹션을 표현한다.

예시:

```text
막힌 상황
시도한 방법
해결한 방법
AI 프롬프트
재사용 팁
다음 작업
```

### `ConversionActions`

사용 화면:

- 빌드로그 상세
- 질문 상세
- 피드백 상세

역할:

- 현재 콘텐츠를 다른 콘텐츠로 전환한다.

예시:

```text
질문으로 전환
지식으로 전환
피드백 요청으로 전환
빌드로그로 남기기
```

### `CommentThread`

사용 화면:

- 질문 상세
- 피드백 상세
- 지식 상세
- 빌드로그 상세

역할:

- 댓글, 답변, 피드백을 같은 구조로 보여준다.

필요 데이터:

```text
comments: {
  author
  body
  createdAt
  type
  isAccepted
}
```

## 9. 필터와 검색 컴포넌트

### `SearchBar`

사용 화면:

- 목록 화면 전체
- 대시보드

역할:

- 제목, 본문, 태그, 빌더 이름을 검색한다.

### `FilterTabs`

역할:

- 상태 또는 카테고리 기준으로 목록을 나눈다.

예시:

| 화면 | 탭 |
|---|---|
| 질문 | 전체, 열린 질문, 답변 대기, 해결됨 |
| 피드백 | 전체, 대기, 진행 중, 반영 완료 |
| 지식 | 전체, Claude Code, 기획, 디자인, 개발 |
| 프로젝트 | 전체, 제작 중, 피드백 중, 완료 |

### `SortMenu`

역할:

- 최신순, 답변 많은 순, 마감 임박순, 저장 많은 순 등 정렬을 제공한다.

## 10. 컴포넌트와 데이터 모델 연결

| 컴포넌트 | 주요 테이블 |
|---|---|
| `ActivityCard` | `activity_feed` |
| `BuilderRoomCard` | `builders`, `projects`, `build_logs` |
| `ContentCard` | `build_logs`, `questions`, `feedback_requests`, `knowledge_posts`, `projects` |
| `BuildLogForm` | `build_logs`, `tags`, `attachments` |
| `QuestionForm` | `questions`, `build_logs`, `tags`, `attachments` |
| `FeedbackRequestForm` | `feedback_requests`, `projects`, `attachments` |
| `KnowledgePostForm` | `knowledge_posts`, `questions`, `build_logs`, `tags` |
| `CommentThread` | `comments`, `builders` |
| `StatusBadge` | 각 콘텐츠의 `status` |
| `VisibilityBadge` | 각 콘텐츠의 `visibility` |
| `TagList` | `tags`, `taggings` |

## 11. MVP 컴포넌트 구현 우선순위

실제 앱 구현 시 우선순위는 다음과 같다.

1. `AppShell`
2. `SidebarNav`
3. `PageHeader`
4. `ContentCard`
5. `StatusBadge`
6. `TagList`
7. `BuilderRoomCard`
8. `BuildLogForm`
9. `QuestionForm`
10. `FeedbackRequestForm`
11. `KnowledgePostForm`
12. `DetailHeader`
13. `DetailSection`
14. `CommentThread`
15. `ConversionActions`
16. `SearchBar`
17. `FilterTabs`
18. `SortMenu`

## 12. 실제 개발 폴더 예시

React 또는 Next.js 기준으로는 아래처럼 나눌 수 있다.

```text
src/
├── app/
│   ├── dashboard/
│   ├── builders/[handle]/
│   ├── logs/
│   ├── questions/
│   ├── feedback/
│   └── knowledge/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── cards/
│   ├── forms/
│   ├── detail/
│   ├── comments/
│   └── filters/
├── features/
│   ├── builders/
│   ├── projects/
│   ├── logs/
│   ├── questions/
│   ├── feedback/
│   └── knowledge/
└── lib/
    ├── db/
    ├── auth/
    └── utils/
```

## 13. 다음 작업

이 문서 다음에는 실제 구현 계획 문서를 만드는 것이 좋다.

```text
docs/builderclub-implementation-plan.md
```

해당 문서에서는 아래 내용을 정리한다.

- 어떤 기술 스택으로 만들지
- 어떤 순서로 개발할지
- MVP에서 어디까지 만들지
- 어떤 테스트를 먼저 둘지
- 정적 HTML에서 실제 앱으로 옮길 때 무엇을 재사용할지
