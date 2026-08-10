import type { Language, Selection } from "./style-data.ts";
import type { KoreanCopyMode } from "./url-state.ts";

export type FontResource = {
  family: string;
  stylesheet?: string;
  source: string;
  license: string;
  role: string;
};

export const latinFontResources: Record<string, FontResource> = {
  grotesk: { family: "Inter", stylesheet: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", source: "https://rsms.me/inter/", license: "SIL Open Font License 1.1", role: "Neutral neo-grotesk UI" },
  humanist: { family: "Source Sans 3", stylesheet: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800&display=swap", source: "https://github.com/adobe-fonts/source-sans", license: "SIL Open Font License 1.1", role: "Humanist interface and reading text" },
  serif: { family: "Source Serif 4", stylesheet: "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap", source: "https://github.com/adobe-fonts/source-serif", license: "SIL Open Font License 1.1", role: "Optical-size editorial serif" },
  mono: { family: "JetBrains Mono", stylesheet: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap", source: "https://www.jetbrains.com/lp/mono/", license: "SIL Open Font License 1.1", role: "Technical monospace" },
  rounded: { family: "Nunito", stylesheet: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap", source: "https://github.com/googlefonts/nunito", license: "SIL Open Font License 1.1", role: "Rounded friendly sans" },
  condensed: { family: "Barlow Condensed", stylesheet: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&display=swap", source: "https://github.com/jpt/barlow", license: "SIL Open Font License 1.1", role: "Condensed display sans" },
  slab: { family: "Roboto Slab", stylesheet: "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&display=swap", source: "https://github.com/googlefonts/robotoslab", license: "Apache License 2.0", role: "Contemporary slab serif" },
  pixel: { family: "Pixelify Sans", stylesheet: "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap", source: "https://github.com/eifetx/Pixelify-Sans", license: "SIL Open Font License 1.1", role: "Pixel display face" },
  accessible: { family: "Atkinson Hyperlegible Next", stylesheet: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;500;600;700;800&display=swap", source: "https://www.brailleinstitute.org/freefont/", license: "SIL Open Font License 1.1", role: "Low-vision legibility" },
  recursive: { family: "Recursive", stylesheet: "https://fonts.googleapis.com/css2?family=Recursive:CASL,CRSV,MONO,slnt,wght@0..1,0..1,0..1,-15..0,300..1000&display=swap", source: "https://www.recursive.design/", license: "SIL Open Font License 1.1", role: "Variable-axis display and code typography" },
};

export const koreanFontResources: Record<string, FontResource> = {
  plex: { family: "IBM Plex Sans KR", stylesheet: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap", source: "https://github.com/IBM/plex", license: "SIL Open Font License 1.1", role: "Structured Korean grotesk" },
  pretendard: { family: "Pretendard Variable", stylesheet: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css", source: "https://github.com/orioncactus/pretendard", license: "SIL Open Font License 1.1", role: "Korean system-UI replacement" },
  suit: { family: "SUIT Variable", stylesheet: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css", source: "https://github.com/sun-typeface/SUIT", license: "SIL Open Font License 1.1", role: "Korean interface text" },
  noto: { family: "Noto Sans KR", stylesheet: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap", source: "https://notofonts.github.io/noto-docs/", license: "SIL Open Font License 1.1", role: "Broad Korean glyph coverage" },
  spoqa: { family: "Spoqa Han Sans Neo", stylesheet: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css", source: "https://github.com/spoqa/spoqa-han-sans", license: "SIL Open Font License 1.1", role: "Numeral-rich Korean product UI" },
  nanum: { family: "Nanum Gothic", stylesheet: "https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap", source: "https://hangeul.naver.com/font", license: "SIL Open Font License 1.1", role: "Familiar Korean web body" },
  gowun: { family: "Gowun Dodum", stylesheet: "https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap", source: "https://github.com/yangheeryu/Gowun-Dodum", license: "SIL Open Font License 1.1", role: "Soft Korean reading face" },
  jua: { family: "Jua", stylesheet: "https://fonts.googleapis.com/css2?family=Jua&display=swap", source: "https://fonts.google.com/specimen/Jua", license: "SIL Open Font License 1.1", role: "Rounded Korean display" },
  coding: { family: "Nanum Gothic Coding", stylesheet: "https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap", source: "https://github.com/naver/nanumfont", license: "SIL Open Font License 1.1", role: "Legacy Korean coding face" },
  blackhan: { family: "Black Han Sans", stylesheet: "https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap", source: "https://github.com/zesstype/Black-Han-Sans", license: "SIL Open Font License 1.1", role: "Compressed Korean display" },
  wanted: { family: "Wanted Sans Variable", stylesheet: "https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.css", source: "https://github.com/wanteddev/wanted-sans", license: "SIL Open Font License 1.1", role: "Contemporary Korean product UI" },
  lineSeed: { family: "LINE Seed Sans KR", source: "https://seed.line.me/index_kr.html", license: "SIL Open Font License 1.1", role: "Friendly Korean screen sans" },
  nanumSquare: { family: "NanumSquare Neo", source: "https://hangeul.naver.com/font", license: "SIL Open Font License 1.1", role: "Geometric Korean UI and display" },
  d2: { family: "D2Coding", source: "https://github.com/naver/d2codingfont", license: "SIL Open Font License 1.1", role: "Korean development monospace" },
  koddi: { family: "KoddiUD OnGothic Regular", stylesheet: "https://fontsapi.zeoseven.com/584/main/result.css", source: "https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13371556", license: "Korea Open Government License Type 1", role: "Universal-design Korean sans" },
  kakaoPair: { family: "Kakao Small Sans", source: "https://github.com/kakao/kakao-font", license: "SIL Open Font License 1.1", role: "Kakao Small Sans body with Kakao Big Sans display" },
};

const aestheticStylesheets: Record<string, string[]> = {
  material3: ["https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"],
  material3Dark: ["https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"],
  mui: ["https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"],
  muiDark: ["https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"],
  carbon: ["https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"],
  carbonDark: ["https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"],
  nebular: ["https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"],
  nebularDark: ["https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"],
};

export function getFontStylesheets(
  selection: Selection,
  language: Language,
  copyMode: KoreanCopyMode,
) {
  const resources: Array<FontResource | undefined> = [];
  if (language === "en") {
    resources.push(latinFontResources[selection.type]);
  } else {
    resources.push(koreanFontResources[selection.koType]);
    if (copyMode === "mixed" && selection.fontMode === "split") {
      resources.push(latinFontResources[selection.type]);
    }
  }

  return [...new Set([
    ...resources.flatMap((resource) => resource?.stylesheet ?? []),
    ...(aestheticStylesheets[selection.aesthetic] ?? []),
  ])];
}

export function getRequiredFontFamilies(
  selection: Selection,
  language: Language,
  copyMode: KoreanCopyMode,
) {
  const families = new Set<string>();
  const latinFamily = latinFontResources[selection.type]?.family;
  const koreanFamily = koreanFontResources[selection.koType]?.family;
  if (language === "en" && latinFamily) families.add(latinFamily);
  if (language === "ko") {
    if (koreanFamily) families.add(koreanFamily);
    if (selection.koType === "kakaoPair") families.add("Kakao Big Sans");
    if (copyMode === "mixed" && selection.fontMode === "split" && latinFamily) families.add(latinFamily);
  }
  return [...families];
}
