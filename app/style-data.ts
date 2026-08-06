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
    { id: "bauhaus", ko: "바우하우스", en: "Bauhaus", note: "기능 중심의 기하학과 원색" },
    { id: "artDeco", ko: "아르데코", en: "Art Deco", note: "대칭, 계단형 geometry, 절제된 장식" },
    { id: "scandinavian", ko: "스칸디나비안", en: "Scandinavian", note: "밝은 자연색과 따뜻한 기능주의" },
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
    { id: "material3", ko: "머티리얼 3", en: "Material 3", note: "Google의 tonal color, shape, elevation system" },
    { id: "material3Dark", ko: "머티리얼 3 · 다크", en: "Material 3 · Dark", note: "Material 3의 dark color role과 tonal elevation" },
    { id: "fluent2", ko: "플루언트 2", en: "Fluent 2", note: "Microsoft의 focus, depth, adaptive UI" },
    { id: "fluent2Dark", ko: "플루언트 2 · 다크", en: "Fluent 2 · Dark", note: "Fluent 2의 dark alias token과 layered focus" },
    { id: "carbon", ko: "IBM 카본", en: "IBM Carbon", note: "2x Grid와 enterprise data density" },
    { id: "carbonDark", ko: "IBM 카본 · 다크", en: "IBM Carbon · Dark", note: "Carbon Gray 100 theme과 고밀도 data UI" },
    { id: "shadcn", ko: "shadcn/ui", en: "shadcn/ui", note: "Open Code, neutral token, composable component defaults" },
    { id: "shadcnDark", ko: "shadcn/ui · 다크", en: "shadcn/ui · Dark", note: "shadcn/ui의 neutral dark token과 compact component rhythm" },
  ],
  surface: [
    { id: "flat", ko: "플랫", en: "Flat", note: "입체 효과 없는 명확한 면" },
    { id: "skeuo", ko: "스큐어모피즘", en: "Skeuomorphism", note: "현실 물성을 닮은 tactile control" },
    { id: "glass", ko: "글래스모피즘", en: "Glassmorphism", note: "blurred translucent glass" },
    { id: "acrylic", ko: "아크릴", en: "Acrylic", note: "색과 blur가 비치는 frosted material" },
    { id: "neumo", ko: "뉴모피즘", en: "Neumorphism", note: "soft embossed surface" },
    { id: "clay", ko: "클레이모피즘", en: "Claymorphism", note: "말랑하고 부푼 3D" },
    { id: "material", ko: "머티리얼", en: "Material", note: "paper layer와 elevation" },
    { id: "liquid", ko: "리퀴드 글래스", en: "Liquid Glass", note: "굴절되는 유동적 glass" },
    { id: "chrome", ko: "리퀴드 크롬", en: "Liquid Chrome", note: "반사되는 금속 surface" },
    { id: "paper", ko: "디지털 페이퍼", en: "Digital Paper", note: "인쇄물 같은 tactile texture" },
    { id: "eink", ko: "E-ink 페이퍼", en: "E-ink Paper", note: "저채도 고대비 digital paper" },
    { id: "glossy", ko: "웹 2.0 글로시", en: "Web 2.0 Gloss", note: "gel button과 specular highlight" },
  ],
  layout: [
    { id: "landing", ko: "랜딩 내러티브", en: "Landing Narrative", note: "hero부터 CTA까지 이어지는 흐름" },
    { id: "bento", ko: "벤토 그리드", en: "Bento Grid", note: "크기가 다른 section의 조합" },
    { id: "cards", ko: "모듈러 카드", en: "Modular Cards", note: "독립된 동일 비중의 content module" },
    { id: "masonry", ko: "메이슨리", en: "Masonry Grid", note: "높이가 다른 module을 촘촘히 쌓는 구성" },
    { id: "editorial", ko: "에디토리얼", en: "Editorial Grid", note: "headline과 long-form reading rhythm" },
    { id: "split", ko: "스플릿 내러티브", en: "Split Narrative", note: "두 개의 강한 화면 영역" },
    { id: "dense", ko: "컴팩트 인덱스", en: "Compact Index", note: "작은 간격과 높은 콘텐츠 밀도" },
    { id: "dashboard", ko: "데이터 대시보드", en: "Data Dashboard", note: "KPI, chart, control을 집약한 화면" },
    { id: "masterDetail", ko: "마스터–디테일", en: "Master–detail", note: "목록과 선택 항목의 detail을 함께 표시" },
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
    { id: "pureWhite", ko: "퓨어 화이트", en: "Pure White", note: "white surface와 near-black typography" },
    { id: "primary", ko: "프라이머리", en: "Primary", note: "red, blue, yellow" },
    { id: "citrus", ko: "시트러스", en: "Citrus", note: "lime, tangerine, yellow" },
    { id: "candy", ko: "캔디", en: "Candy", note: "pink, lavender, cyan" },
    { id: "forest", ko: "포레스트", en: "Forest", note: "moss, leaf, warm earth" },
    { id: "sunset", ko: "선셋", en: "Sunset", note: "coral, orange, purple" },
    { id: "noir", ko: "누아르", en: "Noir", note: "black, ivory, restrained gold" },
    { id: "aurora", ko: "오로라", en: "Aurora", note: "cyan, violet, luminous green" },
    { id: "aqua", ko: "아쿠아", en: "Aqua", note: "sky, water, clean green" },
    { id: "bentoPastel", ko: "벤토 파스텔", en: "Bento Pastel", note: "deep navy와 cobalt, coral, mint pastel" },
    { id: "bauhaus", ko: "바우하우스", en: "Bauhaus", note: "black, white, red, blue, yellow" },
    { id: "deco", ko: "데코 나이트", en: "Deco Night", note: "midnight, ivory, champagne gold" },
    { id: "nordic", ko: "노르딕", en: "Nordic", note: "birch, fog, sage, muted blue" },
    { id: "materialDynamic", ko: "다이내믹 토널", en: "Dynamic Tonal", note: "primary, secondary, tertiary tonal roles" },
    { id: "materialDark", ko: "머티리얼 다크", en: "Material Dark", note: "dark surface와 밝은 tonal color role" },
    { id: "fluent", ko: "플루언트 블루", en: "Fluent Blue", note: "Microsoft blue와 cool neutral" },
    { id: "fluentDark", ko: "플루언트 다크", en: "Fluent Dark", note: "dark neutral alias와 밝은 brand blue" },
    { id: "carbon", ko: "카본 블루", en: "Carbon Blue", note: "IBM blue와 grey 10–100" },
    { id: "carbonDark", ko: "카본 Gray 100", en: "Carbon Gray 100", note: "Gray 100 surface와 accessible IBM blue" },
    { id: "zincDark", ko: "징크 다크", en: "Zinc Dark", note: "near-black zinc와 high-contrast neutral" },
  ],
  motion: [
    { id: "quiet", ko: "콰이어트", en: "Quiet", note: "motion을 거의 사용하지 않음" },
    { id: "subtle", ko: "서틀", en: "Subtle", note: "짧고 기능적인 feedback" },
    { id: "kinetic", ko: "키네틱", en: "Kinetic", note: "크고 탄성 있는 transition" },
  ],
};

