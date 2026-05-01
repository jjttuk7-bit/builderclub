# 빌더클럽 데이터 모델 설계

작성일: 2026-04-30

## 1. 목적

이 문서는 정적 HTML 프로토타입을 실제 앱으로 전환하기 위한 데이터 구조 기준을 정리한다.

현재 프로토타입은 다음 흐름을 가진다.

```text
대시보드
→ 빌더룸
→ 빌드로그 작성
→ 질문 작성
→ 피드백 요청
→ 지식 공유
→ 목록/상세 화면
```

데이터 모델은 이 흐름을 저장 가능한 구조로 바꾸기 위해 필요하다.

## 2. 설계 원칙

- 빌더룸은 개인 기록의 원본 공간이다.
- 공용 대시보드는 여러 테이블의 활동을 합쳐 보여주는 허브다.
- 빌드로그, 질문, 피드백, 지식 공유는 서로 전환될 수 있다.
- 모든 주요 콘텐츠는 공개 범위를 가진다.
- 댓글은 질문 답변, 피드백 댓글, 지식 댓글에 공통으로 사용한다.
- 검색과 필터를 위해 태그와 활동 피드 구조를 별도로 둔다.

## 3. 핵심 테이블 목록

```text
builders
projects
build_logs
knowledge_posts
questions
feedback_requests
comments
tags
taggings
attachments
activity_feed
```

선택적으로 이후 단계에서 추가할 수 있는 테이블:

```text
profiles
bookmarks
notifications
project_members
```

## 4. 공통 필드 규칙

대부분의 테이블은 아래 공통 필드를 가진다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 고유 ID |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |
| deleted_at | timestamp nullable | 소프트 삭제 시간 |
| visibility | enum | 공개 범위 |
| status | enum | 상태값 |

공개 범위 `visibility` 값:

| 값 | 의미 |
|---|---|
| private | 작성자만 볼 수 있음 |
| club | 빌더클럽 멤버에게 공유 |
| public | 외부 공개 가능 |
| archived | 보관 상태 |

## 5. builders

빌더 프로필과 개인공간의 소유자를 나타낸다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 빌더 ID |
| user_id | uuid nullable | 로그인 사용자 ID. Auth 연동 전에는 nullable |
| display_name | text | 예: 빌더 A |
| handle | text | URL 또는 내부 식별자 |
| bio | text nullable | 소개 |
| interests | text[] | 관심 분야 |
| tools | text[] | 사용하는 도구 |
| avatar_url | text nullable | 프로필 이미지 |
| current_project_id | uuid nullable | 대표 프로젝트 |
| room_status | enum | active, paused, archived |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

관계:

- `builders` 1:N `projects`
- `builders` 1:N `build_logs`
- `builders` 1:N `knowledge_posts`
- `builders` 1:N `questions`
- `builders` 1:N `feedback_requests`
- `builders` 1:N `comments`

## 6. projects

빌더가 진행 중인 프로젝트를 저장한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 프로젝트 ID |
| owner_builder_id | uuid | 소유 빌더 |
| title | text | 프로젝트명 |
| summary | text | 짧은 설명 |
| problem | text nullable | 해결하려는 문제 |
| target_user | text nullable | 대상 사용자 |
| goal | text nullable | 프로젝트 목표 |
| core_features | text[] | 핵심 기능 |
| status | enum | planning, building, feedback, completed, paused |
| progress | integer | 0-100 진행률 |
| demo_url | text nullable | 시연 URL |
| repository_url | text nullable | 저장소 URL |
| visibility | enum | 공개 범위 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

화면 매핑:

- `projects-list.html`
- `builder-room.html`
- `dashboard.html`의 프로젝트 진행 현황

## 7. build_logs

빌더룸에서 작성하는 제작 과정 기록이다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 빌드로그 ID |
| builder_id | uuid | 작성 빌더 |
| project_id | uuid | 관련 프로젝트 |
| title | text | 빌드로그 제목 |
| log_date | date | 기록 날짜 |
| status | enum | draft, shared, converted, archived |
| project_status_snapshot | text nullable | 작성 당시 프로젝트 상태 |
| progress_snapshot | integer nullable | 작성 당시 진행률 |
| today_work | text | 오늘 작업한 것 |
| blocked_issue | text nullable | 막힌 부분 |
| attempted_method | text nullable | 시도한 방법 |
| solved_method | text nullable | 해결한 방법 |
| ai_prompt | text nullable | 사용한 AI 프롬프트 |
| learned | text nullable | 오늘 배운 점 |
| next_action | text nullable | 다음 작업 |
| visibility | enum | 공개 범위 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

전환 관계:

- `build_logs` → `questions`
- `build_logs` → `knowledge_posts`
- `build_logs` → `feedback_requests`

이를 위해 아래 필드를 선택적으로 둘 수 있다.

| 필드 | 타입 | 설명 |
|---|---|---|
| converted_question_id | uuid nullable | 전환된 질문 |
| converted_knowledge_id | uuid nullable | 전환된 지식 글 |
| converted_feedback_id | uuid nullable | 전환된 피드백 요청 |

화면 매핑:

- `write-log.html`
- `logs-list.html`
- `log-detail.html`
- `builder-room.html`

## 8. knowledge_posts

해결한 문제, 프롬프트, 노하우를 공용 지식으로 정리한 글이다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 지식 글 ID |
| author_builder_id | uuid | 작성 빌더 |
| project_id | uuid nullable | 관련 프로젝트 |
| source_build_log_id | uuid nullable | 출처 빌드로그 |
| source_question_id | uuid nullable | 출처 질문 |
| title | text | 제목 |
| category | enum | claude_code, planning, design, development, deployment, etc |
| background | text | 배운 배경 / 문제 상황 |
| core_content | text | 핵심 내용 |
| applied_method | text nullable | 적용한 방법 |
| ai_prompt | text nullable | 사용한 AI 프롬프트 |
| reference_links | text[] | 참고 링크 |
| reuse_tip | text nullable | 재사용 팁 |
| status | enum | draft, published, pinned, archived |
| visibility | enum | 공개 범위 |
| view_count | integer | 조회수 |
| save_count | integer | 저장 수 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

화면 매핑:

- `write-knowledge.html`
- `knowledge-list.html`
- `knowledge-detail.html`
- `dashboard.html`의 지식 공유 피드

## 9. questions

막힌 부분을 공용 질문으로 전환한 글이다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 질문 ID |
| author_builder_id | uuid | 작성 빌더 |
| project_id | uuid nullable | 관련 프로젝트 |
| source_build_log_id | uuid nullable | 출처 빌드로그 |
| title | text | 질문 제목 |
| situation | text | 막힌 상황 |
| symptom | text nullable | 에러 메시지 / 증상 |
| attempted | text nullable | 이미 시도한 방법 |
| related_code_or_prompt | text nullable | 관련 코드나 프롬프트 |
| desired_help | text | 원하는 도움 |
| urgency | enum | today, this_week, low |
| status | enum | open, waiting, answered, solved, archived |
| accepted_comment_id | uuid nullable | 채택된 답변 |
| converted_knowledge_id | uuid nullable | 해결 후 전환된 지식 글 |
| visibility | enum | 공개 범위 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

화면 매핑:

- `write-question.html`
- `questions-list.html`
- `question-detail.html`
- `dashboard.html`의 도움이 필요한 질문

## 10. feedback_requests

사용자 관점 피드백을 요청하는 글이다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 피드백 요청 ID |
| author_builder_id | uuid | 작성 빌더 |
| project_id | uuid | 관련 프로젝트 |
| source_build_log_id | uuid nullable | 출처 빌드로그 |
| title | text | 요청 제목 |
| screen_link | text nullable | 보고 싶은 화면 / 링크 |
| current_status | text | 현재 상태 |
| review_focus | text | 확인받고 싶은 관점 |
| user_action | text nullable | 사용자가 해야 할 행동 |
| specific_points | text nullable | 특별히 봐줬으면 하는 부분 |
| due_date | date nullable | 마감일 |
| status | enum | open, in_review, applied, closed, archived |
| applied_summary | text nullable | 반영 상태 요약 |
| reflection | text nullable | 회고 연결 내용 |
| visibility | enum | 공개 범위 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

화면 매핑:

- `write-feedback.html`
- `feedback-list.html`
- `feedback-detail.html`
- `dashboard.html`의 최근 피드백 요청

## 11. comments

질문 답변, 피드백 댓글, 지식 댓글에 공통으로 사용한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 댓글 ID |
| author_builder_id | uuid | 작성 빌더 |
| target_type | enum | knowledge_post, question, feedback_request, build_log |
| target_id | uuid | 대상 콘텐츠 ID |
| parent_id | uuid nullable | 대댓글 부모 |
| content | text | 댓글 내용 |
| comment_type | enum | comment, answer, feedback, reflection |
| is_accepted | boolean | 질문의 채택 답변 여부 |
| is_applied | boolean | 피드백 반영 여부 |
| created_at | timestamp | 생성일 |
| updated_at | timestamp | 수정일 |

사용 예:

- 질문 상세의 답변
- 피드백 상세의 피드백 댓글
- 지식 상세의 댓글

## 12. tags 와 taggings

태그는 검색과 필터를 위한 별도 구조로 둔다.

### tags

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 태그 ID |
| name | text | 태그명 |
| slug | text | URL/검색용 식별자 |
| category | text nullable | 태그 그룹 |
| created_at | timestamp | 생성일 |

### taggings

콘텐츠와 태그의 다대다 관계를 저장한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 태깅 ID |
| tag_id | uuid | 태그 ID |
| target_type | enum | project, build_log, knowledge_post, question, feedback_request |
| target_id | uuid | 대상 ID |
| created_at | timestamp | 생성일 |

## 13. attachments

화면 캡처, 참고 링크, 파일 등을 저장한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 첨부 ID |
| owner_builder_id | uuid | 업로드한 빌더 |
| target_type | enum | project, build_log, knowledge_post, question, feedback_request, comment |
| target_id | uuid | 대상 콘텐츠 ID |
| attachment_type | enum | image, file, url |
| title | text nullable | 첨부 이름 |
| url | text | 파일 또는 링크 URL |
| alt_text | text nullable | 이미지 설명 |
| created_at | timestamp | 생성일 |

