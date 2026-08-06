export type AxisKey =
  | "aesthetic"
  | "surface"
  | "layout"
  | "nav"
  | "navStyle"
  | "type"
  | "koType"
  | "fontMode"
  | "palette"
  | "motion";

export type Option = {
  id: string;
  ko: string;
  en: string;
  note: string;
};

export type Selection = Record<AxisKey, string>;
export type DependentAxis = Exclude<AxisKey, "aesthetic">;
export type Language = "en" | "ko";

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
    { id: "landing", ko: "랜딩 내러티브", en: "Landing Narrative", note: "hero부터 CTA까지 이어지는 흐름" },
    { id: "bento", ko: "벤토 그리드", en: "Bento Grid", note: "크기가 다른 section의 조합" },
    { id: "cards", ko: "모듈러 카드", en: "Modular Cards", note: "독립된 동일 비중의 content module" },
    { id: "editorial", ko: "에디토리얼", en: "Editorial Grid", note: "headline과 long-form reading rhythm" },
    { id: "split", ko: "스플릿 내러티브", en: "Split Narrative", note: "두 개의 강한 화면 영역" },
    { id: "dense", ko: "컴팩트 인덱스", en: "Compact Index", note: "작은 간격과 높은 콘텐츠 밀도" },
    { id: "poster", ko: "브로큰 그리드", en: "Broken Grid", note: "겹침과 비대칭 composition" },
  ],
  nav: [
    { id: "top", ko: "상단 메뉴", en: "Top Navigation", note: "콘텐츠 위의 horizontal navigation" },
    { id: "left", ko: "좌측 메뉴", en: "Left Navigation", note: "페이지 전체를 관통하는 vertical rail" },
  ],
  navStyle: [
    { id: "text", ko: "텍스트", en: "Text", note: "명확한 텍스트 label 중심의 메뉴" },
    { id: "icon", ko: "아이콘", en: "Icon", note: "공간을 절약하는 symbol 중심의 메뉴" },
    { id: "both", ko: "아이콘 + 텍스트", en: "Icon + Text", note: "symbol과 label을 함께 제공하는 메뉴" },
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
  koType: [
    { id: "plex", ko: "IBM 플렉스 산스 KR", en: "IBM Plex Sans KR", note: "중립적이고 구조적인 현대 고딕" },
    { id: "pretendard", ko: "프리텐다드", en: "Pretendard", note: "한국 웹 UI에 널리 쓰이는 현대적 system-ui 대체 서체" },
    { id: "suit", ko: "수트", en: "SUIT", note: "화면 본문과 인터페이스에 최적화된 균형 잡힌 고딕" },
    { id: "noto", ko: "노토 산스 KR", en: "Noto Sans KR", note: "폭넓은 글자 지원과 안정적인 다국어 리듬" },
    { id: "spoqa", ko: "스포카 한 산스 네오", en: "Spoqa Han Sans Neo", note: "숫자와 다국어 UI의 균형을 다듬은 웹 고딕" },
    { id: "nanum", ko: "나눔고딕", en: "Nanum Gothic", note: "오랫동안 웹 본문에 사용된 친숙한 고딕" },
    { id: "gowun", ko: "고운 돋움", en: "Gowun Dodum", note: "부드러운 획과 편안한 본문 리듬" },
    { id: "jua", ko: "주아 라운드", en: "Jua Rounded", note: "둥글고 친근한 display 고딕" },
    { id: "coding", ko: "나눔고딕 코딩", en: "Nanum Gothic Coding", note: "한글과 Latin 폭을 정돈한 coding 고딕" },
    { id: "blackhan", ko: "검은고딕", en: "Black Han Sans", note: "굵고 압축적인 headline 고딕" },
  ],
  fontMode: [
    { id: "split", ko: "스크립트 페어링", en: "Script Pairing", note: "Latin은 영문 서체, 한글은 한글 서체로 분리" },
    { id: "koUnified", ko: "한글 서체 통합", en: "Korean Unified", note: "선택한 한글 서체 하나로 Latin과 한글을 모두 표현" },
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
  nav: { index: "04", ko: "메뉴 위치", en: "Navigation" },
  navStyle: { index: "05", ko: "메뉴 표현", en: "Menu Style" },
  type: { index: "06", ko: "영문 서체", en: "Latin Type" },
  koType: { index: "07", ko: "한글 서체", en: "Korean Type" },
  fontMode: { index: "08", ko: "서체 적용", en: "Type Binding" },
  palette: { index: "09", ko: "색상", en: "Palette" },
  motion: { index: "10", ko: "움직임", en: "Motion" },
};

export const defaultSelection: Selection = {
  aesthetic: "minimal",
  surface: "glass",
  layout: "dense",
  nav: "top",
  navStyle: "text",
  type: "grotesk",
  koType: "plex",
  fontMode: "split",
  palette: "cobalt",
  motion: "subtle",
};

type AestheticRule = {
  defaults: Record<DependentAxis, string>;
  allowed: Record<DependentAxis, string[]>;
};

export const dependentAxisKeys: DependentAxis[] = [
  "surface",
  "layout",
  "nav",
  "navStyle",
  "type",
  "koType",
  "fontMode",
  "palette",
  "motion",
];

/**
 * Aesthetic is the governing layer. Each rule keeps the identity of the
 * selected movement intact while still leaving room for meaningful variants.
 */
export const aestheticRules: Record<string, AestheticRule> = {
  minimal: {
    defaults: { surface: "glass", layout: "dense", nav: "top", navStyle: "text", type: "grotesk", koType: "plex", fontMode: "split", palette: "cobalt", motion: "subtle" },
    allowed: {
      surface: ["flat", "glass", "neumo", "material", "liquid"],
      layout: ["landing", "bento", "cards", "split", "dense"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist", "serif", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun", "jua", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["cobalt", "mono", "noir", "forest", "aurora", "aqua"],
      motion: ["quiet", "subtle"],
    },
  },
  swiss: {
    defaults: { surface: "flat", layout: "dense", nav: "left", navStyle: "text", type: "grotesk", koType: "plex", fontMode: "split", palette: "mono", motion: "quiet" },
    allowed: {
      surface: ["flat", "paper", "material"],
      layout: ["landing", "editorial", "split", "dense"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "mono", "condensed"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["mono", "primary", "cobalt", "citrus"],
      motion: ["quiet", "subtle"],
    },
  },
  brutalist: {
    defaults: { surface: "flat", layout: "landing", nav: "left", navStyle: "both", type: "condensed", koType: "blackhan", fontMode: "koUnified", palette: "primary", motion: "kinetic" },
    allowed: {
      surface: ["flat", "paper"],
      layout: ["landing", "bento", "cards", "dense", "poster"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "mono", "condensed", "slab"],
      koType: ["plex", "pretendard", "suit", "noto", "nanum", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["primary", "mono", "cobalt", "citrus"],
      motion: ["quiet", "subtle", "kinetic"],
    },
  },
  editorial: {
    defaults: { surface: "paper", layout: "editorial", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "sunset", motion: "quiet" },
    allowed: {
      surface: ["flat", "paper"],
      layout: ["landing", "editorial", "split", "dense"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "serif"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun"],
      fontMode: ["split", "koUnified"],
      palette: ["mono", "forest", "sunset", "noir"],
      motion: ["quiet", "subtle"],
    },
  },
  memphis: {
    defaults: { surface: "flat", layout: "bento", nav: "left", navStyle: "both", type: "slab", koType: "jua", fontMode: "koUnified", palette: "primary", motion: "kinetic" },
    allowed: {
      surface: ["flat", "clay", "glossy"],
      layout: ["landing", "bento", "cards", "poster"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "rounded", "condensed", "slab"],
      koType: ["plex", "pretendard", "suit", "nanum", "jua", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["cobalt", "primary", "citrus", "candy"],
      motion: ["subtle", "kinetic"],
    },
  },
  y2k: {
    defaults: { surface: "chrome", layout: "poster", nav: "top", navStyle: "both", type: "rounded", koType: "jua", fontMode: "split", palette: "aurora", motion: "kinetic" },
    allowed: {
      surface: ["glass", "liquid", "chrome", "glossy"],
      layout: ["landing", "bento", "cards", "split", "poster"],
      nav: ["top", "left"],
      navStyle: ["icon", "both"],
      type: ["grotesk", "mono", "rounded", "pixel"],
      koType: ["plex", "pretendard", "suit", "nanum", "jua", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["cobalt", "candy", "aurora", "aqua"],
      motion: ["subtle", "kinetic"],
    },
  },
  cyberpunk: {
    defaults: { surface: "glass", layout: "dense", nav: "left", navStyle: "both", type: "mono", koType: "coding", fontMode: "split", palette: "aurora", motion: "kinetic" },
    allowed: {
      surface: ["flat", "glass", "chrome"],
      layout: ["cards", "split", "dense", "poster"],
      nav: ["top", "left"],
      navStyle: ["icon", "both"],
      type: ["grotesk", "mono", "condensed", "pixel"],
      koType: ["plex", "pretendard", "suit", "noto", "nanum", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["cobalt", "noir", "aurora"],
      motion: ["subtle", "kinetic"],
    },
  },
  frutiger: {
    defaults: { surface: "glossy", layout: "landing", nav: "top", navStyle: "both", type: "humanist", koType: "gowun", fontMode: "koUnified", palette: "aqua", motion: "subtle" },
    allowed: {
      surface: ["glass", "material", "glossy"],
      layout: ["landing", "bento", "cards"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist", "rounded"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun", "jua"],
      fontMode: ["split", "koUnified"],
      palette: ["aqua"],
      motion: ["subtle", "kinetic"],
    },
  },
  terminal: {
    defaults: { surface: "flat", layout: "dense", nav: "left", navStyle: "both", type: "pixel", koType: "coding", fontMode: "koUnified", palette: "forest", motion: "quiet" },
    allowed: {
      surface: ["flat"],
      layout: ["cards", "dense"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["mono", "pixel"],
      koType: ["nanum", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["forest"],
      motion: ["quiet", "subtle"],
    },
  },
  luxury: {
    defaults: { surface: "paper", layout: "editorial", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "noir", motion: "quiet" },
    allowed: {
      surface: ["flat", "material", "paper"],
      layout: ["landing", "cards", "editorial", "split"],
      nav: ["top", "left"],
      navStyle: ["text"],
      type: ["grotesk", "serif"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun"],
      fontMode: ["split", "koUnified"],
      palette: ["noir"],
      motion: ["quiet", "subtle"],
    },
  },
  organic: {
    defaults: { surface: "paper", layout: "bento", nav: "left", navStyle: "both", type: "humanist", koType: "gowun", fontMode: "koUnified", palette: "forest", motion: "quiet" },
    allowed: {
      surface: ["flat", "clay", "material", "paper"],
      layout: ["landing", "bento", "cards", "split"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["humanist", "serif", "rounded"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun", "jua"],
      fontMode: ["split", "koUnified"],
      palette: ["citrus", "candy", "forest", "aqua"],
      motion: ["quiet", "subtle", "kinetic"],
    },
  },
  vaporwave: {
    defaults: { surface: "glass", layout: "poster", nav: "top", navStyle: "icon", type: "mono", koType: "coding", fontMode: "split", palette: "candy", motion: "kinetic" },
    allowed: {
      surface: ["glass", "chrome", "glossy"],
      layout: ["cards", "split", "dense", "poster"],
      nav: ["top", "left"],
      navStyle: ["icon", "both"],
      type: ["serif", "mono", "pixel"],
      koType: ["pretendard", "suit", "nanum", "jua", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["candy"],
      motion: ["subtle", "kinetic"],
    },
  },
};

export type Preset = {
  id: string;
  name: string;
  label: string;
  category: string;
  selection: Selection;
};

export const presets: Preset[] = [
  { id: "glass-bento", name: "Glass Field", label: "투명한 여행 저널", category: "Contemporary", selection: defaultSelection },
  { id: "neo-brutal", name: "Primary Brutal", label: "강한 독립 출판물", category: "Expressive", selection: { aesthetic: "brutalist", surface: "flat", layout: "landing", nav: "left", navStyle: "both", type: "condensed", koType: "blackhan", fontMode: "koUnified", palette: "primary", motion: "kinetic" } },
  { id: "soft-neumo", name: "Soft Neumorphic", label: "차분한 wellness journal", category: "Morphism", selection: { aesthetic: "minimal", surface: "neumo", layout: "cards", nav: "top", navStyle: "text", type: "humanist", koType: "gowun", fontMode: "split", palette: "cobalt", motion: "subtle" } },
  { id: "swiss-flat", name: "Swiss Archive", label: "grid로 정리한 field archive", category: "Modernist", selection: { aesthetic: "swiss", surface: "flat", layout: "dense", nav: "left", navStyle: "text", type: "grotesk", koType: "plex", fontMode: "split", palette: "mono", motion: "quiet" } },
  { id: "editorial-luxury", name: "Editorial Noir", label: "절제된 luxury journal", category: "Editorial", selection: { aesthetic: "luxury", surface: "paper", layout: "editorial", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "noir", motion: "quiet" } },
  { id: "y2k-chrome", name: "Y2K Chrome", label: "2000년대의 미래", category: "Retro", selection: { aesthetic: "y2k", surface: "chrome", layout: "poster", nav: "top", navStyle: "both", type: "rounded", koType: "jua", fontMode: "split", palette: "aurora", motion: "kinetic" } },
  { id: "cyber-hud", name: "Cyber Trail", label: "neon expedition index", category: "Futurist", selection: { aesthetic: "cyberpunk", surface: "glass", layout: "dense", nav: "left", navStyle: "both", type: "mono", koType: "coding", fontMode: "split", palette: "aurora", motion: "kinetic" } },
  { id: "material-you", name: "Material You", label: "friendly dynamic color", category: "System", selection: { aesthetic: "organic", surface: "material", layout: "cards", nav: "top", navStyle: "both", type: "rounded", koType: "jua", fontMode: "koUnified", palette: "candy", motion: "subtle" } },
  { id: "memphis-pop", name: "Memphis Pop", label: "playful creative tools", category: "Expressive", selection: { aesthetic: "memphis", surface: "flat", layout: "bento", nav: "left", navStyle: "both", type: "slab", koType: "jua", fontMode: "koUnified", palette: "primary", motion: "kinetic" } },
  { id: "frutiger-gloss", name: "Aero Optimism", label: "nature meets glossy web", category: "Retro", selection: { aesthetic: "frutiger", surface: "glossy", layout: "landing", nav: "top", navStyle: "both", type: "humanist", koType: "gowun", fontMode: "koUnified", palette: "aqua", motion: "subtle" } },
  { id: "terminal-green", name: "Terminal 84", label: "phosphor field log", category: "Retro", selection: { aesthetic: "terminal", surface: "flat", layout: "dense", nav: "left", navStyle: "both", type: "pixel", koType: "coding", fontMode: "koUnified", palette: "forest", motion: "quiet" } },
  { id: "paper-report", name: "Paper Report", label: "printed annual report", category: "Editorial", selection: { aesthetic: "editorial", surface: "paper", layout: "editorial", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "sunset", motion: "quiet" } },
  { id: "clay-candy", name: "Candy Clay", label: "말랑한 onboarding", category: "Morphism", selection: { aesthetic: "organic", surface: "clay", layout: "cards", nav: "left", navStyle: "both", type: "rounded", koType: "jua", fontMode: "koUnified", palette: "candy", motion: "kinetic" } },
  { id: "liquid-spatial", name: "Liquid Spatial", label: "floating glass controls", category: "Contemporary", selection: { aesthetic: "minimal", surface: "liquid", layout: "split", nav: "top", navStyle: "icon", type: "humanist", koType: "plex", fontMode: "split", palette: "aurora", motion: "subtle" } },
  { id: "corporate-clean", name: "Corporate Clean", label: "명료한 editorial landing", category: "System", selection: { aesthetic: "minimal", surface: "material", layout: "landing", nav: "left", navStyle: "text", type: "grotesk", koType: "plex", fontMode: "split", palette: "cobalt", motion: "quiet" } },
  { id: "vapor-grid", name: "Vapor Grid", label: "dreamy retro travel page", category: "Retro", selection: { aesthetic: "vaporwave", surface: "glass", layout: "poster", nav: "top", navStyle: "icon", type: "mono", koType: "coding", fontMode: "split", palette: "candy", motion: "kinetic" } },
  { id: "organic-calm", name: "Organic Calm", label: "wellness와 quiet data", category: "Nature", selection: { aesthetic: "organic", surface: "paper", layout: "bento", nav: "left", navStyle: "both", type: "humanist", koType: "gowun", fontMode: "koUnified", palette: "forest", motion: "quiet" } },
  { id: "citrus-split", name: "Citrus Split", label: "energetic commerce", category: "Expressive", selection: { aesthetic: "swiss", surface: "flat", layout: "split", nav: "top", navStyle: "text", type: "condensed", koType: "blackhan", fontMode: "split", palette: "citrus", motion: "subtle" } },
];

const optionNotesEn: Record<AxisKey, Record<string, string>> = {
  aesthetic: {
    minimal: "Restrained elements and generous whitespace",
    swiss: "Objective type, grids, and visual order",
    brutalist: "Heavy outlines and hard offset shadows",
    editorial: "Magazine hierarchy and reading rhythm",
    memphis: "Primary colors and playful geometry",
    y2k: "Chrome and optimistic digital nostalgia",
    cyberpunk: "Neon, dense data, and tech-noir",
    frutiger: "Nature paired with glossy technology",
    terminal: "Monospace and phosphor-display logic",
    luxury: "Refined serif and restrained metallic accents",
    organic: "Natural color and biomorphic curves",
    vaporwave: "Pink-violet retro digital atmosphere",
  },
  surface: {
    flat: "Clear planes without dimensional effects",
    glass: "Blurred translucent glass",
    neumo: "Soft embossed surfaces",
    clay: "Rounded, inflated 3D forms",
    material: "Paper-like layers and elevation",
    liquid: "Refractive fluid glass",
    chrome: "Reflective metallic surfaces",
    paper: "Tactile print-inspired texture",
    glossy: "Gel controls and specular highlights",
  },
  layout: {
    landing: "A guided flow from hero to CTA",
    bento: "Mixed-size modules in one grid",
    cards: "Independent, equally weighted modules",
    editorial: "Headline-led long-form reading rhythm",
    split: "Two strong and balanced page regions",
    dense: "Tight spacing and high information density",
    poster: "Overlap and asymmetric composition",
  },
  nav: {
    top: "Horizontal navigation above the content",
    left: "A vertical rail spanning the page",
  },
  navStyle: {
    text: "Clear navigation built around text labels",
    icon: "Compact navigation built around symbols",
    both: "Symbols and labels shown together",
  },
  type: {
    grotesk: "Neutral, structured sans-serif",
    humanist: "Warm and highly readable sans-serif",
    serif: "High-contrast editorial serif",
    mono: "Technical and systematic rhythm",
    rounded: "Soft and playful letterforms",
    condensed: "Narrow, forceful display type",
    slab: "Heavy strokes with editorial weight",
    pixel: "Early digital-display character",
  },
  koType: {
    plex: "Neutral, structured Korean grotesk",
    pretendard: "A widely used modern system-UI alternative for Korean web products",
    suit: "A balanced Korean typeface optimized for interface and body copy",
    noto: "Broad glyph coverage with a stable multilingual rhythm",
    spoqa: "A web-focused Korean sans refined for numerals and multilingual UI",
    nanum: "A familiar Korean gothic with a long history in web body text",
    gowun: "Soft strokes with a comfortable reading rhythm",
    jua: "Friendly rounded Korean display face",
    coding: "Monospaced rhythm for Hangul and Latin",
    blackhan: "Heavy, condensed Korean headline face",
  },
  fontMode: {
    split: "Use the Latin face for Latin and the Korean face for Hangul",
    koUnified: "Use the selected Korean face for both Latin and Hangul",
  },
  palette: {
    cobalt: "Blue with electric violet",
    mono: "Black, white, and neutral grey",
    primary: "Red, blue, and yellow",
    citrus: "Lime, tangerine, and yellow",
    candy: "Pink, lavender, and cyan",
    forest: "Moss, leaf, and warm earth",
    sunset: "Coral, orange, and purple",
    noir: "Black, ivory, and restrained gold",
    aurora: "Cyan, violet, and luminous green",
    aqua: "Sky, water, and clean green",
  },
  motion: {
    quiet: "Almost no interface motion",
    subtle: "Short, functional feedback",
    kinetic: "Large, elastic transitions",
  },
};

export const axisKeys = Object.keys(axes) as AxisKey[];

export function getOption(axis: AxisKey, id: string) {
  return axes[axis].find((item) => item.id === id) ?? axes[axis][0];
}

export function getOptionNote(axis: AxisKey, id: string, language: Language) {
  const option = getOption(axis, id);
  return language === "ko" ? option.note : optionNotesEn[axis][option.id];
}

export function getAestheticRule(aesthetic: string) {
  return aestheticRules[aesthetic] ?? aestheticRules[defaultSelection.aesthetic];
}

export function recommendedSelection(aesthetic: string): Selection {
  const validAesthetic = axes.aesthetic.some((option) => option.id === aesthetic)
    ? aesthetic
    : defaultSelection.aesthetic;
  return { aesthetic: validAesthetic, ...getAestheticRule(validAesthetic).defaults };
}

export function isOptionAllowed(selection: Selection, axis: AxisKey, optionId: string) {
  if (axis === "aesthetic") return axes.aesthetic.some((option) => option.id === optionId);
  return getAestheticRule(selection.aesthetic).allowed[axis].includes(optionId);
}

export function normalizeSelection(candidate: Partial<Selection>): Selection {
  const next = recommendedSelection(candidate.aesthetic ?? defaultSelection.aesthetic);
  const rule = getAestheticRule(next.aesthetic);

  for (const axis of dependentAxisKeys) {
    const value = candidate[axis];
    if (value && rule.allowed[axis].includes(value)) next[axis] = value;
  }

  return next;
}

export function combinationCount(activeAxes: readonly AxisKey[] = axisKeys) {
  const countedAxes = dependentAxisKeys.filter((axis) => activeAxes.includes(axis));
  return axes.aesthetic.reduce((total, aesthetic) => {
    const rule = getAestheticRule(aesthetic.id);
    return total + countedAxes.reduce(
      (count, axis) => count * rule.allowed[axis].length,
      1,
    );
  }, 0);
}
