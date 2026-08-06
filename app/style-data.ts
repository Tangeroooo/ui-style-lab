export type AxisKey =
  | "aesthetic"
  | "surface"
  | "layout"
  | "type"
  | "palette"
  | "motion";

export type Option = {
  id: string;
  ko: string;
  en: string;
  note: string;
};

export type Selection = Record<AxisKey, string>;

export const axes: Record<AxisKey, Option[]> = {
  aesthetic: [
    { id: "minimal", ko: "미니멀리즘", en: "Minimalism", note: "절제된 요소와 넓은 여백" },
    { id: "swiss", ko: "스위스 모더니즘", en: "Swiss Modernism", note: "grid, 질서, 객관적 typography" },
    { id: "brutalist", ko: "네오 브루탈리즘", en: "Neo-brutalism", note: "굵은 선과 hard shadow" },
    { id: "editorial", ko: "에디토리얼", en: "Editorial", note: "잡지식 hierarchy와 serif" },
    { id: "memphis", ko: "네오 멤피스", en: "Neo-Memphis", note: "원색과 playful geometry" },
    { id: "y2k", ko: "Y2K 퓨처리즘", en: "Y2K Futurism", note: "chrome과 낙관적 digital nostalgia" },
    { id: "cyberpunk", ko: "사이버펑크", en: "Cyberpunk", note: "neon, dense data, tech-noir" },
    { id: "frutiger", ko: "프루티거 에어로", en: "Frutiger Aero", note: "자연과 glossy technology" },
    { id: "terminal", ko: "터미널 레트로", en: "Terminal Retro", note: "monospace와 phosphor display" },
    { id: "luxury", ko: "럭셔리 미니멀", en: "Luxury Minimalism", note: "고급 serif와 절제된 금색" },
    { id: "organic", ko: "오가닉 바이오필릭", en: "Organic Biophilic", note: "자연색과 biomorphic curve" },
    { id: "vaporwave", ko: "베이퍼웨이브", en: "Vaporwave", note: "pink·violet·retro digital mood" },
  ],
  surface: [
    { id: "flat", ko: "플랫", en: "Flat", note: "입체 효과 없는 명확한 면" },
    { id: "glass", ko: "글래스모피즘", en: "Glassmorphism", note: "blurred translucent glass" },
    { id: "neumo", ko: "뉴모피즘", en: "Neumorphism", note: "soft embossed surface" },
    { id: "clay", ko: "클레이모피즘", en: "Claymorphism", note: "말랑하고 부푼 3D" },
    { id: "material", ko: "머티리얼", en: "Material", note: "paper layer와 elevation" },
    { id: "liquid", ko: "리퀴드 글래스", en: "Liquid Glass", note: "굴절되는 유동적 glass" },
    { id: "chrome", ko: "리퀴드 크롬", en: "Liquid Chrome", note: "반사되는 금속 surface" },
    { id: "paper", ko: "디지털 페이퍼", en: "Digital Paper", note: "인쇄물 같은 tactile texture" },
    { id: "glossy", ko: "웹 2.0 글로시", en: "Web 2.0 Gloss", note: "gel button과 specular highlight" },
  ],
  layout: [
    { id: "dashboard", ko: "대시보드", en: "Dashboard", note: "metric 중심의 기본 구조" },
    { id: "bento", ko: "벤토 그리드", en: "Bento Grid", note: "크기가 다른 tile 조합" },
    { id: "cards", ko: "카드 그리드", en: "Card Grid", note: "독립된 동일 비중의 module" },
    { id: "editorial", ko: "에디토리얼", en: "Editorial Grid", note: "headline과 long-form rhythm" },
    { id: "split", ko: "스플릿 뷰", en: "Split View", note: "두 개의 강한 화면 영역" },
    { id: "dense", ko: "데이터 덴스", en: "Data Dense", note: "작은 간격과 높은 정보량" },
    { id: "poster", ko: "브로큰 그리드", en: "Broken Grid", note: "겹침과 비대칭 composition" },
  ],
  type: [
    { id: "grotesk", ko: "네오 그로테스크", en: "Neo-grotesk", note: "중립적이고 정돈된 sans" },
    { id: "humanist", ko: "휴머니스트 산스", en: "Humanist Sans", note: "친근하고 읽기 쉬운 sans" },
    { id: "serif", ko: "에디토리얼 세리프", en: "Editorial Serif", note: "대조가 큰 고전적 serif" },
    { id: "mono", ko: "모노스페이스", en: "Monospace", note: "기술적이고 구조적인 rhythm" },
    { id: "rounded", ko: "라운디드 산스", en: "Rounded Sans", note: "부드럽고 playful한 인상" },
    { id: "condensed", ko: "콘덴스드 디스플레이", en: "Condensed Display", note: "좁고 강한 headline" },
    { id: "slab", ko: "슬랩 세리프", en: "Slab Serif", note: "굵은 획과 editorial 힘" },
    { id: "pixel", ko: "픽셀 타입", en: "Pixel Type", note: "초기 digital display 분위기" },
  ],
  palette: [
    { id: "cobalt", ko: "코발트", en: "Cobalt", note: "blue와 electric violet" },
    { id: "mono", ko: "모노", en: "Monochrome", note: "black, white, neutral grey" },
    { id: "primary", ko: "프라이머리", en: "Primary", note: "red, blue, yellow" },
    { id: "citrus", ko: "시트러스", en: "Citrus", note: "lime, tangerine, yellow" },
    { id: "candy", ko: "캔디", en: "Candy", note: "pink, lavender, cyan" },
    { id: "forest", ko: "포레스트", en: "Forest", note: "moss, leaf, warm earth" },
    { id: "sunset", ko: "선셋", en: "Sunset", note: "coral, orange, purple" },
    { id: "noir", ko: "누아르", en: "Noir", note: "black, ivory, restrained gold" },
    { id: "aurora", ko: "오로라", en: "Aurora", note: "cyan, violet, luminous green" },
    { id: "aqua", ko: "아쿠아", en: "Aqua", note: "sky, water, clean green" },
  ],
  motion: [
    { id: "quiet", ko: "콰이어트", en: "Quiet", note: "motion을 거의 사용하지 않음" },
    { id: "subtle", ko: "서틀", en: "Subtle", note: "짧고 기능적인 feedback" },
    { id: "kinetic", ko: "키네틱", en: "Kinetic", note: "크고 탄성 있는 transition" },
  ],
};

