export const sampleActivities = [
  {
    title: "빌더 A가 빌드로그를 공유했습니다",
    summary: "로그인 화면의 사용자 흐름을 정리하고 다음 작업을 남겼습니다.",
    href: "/logs/log-1",
    status: "shared",
    author: "빌더 A",
    tags: ["빌드로그", "UI"],
  },
  {
    title: "빌더 B가 질문을 등록했습니다",
    summary: "Supabase 권한 정책에서 막힌 부분을 질문으로 남겼습니다.",
    href: "/questions/question-1",
    status: "open",
    author: "빌더 B",
    tags: ["질문", "Supabase"],
  },
];

export const sampleProjects = [
  {
    title: "노코드 CRM 리빌드",
    summary: "고객 메모, 후속 연락, 상태 변경을 한 화면에서 처리하는 빌더 A의 핵심 프로젝트입니다.",
    href: "/builders/builder-a",
    status: "building",
    author: "빌더 A",
    tags: ["CRM", "빌더룸"],
  },
  {
    title: "랜딩 분석 대시보드",
    summary: "랜딩 페이지 방문자의 행동 흐름과 전환 지점을 빠르게 확인하는 분석 화면입니다.",
    href: "/logs/log-2",
    status: "feedback",
    author: "빌더 C",
    tags: ["Analytics", "Dashboard"],
  },
];

export const sampleLogs = [
  {
    title: "로그인 화면 플로우 정리",
    summary: "첫 진입, 인증 실패, 재시도, 대시보드 이동까지 사용자 흐름을 빌드로그로 남겼습니다.",
    href: "/logs/log-1",
    status: "shared",
    author: "빌더 A",
    tags: ["Auth", "UI"],
  },
  {
    title: "온보딩 체크리스트 연결",
    summary: "신규 빌더가 프로젝트 목표, 도구, 오늘 작업을 빠르게 채우도록 체크리스트를 붙였습니다.",
    href: "/logs/log-2",
    status: "converted",
    author: "빌더 A",
    tags: ["Onboarding", "Builder Room"],
  },
];

export const sampleQuestions = [
  {
    title: "Supabase RLS 정책이 예상보다 넓게 열립니다",
    summary: "빌더룸 비공개 기록이 클럽 공개 목록에 섞일 수 있는지 권한 조건을 검토하고 있습니다.",
    href: "/questions/question-1",
    status: "open",
    author: "빌더 B",
    tags: ["Supabase", "RLS"],
  },
  {
    title: "Next 라우트에서 상세 페이지 params 타입이 헷갈립니다",
    summary: "동적 상세 페이지에서 params를 다룰 때 서버 컴포넌트 기준 타입을 어떻게 잡을지 질문합니다.",
    href: "/questions/question-2",
    status: "answered",
    author: "빌더 C",
    tags: ["Next.js", "TypeScript"],
  },
];

export const sampleFeedbackRequests = [
  {
    title: "빌더룸 첫 화면 피드백 요청",
    summary: "개인 작업 공간에서 오늘 작업과 다음 액션이 충분히 먼저 보이는지 확인받고 싶습니다.",
    href: "/feedback/feedback-1",
    status: "in_review",
    author: "빌더 A",
    tags: ["Builder Room", "UX"],
  },
  {
    title: "질문 상세 답변 흐름 검토",
    summary: "답변 채택, 해결 노하우 전환, 관련 지식 연결 흐름이 자연스러운지 검토합니다.",
    href: "/feedback/feedback-2",
    status: "requested",
    author: "빌더 C",
    tags: ["Questions", "Flow"],
  },
];

export const sampleKnowledgePosts = [
  {
    title: "Claude Code에게 화면 구조를 맡길 때 좋은 요청 방식",
    summary: "랜딩 설명 대신 대시보드 구조를 먼저 요청하면 실제 앱 설계가 빨라지는 패턴을 정리했습니다.",
    href: "/knowledge/knowledge-1",
    status: "published",
    author: "빌더 C",
    tags: ["Claude Code", "Prompt"],
  },
  {
    title: "빌드로그를 질문으로 전환하는 기준",
    summary: "막힌 부분이 반복되거나 다른 빌더에게도 도움이 될 때 질문으로 전환하는 기준입니다.",
    href: "/knowledge/knowledge-2",
    status: "pinned",
    author: "빌더 B",
    tags: ["Build Log", "Question"],
  },
];

