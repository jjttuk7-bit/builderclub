export const buildLogForm = {
  title: "오늘의 빌드로그",
  description: "개인 작업 기록을 남기고 필요한 경우 질문, 피드백, 지식 공유로 전환합니다.",
  submitLabel: "빌드로그 저장",
  fields: [
    { label: "프로젝트", type: "select", options: ["노코드 CRM 리빌드", "랜딩 분석 대시보드"] },
    { label: "오늘 작업한 것", placeholder: "오늘 만든 기능, 화면, 결정 내용을 적어주세요." },
    { label: "막힌 부분", placeholder: "막힌 지점이나 아직 판단이 필요한 부분을 적어주세요." },
    { label: "사용한 AI 프롬프트", placeholder: "Claude Code나 다른 AI에게 요청한 내용을 남겨주세요." },
  ],
} as const;

export const questionForm = {
  title: "막힌 부분 질문",
  description: "문제 상황과 이미 시도한 방법을 정리해 다른 빌더가 답변하기 쉽게 만듭니다.",
  submitLabel: "질문 등록",
  fields: [
    { label: "막힌 상황", placeholder: "어떤 상황에서 막혔나요?" },
    { label: "에러/증상", placeholder: "화면, 로그, 예상과 다른 동작을 적어주세요." },
    { label: "이미 시도한 방법", placeholder: "검색, 수정, 프롬프트 등 시도한 것을 적어주세요." },
    { label: "원하는 도움", placeholder: "코드 리뷰, 방향성, 디버깅 등 필요한 도움을 적어주세요." },
  ],
} as const;

export const feedbackForm = {
  title: "피드백 요청",
  description: "만든 화면이나 흐름을 어떤 관점에서 봐야 하는지 명확히 요청합니다.",
  submitLabel: "피드백 요청 저장",
  fields: [
    { label: "피드백 받고 싶은 화면", type: "input", placeholder: "예: 빌더룸 첫 화면" },
    { label: "확인받고 싶은 관점", placeholder: "사용성, 정보 우선순위, 문구, 흐름 등" },
    { label: "사용자가 해야 할 행동", placeholder: "이 화면에서 사용자가 무엇을 해야 하나요?" },
    { label: "마감일", type: "date" },
  ],
} as const;

export const knowledgeForm = {
  title: "지식 공유",
  description: "해결한 문제와 재사용할 수 있는 패턴을 클럽 지식으로 정리합니다.",
  submitLabel: "지식 공유 저장",
  fields: [
    { label: "배운 배경", placeholder: "어떤 문제를 해결하다가 배운 내용인가요?" },
    { label: "핵심 내용", placeholder: "다른 빌더가 바로 가져갈 수 있는 핵심을 적어주세요." },
    { label: "적용한 방법", placeholder: "실제 적용한 순서나 코드/프롬프트 맥락을 적어주세요." },
    { label: "재사용 팁", placeholder: "다음에 비슷한 상황에서 어떻게 쓰면 좋을까요?" },
  ],
} as const;

export const projectForm = {
  title: "새 프로젝트 시작",
  description: "만들고 싶은 프로젝트의 목표와 핵심 기능을 정의합니다.",
  submitLabel: "프로젝트 생성",
  fields: [
    { label: "프로젝트 이름", type: "input", placeholder: "예: 노코드 CRM 리빌드" },
    { label: "한 줄 요약", type: "input", placeholder: "이 프로젝트가 해결하려는 핵심 가치를 적어주세요." },
    { label: "문제 정의", placeholder: "어떤 불편함을 해결하고 싶나요?" },
    { label: "핵심 기능", placeholder: "MVP로 구현할 3가지 정도의 기능을 적어주세요." },
  ],
} as const;
