# 빌더클럽 앱 라우트와 화면 흐름 설계

작성일: 2026-04-30

## 1. 목적

이 문서는 현재 만들어진 정적 HTML 프로토타입을 실제 앱 라우트 구조로 옮기기 위한 기준을 정리한다.

현재 프로토타입은 화면의 형태를 확인하기 위한 HTML 파일 단위로 구성되어 있다. 실제 빌더클럽 앱을 만들 때는 이 화면들을 URL, 데이터, 권한, 사용자 행동 기준으로 다시 묶어야 한다.

## 2. 라우트 설계 원칙

- 첫 화면은 랜딩이 아니라 공용 대시보드가 중심이다.
- 빌더룸은 각 빌더의 개인 작업 공간이자 기록의 원본이다.
- 목록 화면은 공용 탐색 공간이고, 상세 화면은 대화와 전환이 일어나는 공간이다.
- 작성 화면은 빌더룸에서 시작하되, 공용 목록과 상세로 이어질 수 있어야 한다.
- 같은 콘텐츠는 작성, 목록, 상세, 대시보드에서 서로 다른 밀도로 보인다.
- 실제 앱에서는 `id` 또는 `handle` 기반 동적 라우트를 사용한다.

## 3. 현재 HTML과 실제 앱 라우트 매핑

| 현재 HTML | 실제 앱 라우트 | 역할 |
|---|---|---|
| `index.html` | `/` | 기존 랜딩. 당장은 보존하되 앱 진입 후에는 대시보드로 연결 |
| `login` | `/login` | 멤버 로그인 화면. 비회원 접근 시 보호된 화면으로 이동 |
| `dashboard.html` | `/dashboard` | 전체 커뮤니티 활동 대시보드 |
| `builder-room.html` | `/builders/[handle]` | 빌더별 개인 작업 공간 |
| `write-log.html` | `/logs/new` | 빌드로그 작성 |
| `write-question.html` | `/questions/new` | 질문 작성 |
| `write-feedback.html` | `/feedback/new` | 피드백 요청 작성 |
| `write-knowledge.html` | `/knowledge/new` | 지식 공유 작성 |
| `knowledge-list.html` | `/knowledge` | 지식 공유 목록 |
| `questions-list.html` | `/questions` | 질문과 해결 노하우 목록 |
| `logs-list.html` | `/logs` | 빌드로그 목록 |
| `feedback-list.html` | `/feedback` | 피드백 요청 목록 |
| `projects-list.html` | `/projects` | 프로젝트 목록 |
| `knowledge-detail.html` | `/knowledge/[id]` | 지식 공유 상세 |
| `question-detail.html` | `/questions/[id]` | 질문 상세 |
| `log-detail.html` | `/logs/[id]` | 빌드로그 상세 |
| `feedback-detail.html` | `/feedback/[id]` | 피드백 요청 상세 |

## 4. 앱 전체 구조

```text
/
├── /login
├── /dashboard
├── /builders/[handle]
├── /projects
├── /logs
│   ├── /logs/new
│   └── /logs/[id]
├── /questions
│   ├── /questions/new
│   └── /questions/[id]
├── /feedback
│   ├── /feedback/new
│   └── /feedback/[id]
└── /knowledge
    ├── /knowledge/new
    └── /knowledge/[id]
```

## 4.1 로그인 보호와 게이트

- `/login`은 비회원이 보호된 화면에 접근할 때 이동하는 로그인 화면입니다.
- 현재 `middleware.ts`가 `/dashboard`, `/builders`, `/projects`, `/logs`, `/questions`, `/feedback`, `/knowledge` 경로를 보호하고 있으며, 세션이 없으면 `/login?next=<원래경로>`로 리디렉트합니다.
- `/login`에서 세션이 있으면 `/dashboard`로 자동 리디렉트됩니다.

## 5. 핵심 사용자 흐름

### 5.1 빌더가 작업을 기록하는 흐름

```text
/dashboard
→ /builders/[handle]
→ /logs/new
→ /logs/[id]
→ /logs
→ /dashboard
```

의미:

- 빌더는 자기 빌더룸에서 작업 기록을 시작한다.
- 저장된 빌드로그는 상세 화면에서 확인된다.
- 공개 범위가 `club` 또는 `public`이면 전체 로그 목록과 대시보드에도 노출된다.

연결 데이터:

- `builders`
- `projects`
- `build_logs`
- `tags`
- `activity_feed`

### 5.2 막힌 부분을 질문으로 전환하는 흐름

```text
/builders/[handle]
→ /logs/[id]
→ /questions/new?source=log
→ /questions/[id]
→ /questions
```

의미:

- 빌드로그의 막힌 부분을 질문으로 전환한다.
- 질문 상세에서 답변을 받고, 해결되면 노하우로 남길 수 있다.

연결 데이터:

- `build_logs`
- `questions`
- `comments`
- `knowledge_posts`
- `activity_feed`

### 5.3 만든 화면을 피드백 요청으로 전환하는 흐름

```text
/builders/[handle]
→ /feedback/new
→ /feedback/[id]
→ /feedback
```

의미:

- 빌더가 구현 중인 화면이나 기능에 대해 피드백을 요청한다.
- 피드백 댓글은 상세 화면에 쌓이고, 반영 상태를 관리한다.

연결 데이터:

- `feedback_requests`
- `comments`
- `projects`
- `attachments`
- `activity_feed`

### 5.4 해결한 내용을 지식으로 공유하는 흐름

```text
/questions/[id]
→ /knowledge/new?source=question
→ /knowledge/[id]
→ /knowledge
```

