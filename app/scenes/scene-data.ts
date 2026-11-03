export const scenes = [
  { id: "team", en: "Team & access", ko: "팀과 권한", detail: { en: "Invite someone. Give them a place in the team.", ko: "멤버를 초대하고 함께할 권한을 정하세요." }, parts: { en: "Avatar · Input · Select · List · Feedback", ko: "아바타 · 입력 · 선택 · 목록 · 피드백" } },
  { id: "upload", en: "Files & progress", ko: "파일과 진행 상태", detail: { en: "From a file on your device to a shared collection.", ko: "기기의 파일을 팀의 자료 모음에 추가하세요." }, parts: { en: "Drop zone · Progress · File row · Error", ko: "업로드 영역 · 진행률 · 파일 목록 · 오류" } },
  { id: "analytics", en: "Signals & insight", ko: "수치와 인사이트", detail: { en: "Change the period. See the whole picture respond.", ko: "기간을 바꾸면 수치와 차트가 함께 반응합니다." }, parts: { en: "Period picker · Metric · Chart · Table", ko: "기간 선택 · 지표 · 차트 · 표" } },
  { id: "booking", en: "Plan a walk", ko: "산책 예약", detail: { en: "Choose a day, find your pace, make it yours.", ko: "날짜와 시간을 골라 나만의 산책을 계획하세요." }, parts: { en: "Calendar · Time slots · Summary · Confirmation", ko: "달력 · 시간 선택 · 요약 · 확인" } },
  { id: "settings", en: "Personal space", ko: "나의 설정", detail: { en: "Small preferences. A workspace that feels like yours.", ko: "작은 설정으로 나에게 맞는 작업 공간을 만드세요." }, parts: { en: "Profile · Fields · Switch · Save state", ko: "프로필 · 입력 · 스위치 · 저장 상태" } },
] as const;
export type SceneId = typeof scenes[number]["id"];
export const defaultScene: SceneId = "team";
export const isSceneId = (id: unknown): id is SceneId => scenes.some((scene) => scene.id === id);
