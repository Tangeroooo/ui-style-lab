export const componentCategories = [
  "actions",
  "forms",
  "navigation",
  "feedback",
  "data-display",
  "overlays",
] as const;

export type ComponentCategory = (typeof componentCategories)[number];

export type ComponentState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "selected"
  | "disabled"
  | "loading"
  | "error";

export type ComponentDefinition = Readonly<{
  id: string;
  category: ComponentCategory;
  en: string;
  ko: string;
  description: Readonly<{ en: string; ko: string }>;
  states: readonly ComponentState[];
}>;

export const componentCatalog = [
  { id: "button", category: "actions", en: "Button", ko: "버튼", description: { en: "Primary, secondary, destructive, and icon actions.", ko: "주요·보조·삭제·아이콘 동작을 비교합니다." }, states: ["default", "hover", "focus", "disabled", "loading"] },
  { id: "button-group", category: "actions", en: "Button Group", ko: "버튼 그룹", description: { en: "Related actions with a shared visual boundary.", ko: "연관된 동작을 하나의 시각적 경계로 묶습니다." }, states: ["default", "selected", "disabled"] },
  { id: "split-button", category: "actions", en: "Split Button", ko: "분할 버튼", description: { en: "A default action paired with a menu of alternatives.", ko: "기본 동작과 대안 메뉴를 하나의 control로 묶습니다." }, states: ["default", "hover", "focus", "disabled"] },
  { id: "toolbar", category: "actions", en: "Toolbar", ko: "도구 모음", description: { en: "Frequent commands grouped for direct access.", ko: "자주 쓰는 명령을 즉시 실행할 수 있게 묶습니다." }, states: ["default", "active", "disabled"] },
  { id: "link", category: "actions", en: "Link", ko: "링크", description: { en: "Inline and standalone navigation actions.", ko: "문장 안과 독립 영역에서 이동 동작을 제공합니다." }, states: ["default", "hover", "focus", "disabled"] },
  { id: "input", category: "forms", en: "Input", ko: "입력창", description: { en: "Text entry with labels, hints, and validation.", ko: "레이블·도움말·검증 상태가 있는 텍스트 입력입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "textarea", category: "forms", en: "Textarea", ko: "여러 줄 입력", description: { en: "Long-form input with a character budget.", ko: "글자 수 안내가 있는 긴 문장 입력입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "select", category: "forms", en: "Select", ko: "선택 메뉴", description: { en: "A compact single-choice field.", ko: "하나의 값을 고르는 간결한 선택 필드입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "checks", category: "forms", en: "Checkbox & Radio", ko: "체크박스와 라디오", description: { en: "Multiple-choice and single-choice controls.", ko: "복수 선택과 단일 선택 control입니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "switch", category: "forms", en: "Switch", ko: "스위치", description: { en: "Immediate binary settings and availability.", ko: "즉시 반영되는 이진 설정과 사용 가능 상태입니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "slider", category: "forms", en: "Slider", ko: "슬라이더", description: { en: "Continuous input with visible output.", ko: "현재 값을 함께 보여주는 연속 입력입니다." }, states: ["default", "focus", "disabled"] },
  { id: "combobox", category: "forms", en: "Combobox", ko: "콤보박스", description: { en: "Searchable text input with suggested values.", ko: "입력과 추천 선택지를 결합한 검색형 field입니다." }, states: ["default", "focus", "selected", "disabled"] },
  { id: "search-field", category: "forms", en: "Search Field", ko: "검색창", description: { en: "Query input with clear and submit affordances.", ko: "검색어 입력·초기화·실행 동작을 함께 제공합니다." }, states: ["default", "focus", "loading", "disabled"] },
  { id: "number-input", category: "forms", en: "Number Input", ko: "숫자 입력", description: { en: "A numeric field with increment and decrement controls.", ko: "증가·감소 control이 있는 숫자 입력입니다." }, states: ["default", "focus", "error", "disabled"] },
  { id: "date-input", category: "forms", en: "Date Input", ko: "날짜 입력", description: { en: "Native calendar-aware date selection.", ko: "달력 입력을 지원하는 날짜 선택 field입니다." }, states: ["default", "focus", "error", "disabled"] },
  { id: "file-upload", category: "forms", en: "File Upload", ko: "파일 업로드", description: { en: "A labelled file picker with accepted-format guidance.", ko: "허용 형식 안내와 함께 파일을 선택합니다." }, states: ["default", "focus", "selected", "disabled"] },
  { id: "segmented-control", category: "forms", en: "Segmented Control", ko: "세그먼트 선택", description: { en: "A compact single-choice set for peer modes.", ko: "동등한 mode 중 하나를 고르는 compact control입니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "color-input", category: "forms", en: "Color Input", ko: "색상 입력", description: { en: "Native color selection with a readable value.", ko: "색상 선택과 읽을 수 있는 값을 함께 보여줍니다." }, states: ["default", "focus", "disabled"] },
  { id: "tabs", category: "navigation", en: "Tabs", ko: "탭", description: { en: "Peer views inside the same context.", ko: "같은 맥락 안에서 동등한 화면을 전환합니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "breadcrumb", category: "navigation", en: "Breadcrumb", ko: "경로 표시", description: { en: "Location and ancestry within a hierarchy.", ko: "계층 안에서 현재 위치와 상위 경로를 표시합니다." }, states: ["default", "hover", "focus"] },
  { id: "pagination", category: "navigation", en: "Pagination", ko: "페이지 이동", description: { en: "Movement across a bounded result set.", ko: "범위가 정해진 결과 목록의 페이지를 이동합니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "navigation-menu", category: "navigation", en: "Navigation Menu", ko: "내비게이션 메뉴", description: { en: "Primary destinations with a visible current location.", ko: "주요 목적지와 현재 위치를 함께 표시합니다." }, states: ["default", "active", "focus"] },
  { id: "sidebar-menu", category: "navigation", en: "Sidebar Menu", ko: "사이드바 메뉴", description: { en: "Vertical destinations for application workspaces.", ko: "application workspace의 목적지를 세로로 구성합니다." }, states: ["default", "active", "focus"] },
  { id: "stepper", category: "navigation", en: "Stepper", ko: "단계 표시", description: { en: "Progress and position in a sequential task.", ko: "순차 작업의 진행도와 현재 위치를 표시합니다." }, states: ["default", "active", "selected"] },
  { id: "tree-view", category: "navigation", en: "Tree View", ko: "트리 보기", description: { en: "Expandable navigation through nested resources.", ko: "중첩된 resource를 펼쳐 탐색합니다." }, states: ["default", "selected", "focus"] },
  { id: "command-menu", category: "navigation", en: "Command Menu", ko: "명령 메뉴", description: { en: "Keyboard-oriented discovery of destinations and actions.", ko: "키보드 중심으로 목적지와 명령을 찾습니다." }, states: ["default", "focus", "selected"] },
  { id: "alert", category: "feedback", en: "Alert", ko: "알림", description: { en: "Inline information, success, warning, and error.", ko: "정보·성공·경고·오류를 문맥 안에서 전달합니다." }, states: ["default", "error"] },
  { id: "toast", category: "feedback", en: "Toast", ko: "토스트", description: { en: "Brief feedback that does not block the task.", ko: "작업을 막지 않는 짧은 결과 안내입니다." }, states: ["default"] },
  { id: "progress", category: "feedback", en: "Progress & Skeleton", ko: "진행률과 스켈레톤", description: { en: "Determinate and indeterminate loading feedback.", ko: "진행 정도가 있거나 없는 loading 상태입니다." }, states: ["default", "loading"] },
  { id: "banner", category: "feedback", en: "Banner", ko: "배너", description: { en: "Page-level information with a clear next action.", ko: "페이지 수준의 안내와 다음 동작을 제공합니다." }, states: ["default", "error"] },
  { id: "tooltip", category: "feedback", en: "Tooltip", ko: "툴팁", description: { en: "Short supporting text for a focused control.", ko: "focus된 control에 짧은 보조 설명을 제공합니다." }, states: ["default", "hover", "focus"] },
  { id: "empty-state", category: "feedback", en: "Empty State", ko: "빈 상태", description: { en: "Explains an absent result and offers recovery.", ko: "결과가 없는 이유와 다음 동작을 안내합니다." }, states: ["default"] },
  { id: "spinner", category: "feedback", en: "Spinner", ko: "로딩 표시", description: { en: "Compact indeterminate progress feedback.", ko: "완료 시점을 알 수 없는 진행 상태를 작게 표시합니다." }, states: ["default", "loading"] },
  { id: "card", category: "data-display", en: "Card", ko: "카드", description: { en: "A grouped summary with one clear next action.", ko: "하나의 명확한 다음 동작을 가진 정보 묶음입니다." }, states: ["default", "hover", "focus"] },
  { id: "badge-avatar", category: "data-display", en: "Badge & Avatar", ko: "배지와 아바타", description: { en: "Compact status and identity signals.", ko: "상태와 정체성을 작게 전달하는 요소입니다." }, states: ["default", "selected"] },
  { id: "table", category: "data-display", en: "Data Table", ko: "데이터 테이블", description: { en: "Comparable records with sorting and selection.", ko: "정렬과 선택이 가능한 비교형 데이터 목록입니다." }, states: ["default", "selected", "hover"] },
  { id: "list", category: "data-display", en: "List", ko: "목록", description: { en: "Repeated records with metadata and actions.", ko: "metadata와 동작을 가진 반복 record입니다." }, states: ["default", "selected", "hover"] },
  { id: "description-list", category: "data-display", en: "Description List", ko: "설명 목록", description: { en: "Term–value pairs for compact metadata.", ko: "compact metadata를 용어–값 쌍으로 보여줍니다." }, states: ["default"] },
  { id: "stat-card", category: "data-display", en: "Stat Card", ko: "통계 카드", description: { en: "A primary metric, trend, and comparison context.", ko: "핵심 수치와 변화량, 비교 맥락을 요약합니다." }, states: ["default", "hover"] },
  { id: "accordion", category: "data-display", en: "Accordion", ko: "아코디언", description: { en: "Progressive disclosure for related content sections.", ko: "연관 내용을 단계적으로 펼쳐 보여줍니다." }, states: ["default", "selected", "focus"] },
  { id: "timeline", category: "data-display", en: "Timeline", ko: "타임라인", description: { en: "Ordered events with time and status context.", ko: "시간과 상태 맥락을 가진 사건의 순서를 표시합니다." }, states: ["default", "selected"] },
  { id: "calendar", category: "data-display", en: "Calendar", ko: "달력", description: { en: "A month grid with selected and unavailable dates.", ko: "선택일과 사용 불가 날짜가 있는 월간 grid입니다." }, states: ["default", "selected", "disabled"] },
  { id: "dialog", category: "overlays", en: "Dialog", ko: "대화상자", description: { en: "A focused decision above the current task.", ko: "현재 작업 위에서 집중된 결정을 요청합니다." }, states: ["default", "focus"] },
  { id: "popover", category: "overlays", en: "Popover", ko: "팝오버", description: { en: "Contextual controls anchored to a trigger.", ko: "trigger에 연결된 문맥형 control입니다." }, states: ["default", "focus"] },
  { id: "drawer", category: "overlays", en: "Drawer", ko: "드로어", description: { en: "Secondary work that enters from an edge.", ko: "화면 가장자리에서 들어오는 보조 작업 영역입니다." }, states: ["default", "focus"] },
  { id: "context-menu", category: "overlays", en: "Context Menu", ko: "문맥 메뉴", description: { en: "Commands positioned beside the invoking target.", ko: "호출한 대상 옆에 관련 명령을 표시합니다." }, states: ["default", "focus", "disabled"] },
  { id: "hover-card", category: "overlays", en: "Hover Card", ko: "호버 카드", description: { en: "A rich preview attached to a referenced item.", ko: "참조한 항목에 연결된 풍부한 미리보기입니다." }, states: ["default", "hover", "focus"] },
  { id: "command-palette", category: "overlays", en: "Command Palette", ko: "명령 팔레트", description: { en: "A searchable modal for global commands.", ko: "전역 명령을 검색하는 modal interface입니다." }, states: ["default", "focus", "selected"] },
] as const satisfies readonly ComponentDefinition[];

export type ComponentId = (typeof componentCatalog)[number]["id"];

export const defaultComponentId: ComponentId = "button";

export function isComponentId(value: string | null): value is ComponentId {
  return componentCatalog.some((component) => component.id === value);
}

export function getComponentDefinition(id: ComponentId) {
  return componentCatalog.find((component) => component.id === id)!;
}