export const axisMeta: Record<AxisKey, { index: string; ko: string; en: string }> = {
  aesthetic: { index: "01", ko: "기초 미학", en: "Aesthetic" },
  surface: { index: "02", ko: "표면", en: "Surface" },
  layout: { index: "03", ko: "구성", en: "Layout" },
  type: { index: "04", ko: "서체", en: "Typography" },
  palette: { index: "05", ko: "색상", en: "Palette" },
  motion: { index: "06", ko: "움직임", en: "Motion" },
};

export const defaultSelection: Selection = {
  aesthetic: "minimal",
  surface: "glass",
  layout: "bento",
  type: "grotesk",
  palette: "cobalt",
  motion: "subtle",
};

export type Preset = {
  id: string;
  name: string;
  label: string;
  category: string;
  selection: Selection;
};

export const presets: Preset[] = [
  { id: "glass-bento", name: "Glass Bento", label: "맑은 제품 대시보드", category: "Contemporary", selection: defaultSelection },
  { id: "neo-brutal", name: "Primary Brutal", label: "강한 선과 원색", category: "Expressive", selection: { aesthetic: "brutalist", surface: "flat", layout: "dashboard", type: "condensed", palette: "primary", motion: "kinetic" } },
  { id: "soft-neumo", name: "Soft Neumorphic", label: "부드러운 control panel", category: "Morphism", selection: { aesthetic: "minimal", surface: "neumo", layout: "cards", type: "humanist", palette: "cobalt", motion: "subtle" } },
  { id: "swiss-flat", name: "Swiss Data", label: "grid와 정보의 질서", category: "Modernist", selection: { aesthetic: "swiss", surface: "flat", layout: "dense", type: "grotesk", palette: "mono", motion: "quiet" } },
  { id: "editorial-luxury", name: "Editorial Noir", label: "절제된 luxury report", category: "Editorial", selection: { aesthetic: "luxury", surface: "paper", layout: "editorial", type: "serif", palette: "noir", motion: "quiet" } },
  { id: "y2k-chrome", name: "Y2K Chrome", label: "2000년대의 미래", category: "Retro", selection: { aesthetic: "y2k", surface: "chrome", layout: "poster", type: "rounded", palette: "aurora", motion: "kinetic" } },
  { id: "cyber-hud", name: "Cyber HUD", label: "neon command center", category: "Futurist", selection: { aesthetic: "cyberpunk", surface: "glass", layout: "dense", type: "mono", palette: "aurora", motion: "kinetic" } },
  { id: "material-you", name: "Material You", label: "friendly dynamic color", category: "System", selection: { aesthetic: "organic", surface: "material", layout: "cards", type: "rounded", palette: "candy", motion: "subtle" } },
  { id: "memphis-pop", name: "Memphis Pop", label: "playful creative tools", category: "Expressive", selection: { aesthetic: "memphis", surface: "flat", layout: "bento", type: "slab", palette: "primary", motion: "kinetic" } },
  { id: "frutiger-gloss", name: "Aero Optimism", label: "nature meets technology", category: "Retro", selection: { aesthetic: "frutiger", surface: "glossy", layout: "dashboard", type: "humanist", palette: "aqua", motion: "subtle" } },
  { id: "terminal-green", name: "Terminal 84", label: "phosphor operations", category: "Retro", selection: { aesthetic: "terminal", surface: "flat", layout: "dense", type: "pixel", palette: "forest", motion: "quiet" } },
  { id: "paper-report", name: "Paper Report", label: "printed annual report", category: "Editorial", selection: { aesthetic: "editorial", surface: "paper", layout: "editorial", type: "serif", palette: "sunset", motion: "quiet" } },
  { id: "clay-candy", name: "Candy Clay", label: "말랑한 onboarding", category: "Morphism", selection: { aesthetic: "organic", surface: "clay", layout: "cards", type: "rounded", palette: "candy", motion: "kinetic" } },
  { id: "liquid-spatial", name: "Liquid Spatial", label: "floating glass controls", category: "Contemporary", selection: { aesthetic: "minimal", surface: "liquid", layout: "split", type: "humanist", palette: "aurora", motion: "subtle" } },
  { id: "corporate-clean", name: "Corporate Clean", label: "안전한 B2B clarity", category: "System", selection: { aesthetic: "minimal", surface: "material", layout: "dashboard", type: "grotesk", palette: "cobalt", motion: "quiet" } },
  { id: "vapor-grid", name: "Vapor Grid", label: "dreamy retro analytics", category: "Retro", selection: { aesthetic: "vaporwave", surface: "glass", layout: "poster", type: "mono", palette: "candy", motion: "kinetic" } },
  { id: "organic-calm", name: "Organic Calm", label: "wellness와 quiet data", category: "Nature", selection: { aesthetic: "organic", surface: "paper", layout: "bento", type: "humanist", palette: "forest", motion: "quiet" } },
  { id: "citrus-split", name: "Citrus Split", label: "energetic commerce", category: "Expressive", selection: { aesthetic: "swiss", surface: "flat", layout: "split", type: "condensed", palette: "citrus", motion: "subtle" } },
];

export const axisKeys = Object.keys(axes) as AxisKey[];

export function getOption(axis: AxisKey, id: string) {
  return axes[axis].find((item) => item.id === id) ?? axes[axis][0];
}

export function combinationCount() {
  return axisKeys.reduce((total, axis) => total * axes[axis].length, 1);
}