또는:

```text
/logs/[id]
→ /knowledge/new?source=log
→ /knowledge/[id]
→ /knowledge
```

의미:

- 질문에서 해결된 답변이나 빌드로그에서 배운 내용을 지식 공유로 정리한다.
- 지식 글은 공용 지식 저장소에 쌓인다.

연결 데이터:

- `knowledge_posts`
- `questions`
- `build_logs`
- `tags`
- `comments`
- `activity_feed`

## 6. 화면별 데이터 연결

### `/dashboard`

보여줄 데이터:

- 최근 활동 피드: `activity_feed`
- 최신 빌드로그: `build_logs`
- 열린 질문: `questions`
- 피드백 요청: `feedback_requests`
- 지식 공유: `knowledge_posts`
- 프로젝트 진행 현황: `projects`
- 빌더별 개인공간: `builders`

주요 행동:

- 내 빌더룸으로 이동
- 새 빌드로그 작성
- 질문 작성
- 피드백 요청
- 지식 공유 보기

### `/builders/[handle]`

보여줄 데이터:

- 빌더 프로필: `builders`
- 대표 프로젝트: `projects`
- 최근 빌드로그: `build_logs`
- 받은 피드백: `feedback_requests`, `comments`
- 작성한 질문: `questions`
- 작성한 지식: `knowledge_posts`

주요 행동:

- 빌드로그 작성
- 질문 작성
- 피드백 요청
- 지식 공유 작성
- 프로젝트 상태 업데이트

### `/logs`와 `/logs/[id]`

보여줄 데이터:

- 빌더별 제작 기록: `build_logs`
- 관련 프로젝트: `projects`
- 작성 빌더: `builders`
- 태그: `tags`, `taggings`

상세 화면 주요 행동:

- 질문으로 전환
- 지식으로 전환
- 피드백 요청으로 전환
- 댓글 작성

### `/questions`와 `/questions/[id]`

보여줄 데이터:

- 열린 질문, 답변 대기, 해결된 질문: `questions`
- 답변과 댓글: `comments`
- 관련 빌드로그: `build_logs`
- 관련 지식 글: `knowledge_posts`

상세 화면 주요 행동:

- 답변 작성
- 답변 채택
- 해결 노하우로 전환
- 관련 지식 연결

### `/feedback`와 `/feedback/[id]`

보여줄 데이터:

- 피드백 요청 목록: `feedback_requests`
- 요청자와 프로젝트: `builders`, `projects`
- 피드백 댓글: `comments`
- 첨부 이미지나 링크: `attachments`

상세 화면 주요 행동:

- 피드백 댓글 작성
- 반영 상태 변경
- 회고 또는 빌드로그로 연결

### `/knowledge`와 `/knowledge/[id]`

보여줄 데이터:

- 지식 공유 글: `knowledge_posts`
- 작성 빌더: `builders`
- 출처 질문/로그: `questions`, `build_logs`
- 태그: `tags`, `taggings`
- 댓글: `comments`

상세 화면 주요 행동:

- 댓글 작성
- 저장 또는 북마크
- 출처 질문/로그 보기
- 관련 지식 보기

## 7. 내비게이션 구조

앱의 기본 내비게이션은 아래 항목을 가진다.

```text
대시보드
빌더룸
프로젝트
빌드로그
질문
피드백
지식 공유
```

권장 배치:

- 데스크톱: 좌측 사이드바 + 상단 검색/작성 버튼
- 모바일: 하단 탭 + 상단 작성 버튼
- 작성 버튼은 현재 위치에 따라 기본 작성 유형을 바꿀 수 있다.

예시:

| 현재 위치 | 기본 작성 버튼 |
|---|---|
| `/builders/[handle]` | 빌드로그 작성 |
| `/questions` | 질문 작성 |
| `/feedback` | 피드백 요청 |
| `/knowledge` | 지식 공유 |
| `/logs` | 빌드로그 작성 |

## 8. 인증 이후 라우트 변화

초기 MVP에서는 정적 예시 빌더를 사용해도 된다. 실제 로그인 기능이 붙으면 아래 구조를 추가한다.

```text
/login
/signup
/onboarding
/me
/me/settings
```

로그인 후 기본 진입:

```text
/login
→ /dashboard
→ /builders/[my-handle]
```

`/me`는 현재 로그인한 빌더의 개인공간으로 리다이렉트해도 된다.

```text
/me → /builders/[my-handle]
```

## 9. MVP 구현 순서

실제 앱으로 전환할 때 권장 순서는 다음과 같다.

1. `/dashboard`와 공통 레이아웃 만들기
2. `/builders/[handle]` 빌더룸 만들기
3. `/logs/new`, `/logs`, `/logs/[id]` 저장 흐름 만들기
4. `/questions/new`, `/questions`, `/questions/[id]` 질문 흐름 만들기
5. `/feedback/new`, `/feedback`, `/feedback/[id]` 피드백 흐름 만들기
6. `/knowledge/new`, `/knowledge`, `/knowledge/[id]` 지식 공유 흐름 만들기
7. `activity_feed`로 대시보드 통합
8. 검색, 태그, 공개 범위, 권한을 보강

## 10. 다음 문서화 작업

이 문서 다음에는 아래 문서를 만드는 것이 좋다.

```text
docs/builderclub-component-map.md
docs/builderclub-implementation-plan.md
```

`builderclub-component-map.md`는 반복되는 UI 구성요소를 정리한다.

`builderclub-implementation-plan.md`는 실제 개발 순서, 테스트 기준, MVP 범위를 정리한다.