## 14. activity_feed

대시보드의 전체 커뮤니티 활동 피드를 위한 테이블이다.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | uuid | 활동 ID |
| actor_builder_id | uuid | 활동 주체 |
| verb | enum | created, updated, commented, answered, requested_feedback, converted, completed |
| target_type | enum | project, build_log, knowledge_post, question, feedback_request, comment |
| target_id | uuid | 대상 ID |
| project_id | uuid nullable | 관련 프로젝트 |
| summary | text | 대시보드에 보여줄 요약 |
| visibility | enum | 공개 범위 |
| created_at | timestamp | 생성일 |

활동 생성 예:

| 이벤트 | activity_feed |
|---|---|
| 빌드로그 작성 | actor=빌더, verb=created, target_type=build_log |
| 질문 작성 | actor=빌더, verb=created, target_type=question |
| 질문 답변 | actor=빌더, verb=answered, target_type=question |
| 피드백 요청 | actor=빌더, verb=requested_feedback, target_type=feedback_request |
| 지식 공유 | actor=빌더, verb=created, target_type=knowledge_post |
| 빌드로그가 지식으로 전환 | actor=빌더, verb=converted, target_type=knowledge_post |

## 15. 화면과 테이블 매핑

| 화면 | 주요 테이블 |
|---|---|
| `dashboard.html` | activity_feed, projects, questions, feedback_requests, knowledge_posts, build_logs |
| `builder-room.html` | builders, projects, build_logs, feedback_requests, questions |
| `write-log.html` | build_logs |
| `write-question.html` | questions, tags, attachments |
| `write-feedback.html` | feedback_requests, attachments |
| `write-knowledge.html` | knowledge_posts, tags, attachments |
| `knowledge-list.html` | knowledge_posts, tags, comments |
| `questions-list.html` | questions, comments, tags |
| `logs-list.html` | build_logs, projects, builders |
| `feedback-list.html` | feedback_requests, projects, comments |
| `projects-list.html` | projects, builders, build_logs, feedback_requests |
| `knowledge-detail.html` | knowledge_posts, comments, tags, build_logs |
| `question-detail.html` | questions, comments, projects, knowledge_posts |
| `log-detail.html` | build_logs, projects, questions, feedback_requests, knowledge_posts |
| `feedback-detail.html` | feedback_requests, comments, projects, build_logs |

## 16. 주요 관계 구조

```text
builders
├── projects
│   ├── build_logs
│   ├── questions
│   ├── feedback_requests
│   └── knowledge_posts
│
├── comments
└── activity_feed
```

전환 관계:

```text
build_logs
├── questions
├── feedback_requests
└── knowledge_posts

questions
└── knowledge_posts

feedback_requests
└── build_logs 또는 knowledge_posts
```

## 17. MVP 저장 우선순위

실제 구현은 아래 순서로 진행하는 것이 좋다.

```text
1. builders
2. projects
3. build_logs
4. questions
5. comments
6. feedback_requests
7. knowledge_posts
8. tags / taggings
9. activity_feed
10. attachments
```

이유:

- 빌더와 프로젝트가 있어야 개인공간이 성립한다.
- 빌드로그가 있어야 질문, 피드백, 지식 공유로 전환할 원본 기록이 생긴다.
- 댓글은 질문과 피드백의 핵심 상호작용이다.
- 활동 피드는 각 테이블의 저장 이벤트가 안정화된 뒤 생성하는 것이 좋다.

## 18. Supabase 기준 구현 메모

Supabase를 사용한다면 다음 구조가 적합하다.

- Auth 사용자는 `auth.users`에 저장한다.
- `builders.user_id`가 `auth.users.id`를 참조한다.
- Row Level Security는 `visibility`와 `builder_id` 기준으로 나눈다.
- `activity_feed`는 DB trigger 또는 서버 액션에서 생성한다.
- 검색은 초기에는 SQL `ilike`와 태그 필터로 구현하고, 이후 full-text search로 확장한다.

초기 RLS 기준:

| 공개 범위 | 읽기 |
|---|---|
| private | 작성자만 |
| club | 로그인한 빌더 전체 |
| public | 누구나 |
| archived | 작성자 또는 관리자 |

## 19. 다음 문서 작업

이 문서 다음에는 앱 라우트와 구현 계획을 정리한다.

추천 순서:

```text
1. docs/builderclub-app-routes.md
2. docs/builderclub-component-map.md
3. docs/builderclub-implementation-plan.md
```

`builderclub-app-routes.md`에서는 정적 HTML 파일을 실제 앱 라우트로 매핑한다.

`builderclub-component-map.md`에서는 반복되는 UI를 공통 컴포넌트로 분리한다.

`builderclub-implementation-plan.md`에서는 실제 Next.js/Supabase 구현 순서를 정리한다.

## 20. 구현 산출물

데이터 모델 설계를 바로 사용할 수 있도록 SQL 스키마를 함께 추가했습니다.

- `docs/builderclub-data-model.sql`
