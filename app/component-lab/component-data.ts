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
  { id: "input", category: "forms", en: "Input", ko: "입력창", description: { en: "Text entry with labels, hints, and validation.", ko: "레이블·도움말·검증 상태가 있는 텍스트 입력입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "textarea", category: "forms", en: "Textarea", ko: "여러 줄 입력", description: { en: "Long-form input with a character budget.", ko: "글자 수 안내가 있는 긴 문장 입력입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "select", category: "forms", en: "Select", ko: "선택 메뉴", description: { en: "A compact single-choice field.", ko: "하나의 값을 고르는 간결한 선택 필드입니다." }, states: ["default", "focus", "disabled", "error"] },
  { id: "checks", category: "forms", en: "Checkbox & Radio", ko: "체크박스와 라디오", description: { en: "Multiple-choice and single-choice controls.", ko: "복수 선택과 단일 선택 control입니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "switch", category: "forms", en: "Switch", ko: "스위치", description: { en: "Immediate binary settings and availability.", ko: "즉시 반영되는 이진 설정과 사용 가능 상태입니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "slider", category: "forms", en: "Slider", ko: "슬라이더", description: { en: "Continuous input with visible output.", ko: "현재 값을 함께 보여주는 연속 입력입니다." }, states: ["default", "focus", "disabled"] },
  { id: "tabs", category: "navigation", en: "Tabs", ko: "탭", description: { en: "Peer views inside the same context.", ko: "같은 맥락 안에서 동등한 화면을 전환합니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "breadcrumb", category: "navigation", en: "Breadcrumb", ko: "경로 표시", description: { en: "Location and ancestry within a hierarchy.", ko: "계층 안에서 현재 위치와 상위 경로를 표시합니다." }, states: ["default", "hover", "focus"] },
  { id: "pagination", category: "navigation", en: "Pagination", ko: "페이지 이동", description: { en: "Movement across a bounded result set.", ko: "범위가 정해진 결과 목록의 페이지를 이동합니다." }, states: ["default", "selected", "focus", "disabled"] },
  { id: "alert", category: "feedback", en: "Alert", ko: "알림", description: { en: "Inline information, success, warning, and error.", ko: "정보·성공·경고·오류를 문맥 안에서 전달합니다." }, states: ["default", "error"] },
  { id: "toast", category: "feedback", en: "Toast", ko: "토스트", description: { en: "Brief feedback that does not block the task.", ko: "작업을 막지 않는 짧은 결과 안내입니다." }, states: ["default"] },
  { id: "progress", category: "feedback", en: "Progress & Skeleton", ko: "진행률과 스켈레톤", description: { en: "Determinate and indeterminate loading feedback.", ko: "진행 정도가 있거나 없는 loading 상태입니다." }, states: ["default", "loading"] },
  { id: "card", category: "data-display", en: "Card", ko: "카드", description: { en: "A grouped summary with one clear next action.", ko: "하나의 명확한 다음 동작을 가진 정보 묶음입니다." }, states: ["default", "hover", "focus"] },
  { id: "badge-avatar", category: "data-display", en: "Badge & Avatar", ko: "배지와 아바타", description: { en: "Compact status and identity signals.", ko: "상태와 정체성을 작게 전달하는 요소입니다." }, states: ["default", "selected"] },
  { id: "table", category: "data-display", en: "Data Table", ko: "데이터 테이블", description: { en: "Comparable records with sorting and selection.", ko: "정렬과 선택이 가능한 비교형 데이터 목록입니다." }, states: ["default", "selected", "hover"] },
  { id: "dialog", category: "overlays", en: "Dialog", ko: "대화상자", description: { en: "A focused decision above the current task.", ko: "현재 작업 위에서 집중된 결정을 요청합니다." }, states: ["default", "focus"] },
  { id: "popover", category: "overlays", en: "Popover", ko: "팝오버", description: { en: "Contextual controls anchored to a trigger.", ko: "trigger에 연결된 문맥형 control입니다." }, states: ["default", "focus"] },
  { id: "drawer", category: "overlays", en: "Drawer", ko: "드로어", description: { en: "Secondary work that enters from an edge.", ko: "화면 가장자리에서 들어오는 보조 작업 영역입니다." }, states: ["default", "focus"] },
] as const satisfies readonly ComponentDefinition[];

export type ComponentId = (typeof componentCatalog)[number]["id"];

export const defaultComponentId: ComponentId = "button";

export function isComponentId(value: string | null): value is ComponentId {
  return componentCatalog.some((component) => component.id === value);
}

export function getComponentDefinition(id: ComponentId) {
  return componentCatalog.find((component) => component.id === id)!;
}