export const axisMeta: Record<AxisKey, { ko: string; en: string }> = {
  aesthetic: { ko: "기초 미학", en: "Aesthetic" },
  surface: { ko: "표면", en: "Surface" },
  layout: { ko: "구성", en: "Layout" },
  nav: { ko: "메뉴 위치", en: "Navigation" },
  navStyle: { ko: "메뉴 표현", en: "Menu Style" },
  type: { ko: "영문 서체", en: "Latin Type" },
  koType: { ko: "한글 서체", en: "Korean Type" },
  fontMode: { ko: "서체 적용", en: "Type Binding" },
  palette: { ko: "색상", en: "Palette" },
  motion: { ko: "움직임", en: "Motion" },
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
      surface: ["flat", "glass", "acrylic", "neumo", "material", "liquid", "eink"],
      layout: ["landing", "bento", "cards", "masonry", "split", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist", "serif", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun", "jua", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["cobalt", "mono", "pureWhite", "noir", "forest", "aurora", "aqua", "bentoPastel", "nordic", "materialDynamic", "fluent"],
      motion: ["quiet", "subtle"],
    },
  },
  swiss: {
    defaults: { surface: "flat", layout: "dense", nav: "left", navStyle: "text", type: "grotesk", koType: "plex", fontMode: "split", palette: "mono", motion: "quiet" },
    allowed: {
      surface: ["flat", "paper", "material", "eink"],
      layout: ["landing", "editorial", "split", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "mono", "condensed"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "coding", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["mono", "pureWhite", "primary", "cobalt", "citrus", "carbon"],
      motion: ["quiet", "subtle"],
    },
  },
  bauhaus: {
    defaults: { surface: "flat", layout: "bento", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "bauhaus", motion: "subtle" },
    allowed: {
      surface: ["flat", "material", "paper"],
      layout: ["landing", "bento", "cards", "editorial", "split", "poster"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "condensed", "slab"],
      koType: ["plex", "pretendard", "suit", "noto", "blackhan"],
      fontMode: ["split", "koUnified"],
      palette: ["bauhaus", "primary", "mono"],
      motion: ["quiet", "subtle", "kinetic"],
    },
  },
  artDeco: {
    defaults: { surface: "flat", layout: "poster", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "deco", motion: "quiet" },
    allowed: {
      surface: ["flat", "material", "paper", "glossy"],
      layout: ["landing", "cards", "editorial", "split", "poster"],
      nav: ["top"],
      navStyle: ["text", "both"],
      type: ["serif", "condensed", "slab"],
      koType: ["plex", "pretendard", "suit", "noto", "gowun"],
      fontMode: ["split", "koUnified"],
      palette: ["deco", "noir"],
      motion: ["quiet", "subtle"],
    },
  },
  scandinavian: {
    defaults: { surface: "paper", layout: "masonry", nav: "top", navStyle: "text", type: "humanist", koType: "suit", fontMode: "koUnified", palette: "nordic", motion: "quiet" },
    allowed: {
      surface: ["flat", "material", "paper", "eink"],
      layout: ["landing", "bento", "cards", "masonry", "split"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "humanist"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun"],
      fontMode: ["split", "koUnified"],
      palette: ["nordic", "pureWhite", "mono", "forest"],
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
      surface: ["flat", "paper", "eink"],
      layout: ["landing", "masonry", "editorial", "split", "dense", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "serif"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun"],
      fontMode: ["split", "koUnified"],
      palette: ["mono", "pureWhite", "forest", "sunset", "noir"],
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
      palette: ["cobalt", "primary", "citrus", "candy", "bentoPastel"],
      motion: ["subtle", "kinetic"],
    },
  },
  y2k: {
    defaults: { surface: "chrome", layout: "poster", nav: "top", navStyle: "both", type: "rounded", koType: "jua", fontMode: "split", palette: "aurora", motion: "kinetic" },
    allowed: {
      surface: ["skeuo", "glass", "acrylic", "liquid", "chrome", "glossy"],
      layout: ["landing", "bento", "cards", "split", "dashboard", "poster"],
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
      surface: ["flat", "glass", "acrylic", "chrome"],
      layout: ["cards", "split", "dense", "dashboard", "masterDetail", "poster"],
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
      layout: ["cards", "dense", "dashboard", "masterDetail"],
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
      palette: ["noir", "deco"],
      motion: ["quiet", "subtle"],
    },
  },
  organic: {
    defaults: { surface: "paper", layout: "bento", nav: "left", navStyle: "both", type: "humanist", koType: "gowun", fontMode: "koUnified", palette: "forest", motion: "quiet" },
    allowed: {
      surface: ["flat", "clay", "material", "paper"],
      layout: ["landing", "bento", "cards", "masonry", "split"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["humanist", "serif", "rounded"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "gowun", "jua"],
      fontMode: ["split", "koUnified"],
      palette: ["citrus", "candy", "forest", "aqua", "bentoPastel", "nordic", "materialDynamic"],
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
  material3: {
    defaults: { surface: "material", layout: "cards", nav: "top", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "materialDynamic", motion: "subtle" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["landing", "bento", "cards", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist", "rounded"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "jua"],
      fontMode: ["split", "koUnified"],
      palette: ["materialDynamic", "pureWhite", "cobalt", "candy", "forest", "aqua"],
      motion: ["subtle", "kinetic"],
    },
  },
  material3Dark: {
    defaults: { surface: "material", layout: "cards", nav: "top", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "materialDark", motion: "subtle" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["landing", "bento", "cards", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist", "rounded"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "jua"],
      fontMode: ["split", "koUnified"],
      palette: ["materialDark"],
      motion: ["subtle", "kinetic"],
    },
  },
  fluent2: {
    defaults: { surface: "flat", layout: "masterDetail", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "fluent", motion: "subtle" },
    allowed: {
      surface: ["flat", "acrylic", "material"],
      layout: ["landing", "cards", "split", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum"],
      fontMode: ["split", "koUnified"],
      palette: ["fluent", "pureWhite", "cobalt", "mono"],
      motion: ["quiet", "subtle"],
    },
  },
  fluent2Dark: {
    defaults: { surface: "flat", layout: "masterDetail", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "fluentDark", motion: "subtle" },
    allowed: {
      surface: ["flat", "acrylic", "material"],
      layout: ["landing", "cards", "split", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "humanist"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum"],
      fontMode: ["split", "koUnified"],
      palette: ["fluentDark"],
      motion: ["quiet", "subtle"],
    },
  },
  carbon: {
    defaults: { surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "carbon", motion: "quiet" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["cards", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["carbon", "pureWhite", "mono"],
      motion: ["quiet", "subtle"],
    },
  },
  carbonDark: {
    defaults: { surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "carbonDark", motion: "quiet" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["cards", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "both"],
      type: ["grotesk", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["carbonDark"],
      motion: ["quiet", "subtle"],
    },
  },
  shadcn: {
    defaults: { surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "pureWhite", motion: "subtle" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["landing", "bento", "cards", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["pureWhite", "mono"],
      motion: ["quiet", "subtle"],
    },
  },
  shadcnDark: {
    defaults: { surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "zincDark", motion: "subtle" },
    allowed: {
      surface: ["flat", "material"],
      layout: ["landing", "bento", "cards", "dense", "dashboard", "masterDetail"],
      nav: ["top", "left"],
      navStyle: ["text", "icon", "both"],
      type: ["grotesk", "mono"],
      koType: ["plex", "pretendard", "suit", "noto", "spoqa", "nanum", "coding"],
      fontMode: ["split", "koUnified"],
      palette: ["zincDark"],
      motion: ["quiet", "subtle"],
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
  { id: "bauhaus-function", name: "Bauhaus Function", label: "기하학으로 정리한 기능적 archive", category: "Lineage", selection: { aesthetic: "bauhaus", surface: "flat", layout: "bento", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "bauhaus", motion: "subtle" } },
  { id: "deco-night", name: "Deco Night", label: "대칭과 금빛 선으로 만든 야간 edition", category: "Lineage", selection: { aesthetic: "artDeco", surface: "flat", layout: "poster", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "deco", motion: "quiet" } },
  { id: "nordic-field", name: "Nordic Field", label: "밝은 목재색과 차분한 정보 rhythm", category: "Lineage", selection: { aesthetic: "scandinavian", surface: "paper", layout: "masonry", nav: "top", navStyle: "text", type: "humanist", koType: "suit", fontMode: "koUnified", palette: "nordic", motion: "quiet" } },
  { id: "editorial-luxury", name: "Editorial Noir", label: "절제된 luxury journal", category: "Editorial", selection: { aesthetic: "luxury", surface: "paper", layout: "editorial", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "noir", motion: "quiet" } },
  { id: "y2k-chrome", name: "Y2K Chrome", label: "2000년대의 미래", category: "Retro", selection: { aesthetic: "y2k", surface: "chrome", layout: "poster", nav: "top", navStyle: "both", type: "rounded", koType: "jua", fontMode: "split", palette: "aurora", motion: "kinetic" } },
  { id: "cyber-hud", name: "Cyber Trail", label: "neon expedition index", category: "Futurist", selection: { aesthetic: "cyberpunk", surface: "glass", layout: "dense", nav: "left", navStyle: "both", type: "mono", koType: "coding", fontMode: "split", palette: "aurora", motion: "kinetic" } },
  { id: "material-you", name: "Material 3", label: "tonal color와 rounded component", category: "Design System", selection: { aesthetic: "material3", surface: "material", layout: "cards", nav: "top", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "materialDynamic", motion: "subtle" } },
  { id: "material-night", name: "Material Night", label: "dark tonal role과 부드러운 elevation", category: "Design System", selection: { aesthetic: "material3Dark", surface: "material", layout: "cards", nav: "top", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "materialDark", motion: "subtle" } },
  { id: "fluent-focus", name: "Fluent Focus", label: "layered focus와 adaptive productivity", category: "Design System", selection: { aesthetic: "fluent2", surface: "flat", layout: "masterDetail", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "fluent", motion: "subtle" } },
  { id: "fluent-night", name: "Fluent Night", label: "dark alias token과 밝은 focus layer", category: "Design System", selection: { aesthetic: "fluent2Dark", surface: "flat", layout: "masterDetail", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "fluentDark", motion: "subtle" } },
  { id: "carbon-operations", name: "Carbon Operations", label: "2x Grid 기반의 enterprise dashboard", category: "Design System", selection: { aesthetic: "carbon", surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "carbon", motion: "quiet" } },
  { id: "carbon-night", name: "Carbon Gray 100", label: "Gray 100 기반의 고밀도 operations", category: "Design System", selection: { aesthetic: "carbonDark", surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "plex", fontMode: "split", palette: "carbonDark", motion: "quiet" } },
  { id: "shadcn-neutral", name: "shadcn/ui Neutral", label: "white canvas와 composable dashboard", category: "Design System", selection: { aesthetic: "shadcn", surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "pureWhite", motion: "subtle" } },
  { id: "shadcn-night", name: "shadcn/ui Dark", label: "zinc dark와 compact component rhythm", category: "Design System", selection: { aesthetic: "shadcnDark", surface: "flat", layout: "dashboard", nav: "left", navStyle: "both", type: "grotesk", koType: "pretendard", fontMode: "split", palette: "zincDark", motion: "subtle" } },
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
  { id: "skeuo-utility", name: "Skeuo Utility", label: "촉각적 control로 되살린 desktop tool", category: "Retro", selection: { aesthetic: "y2k", surface: "skeuo", layout: "dashboard", nav: "left", navStyle: "both", type: "rounded", koType: "jua", fontMode: "split", palette: "aqua", motion: "subtle" } },
  { id: "eink-fieldbook", name: "E-ink Fieldbook", label: "저채도 digital paper로 읽는 현장 기록", category: "Editorial", selection: { aesthetic: "editorial", surface: "eink", layout: "masterDetail", nav: "top", navStyle: "text", type: "serif", koType: "gowun", fontMode: "split", palette: "mono", motion: "quiet" } },
];

const optionNotesEn: Record<AxisKey, Record<string, string>> = {
  aesthetic: {
    minimal: "Restrained elements and generous whitespace",
    swiss: "Objective type, grids, and visual order",
    bauhaus: "Functional geometry with primary colors",
    artDeco: "Symmetry, stepped geometry, and restrained ornament",
    scandinavian: "Warm functionalism with pale natural color",
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
    material3: "Google's tonal color, shape, and elevation system",
    material3Dark: "Material 3 dark color roles and tonal elevation",
    fluent2: "Microsoft's focused, layered, adaptive interface system",
    fluent2Dark: "Fluent 2 dark alias tokens with layered focus",
    carbon: "IBM's 2x Grid and enterprise data density",
    carbonDark: "Carbon Gray 100 theme with dense enterprise data UI",
    shadcn: "Open Code, neutral tokens, and composable component defaults",
    shadcnDark: "Neutral dark tokens with a compact component rhythm",
  },
  surface: {
    flat: "Clear planes without dimensional effects",
    skeuo: "Tactile controls modeled after physical materials",
    glass: "Blurred translucent glass",
    acrylic: "A frosted material with visible color and blur",
    neumo: "Soft embossed surfaces",
    clay: "Rounded, inflated 3D forms",
    material: "Paper-like layers and elevation",
    liquid: "Refractive fluid glass",
    chrome: "Reflective metallic surfaces",
    paper: "Tactile print-inspired texture",
    eink: "Low-chroma, high-contrast digital paper",
    glossy: "Gel controls and specular highlights",
  },
  layout: {
    landing: "A guided flow from hero to CTA",
    bento: "Mixed-size modules in one grid",
    cards: "Independent, equally weighted modules",
    masonry: "Variable-height modules packed into columns",
    editorial: "Headline-led long-form reading rhythm",
    split: "Two strong and balanced page regions",
    dense: "Tight spacing and high information density",
    dashboard: "Concentrated KPIs, charts, and controls",
    masterDetail: "A list and selected detail shown together",
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
    pureWhite: "White surfaces with near-black typography",
    primary: "Red, blue, and yellow",
    citrus: "Lime, tangerine, and yellow",
    candy: "Pink, lavender, and cyan",
    forest: "Moss, leaf, and warm earth",
    sunset: "Coral, orange, and purple",
    noir: "Black, ivory, and restrained gold",
    aurora: "Cyan, violet, and luminous green",
    aqua: "Sky, water, and clean green",
    bentoPastel: "Deep navy with cobalt, coral, and mint pastels",
    bauhaus: "Black and white with red, blue, and yellow",
    deco: "Midnight, ivory, and champagne gold",
    nordic: "Birch, fog, sage, and muted blue",
    materialDynamic: "Primary, secondary, and tertiary tonal roles",
    materialDark: "Dark surfaces with bright tonal color roles",
    fluent: "Microsoft blue with cool neutrals",
    fluentDark: "Dark neutral aliases with a brighter brand blue",
    carbon: "IBM blue across the Grey 10–100 range",
    carbonDark: "Gray 100 surfaces with accessible IBM blue",
    zincDark: "Near-black zinc with high-contrast neutrals",
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

export function combinationCount(
  activeAxes: readonly AxisKey[] = axisKeys,
  fixedValues: Partial<Selection> = {},
) {
  const countedAxes = dependentAxisKeys.filter((axis) => activeAxes.includes(axis));
  return axes.aesthetic.reduce((total, aesthetic) => {
    if (fixedValues.aesthetic && fixedValues.aesthetic !== aesthetic.id) return total;
    const rule = getAestheticRule(aesthetic.id);
    const fixedValueIsInvalid = dependentAxisKeys.some((axis) => {
      const value = fixedValues[axis];
      return value !== undefined && !rule.allowed[axis].includes(value);
    });
    if (fixedValueIsInvalid) return total;
    return total + countedAxes.reduce(
      (count, axis) => count * (fixedValues[axis] === undefined ? rule.allowed[axis].length : 1),
      1,
    );
  }, 0);
}