export const sampleBuilderWorkspace = {
  name: "빌더 A의 노코드 CRM",
  focus: "오늘의 작업 초점",
  summary: "로그인 이후 첫 화면에서 고객 상태, 다음 연락, 최근 피드백을 한 번에 볼 수 있게 정리합니다.",
  nextActions: [
    { label: "빌드로그 작성", href: "/logs/new" },
    { label: "질문 작성", href: "/questions/new" },
    { label: "피드백 요청", href: "/feedback/new" },
  ],
};

export const sampleLogDetail = {
  title: "로그인 화면 플로우 정리",
  status: "shared",
  builder: "빌더 A",
  project: "노코드 CRM 리빌드",
  sections: [
    {
      title: "오늘 작업한 것",
      body: "로그인 성공 이후 사용자가 바로 고객 상태판으로 이동하도록 첫 화면 동선을 다시 정리했습니다.",
    },
    {
      title: "막힌 부분",
      body: "로그인 실패 메시지가 너무 기술적으로 보여서 실제 사용자가 다음 행동을 이해하기 어려웠습니다.",
    },
    {
      title: "사용한 AI 프롬프트",
      body: "사용자 입장에서 로그인 실패 후 다시 시도하게 만드는 UX 문구와 화면 흐름을 제안해줘.",
    },
  ],
  actions: ["질문으로 전환", "피드백 요청으로 전환", "지식으로 전환"],
};

export const sampleQuestionDetail = {
  title: "Supabase RLS 정책이 예상보다 넓게 열립니다",
  status: "open",
  builder: "빌더 B",
  project: "빌더클럽 권한 설계",
  sections: [
    {
      title: "막힌 상황",
      body: "빌더룸의 private 기록이 club 공개 목록 쿼리에 섞일 가능성이 있어 RLS 조건을 다시 보고 있습니다.",
    },
    {
      title: "이미 시도한 방법",
      body: "builder_id와 visibility 조건을 분리해봤지만, 조인된 activity_feed에서 원본 공개 범위를 놓칠 수 있었습니다.",
    },
    {
      title: "채택된 답변",
      body: "activity_feed에는 표시용 데이터만 두고, 원본 콘텐츠의 visibility를 다시 확인하는 정책을 추가하는 방향이 안전합니다.",
    },
  ],
  actions: ["해결 노하우로 전환", "관련 빌드로그 보기"],
};

export const sampleFeedbackDetail = {
  title: "빌더룸 첫 화면 피드백 요청",
  status: "in_review",
  builder: "빌더 A",
  project: "노코드 CRM 리빌드",
  sections: [
    {
      title: "확인받고 싶은 관점",
      body: "첫 화면에서 오늘의 작업 초점, 다음 액션, 최근 피드백 중 무엇을 가장 먼저 봐야 하는지 확인받고 싶습니다.",
    },
    {
      title: "사용자가 해야 할 행동",
      body: "빌더룸에 들어온 뒤 오늘 할 일을 이해하고 바로 빌드로그 작성으로 이어질 수 있어야 합니다.",
    },
    {
      title: "피드백 댓글",
      body: "오늘의 작업 초점은 좋고, 다음 액션은 버튼처럼 더 명확하게 보이면 행동으로 이어지기 쉽겠습니다.",
    },
  ],
  actions: ["반영 상태 업데이트", "회고로 남기기"],
};

export const sampleKnowledgeDetail = {
  title: "Claude Code에게 화면 구조를 맡길 때 좋은 요청 방식",
  status: "published",
  builder: "빌더 C",
  project: "빌더클럽 프로토타입",
  sections: [
    {
      title: "핵심 내용",
      body: "랜딩 설명을 늘리기보다 실제 사용자가 들어갈 대시보드, 목록, 상세, 작성 흐름을 먼저 요청하면 앱 구조가 빠르게 잡힙니다.",
    },
    {
      title: "적용한 방법",
      body: "전체 커뮤니티 활동 중심 대시보드에서 시작해 빌더룸, 빌드로그, 질문, 피드백, 지식 공유 순서로 화면을 확장했습니다.",
    },
    {
      title: "재사용 팁",
      body: "새 서비스를 만들 때도 먼저 공용 허브와 개인 작업 공간을 나누고, 기록이 질문과 지식으로 전환되는 흐름을 잡아보세요.",
    },
  ],
  actions: ["관련 질문 보기", "출처 빌드로그 보기"],
};
