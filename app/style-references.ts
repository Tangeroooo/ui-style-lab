import type { AxisKey } from "./style-data";

export type EvidenceKind =
  | "official-system"
  | "institutional-history"
  | "documented-pattern"
  | "community-term";

export type StyleEvidence = {
  kind: EvidenceKind;
  source: string;
  url: string;
  claim: string;
  checkedAt: string;
};

const checkedAt = "2026-08-25";

function evidence(
  kind: EvidenceKind,
  source: string,
  url: string,
  claim: string,
): StyleEvidence {
  return { kind, source, url, claim, checkedAt };
}

const aesthetic: Record<string, StyleEvidence> = {
  minimal: evidence("documented-pattern", "Nielsen Norman Group · Visual hierarchy", "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/", "Restraint, hierarchy, and whitespace—not a surface effect."),
  swiss: evidence("institutional-history", "MoMA · International Typographic Style", "https://www.moma.org/collection/terms/international-typographic-style", "Grid-led, objective typography and asymmetric order."),
  bauhaus: evidence("institutional-history", "MoMA · Bauhaus", "https://www.moma.org/artists/716", "Functional geometry and reduction of applied ornament."),
  artDeco: evidence("institutional-history", "V&A · Art Deco", "https://www.vam.ac.uk/articles/an-introduction-to-art-deco", "Symmetry, geometry, luxury materials, and ornament."),
  scandinavian: evidence("institutional-history", "Encyclopaedia Britannica · Scandinavian design", "https://www.britannica.com/art/Scandinavian-design", "Functional clarity, lightness, and natural materials."),
  brutalist: evidence("community-term", "Brutalist Websites · Guidelines", "https://brutalistwebsites.com/", "The lab implements the contemporary neo-brutalist border and offset-shadow branch."),
  editorial: evidence("documented-pattern", "Nielsen Norman Group · Typography terms", "https://www.nngroup.com/articles/typography-terms-ux/", "Reading hierarchy, columns, captions, and pull quotes."),
  memphis: evidence("institutional-history", "V&A · Memphis Group", "https://www.vam.ac.uk/articles/memphis-design", "Playful geometry, pattern, and high-chroma color."),
  y2k: evidence("documented-pattern", "Web Design Museum · Y2K", "https://www.webdesignmuseum.org/exhibitions/y2k-aesthetic-in-web-design", "Period web references for chrome, translucency, and techno optimism."),
  cyberpunk: evidence("community-term", "CARI · Cyberpunk", "https://cari.institute/aesthetics/cyberpunk", "A retrospective visual category; treated as an aesthetic rather than a formal design system."),
  frutiger: evidence("community-term", "CARI · Frutiger Aero", "https://cari.institute/aesthetics/frutiger-aero", "A retrospective name for glossy nature-and-technology optimism."),
  terminal: evidence("documented-pattern", "IBM Carbon · Code", "https://carbondesignsystem.com/components/code/usage/", "Monospaced, text-first command and code presentation."),
  retroGui: evidence("official-system", "Microsoft Learn · Border Style", "https://learn.microsoft.com/en-us/previous-versions/windows/desktop/bb226804(v=vs.85)", "Classic desktop controls distinguish raised and pressed states through reversed highlight and shadow borders."),
  pixelUi: evidence("institutional-history", "Whitney Museum · Histories of the Digital Now", "https://whitney.org/essays/histories-of-the-digital-now", "Bitmapped displays expose pixels as addressable visual units; this implementation makes that constrained grid an explicit full-page grammar."),
  retroFuture: evidence("institutional-history", "Smithsonian Magazine · Googie: Architecture of the Space Age", "https://www.smithsonianmag.com/history/googie-architecture-of-the-space-age-122837470/", "Postwar space-age futurism uses dramatic angles, plastic and steel, neon, and optimistic technological imagery."),
  luxury: evidence("documented-pattern", "Nielsen Norman Group · Visual hierarchy", "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/", "A curated combination of sparse hierarchy, display type, and restrained metallic accent."),
  organic: evidence("documented-pattern", "Terrapin · 14 Patterns of Biophilic Design", "https://www.terrapinbrightgreen.com/reports/14-patterns/", "Natural color, biomorphic form, and biophilic visual references."),
  vaporwave: evidence("community-term", "CARI · Vaporwave", "https://cari.institute/aesthetics/vaporwave", "A retrospective internet aesthetic, not an interface standard."),
  atlassian: evidence("official-system", "Atlassian Design System · Foundations", "https://atlassian.design/foundations", "Semantic tokens, accessible states, and product workflow conventions."),
  atlassianDark: evidence("official-system", "Atlassian Design System · Color", "https://atlassian.design/foundations/color", "Official dark semantic token roles."),
  primer: evidence("official-system", "Primer · Foundations", "https://primer.style/product/getting-started/foundations/", "GitHub product foundations, density, and semantic color roles."),
  primerDark: evidence("official-system", "Primer · Color modes", "https://primer.style/product/primitives/color/", "Primer dark color primitives and semantic roles."),
  sapHorizon: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Morning Horizon is a distinct SAP visual theme."),
  sapHorizonDark: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Evening Horizon is the official dark Horizon theme."),
  sapHorizonHcb: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Horizon High Contrast Black is a separate accessibility theme."),
  sapHorizonHcw: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Horizon High Contrast White is a separate accessibility theme."),
  sapQuartz: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Quartz Light maps to the sap_fiori_3 theme."),
  sapQuartzDark: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Quartz Dark maps to sap_fiori_3_dark."),
  sapQuartzHcb: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Quartz High Contrast Black is a separate accessibility theme."),
  sapQuartzHcw: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Quartz High Contrast White is a separate accessibility theme."),
  sapBelize: evidence("official-system", "SAP Fundamental Styles · Themes", "https://github.com/SAP/fundamental-styles#-theming", "Belize is retained as the documented legacy theme."),
  material3: evidence("official-system", "Google · Material Design 3", "https://m3.material.io/", "Google's current tonal color, shape, component, elevation, and motion system."),
  material3Dark: evidence("official-system", "Android Developers · Material 3", "https://developer.android.com/develop/ui/compose/designsystems/material3", "Material 3 dark roles use the same system with dark color and tonal elevation."),
  mui: evidence("official-system", "MUI · Material UI", "https://mui.com/material-ui/", "The MUI React component library currently implements Material Design 2."),
  muiDark: evidence("official-system", "MUI · Dark mode", "https://mui.com/material-ui/customization/dark-mode/", "MUI's documented dark palette and paper defaults."),
  fluent2: evidence("official-system", "Microsoft · Fluent 2", "https://fluent2.microsoft.design/", "Microsoft's tokenized, adaptive interface system."),
  fluent2Dark: evidence("official-system", "Microsoft · Fluent 2 color", "https://fluent2.microsoft.design/color", "Fluent dark alias tokens and accessible foreground roles."),
  carbon: evidence("official-system", "IBM · Carbon Design System", "https://carbondesignsystem.com/", "IBM's 2x Grid, data density, typography, and component conventions."),
  carbonDark: evidence("official-system", "IBM Carbon · Themes", "https://carbondesignsystem.com/elements/themes/overview/", "Gray 100 is an official Carbon theme."),
  shadcn: evidence("official-system", "shadcn/ui · Theming", "https://ui.shadcn.com/docs/theming", "Open-code component defaults using semantic CSS variables."),
  shadcnDark: evidence("official-system", "shadcn/ui · Dark mode", "https://ui.shadcn.com/docs/dark-mode", "Documented dark semantic token mode."),
  zag: evidence("official-system", "Zag · Introduction", "https://zagjs.com/overview/introduction", "The core is headless and unstyled; this option explicitly models only the docs showcase."),
  tamagui: evidence("official-system", "Tamagui · Theme", "https://tamagui.dev/docs/core/theme", "Cross-platform token scales and nested themes."),
  tamaguiDark: evidence("official-system", "Tamagui · Theme", "https://tamagui.dev/docs/core/theme", "A documented nested dark theme branch."),
  nebular: evidence("official-system", "Nebular · Eva theme", "https://akveo.github.io/nebular/docs/design-system/design-system-theme/", "Eva semantic color and component theme roles."),
  nebularDark: evidence("official-system", "Nebular · Eva theme", "https://akveo.github.io/nebular/docs/design-system/design-system-theme/", "Eva dark basic colors with semantic states."),
};

const surface: Record<string, StyleEvidence> = {
  flat: evidence("official-system", "Microsoft Design · Flat principles", "https://learn.microsoft.com/en-us/windows/apps/design/", "No simulated depth; hierarchy is carried by color, type, and spacing."),
  skeuo: evidence("documented-pattern", "Figma · Skeuomorphism", "https://www.figma.com/resource-library/what-is-skeuomorphism/", "Physical visual and functional cues, not merely gradients."),
  glass: evidence("documented-pattern", "Interaction Design Foundation · Glassmorphism", "https://www.interaction-design.org/literature/topics/glassmorphism", "Translucent panels, backdrop blur, light borders, and visible background context."),
  acrylic: evidence("official-system", "Microsoft Fluent 2 · Material", "https://fluent2.microsoft.design/material", "A transient frosted material with backdrop sampling and luminosity."),
  neumo: evidence("documented-pattern", "Interaction Design Foundation · Neumorphism", "https://www.interaction-design.org/literature/topics/neumorphism", "Low-contrast extrusion using paired light and dark shadows."),
  clay: evidence("community-term", "Claymorphism", "https://claymorphism.com/", "A community-defined inflated, rounded 3D surface style."),
  material: evidence("documented-pattern", "Material Design · Elevation", "https://m3.material.io/styles/elevation/overview", "Generic elevated paper is kept separate from the Google Material aesthetic."),
  chrome: evidence("documented-pattern", "Web Design Museum · Y2K", "https://www.webdesignmuseum.org/exhibitions/y2k-aesthetic-in-web-design", "Specular metallic bands and reflective chrome are period surface references."),
  paper: evidence("documented-pattern", "MDN · CSS backgrounds", "https://developer.mozilla.org/en-US/docs/Web/CSS/background", "A tactile print simulation implemented with directional fiber, not a global dot grid."),
  eink: evidence("official-system", "W3C · Reduced motion", "https://www.w3.org/WAI/WCAG22/Techniques/css/C39", "Low-chroma paper presentation with quiet motion and explicit contrast."),
  glossy: evidence("documented-pattern", "Web Design Museum · Web 2.0", "https://www.webdesignmuseum.org/exhibitions/web-design-in-the-2000s", "Rounded gel controls, gradients, and strong specular highlights."),
};

const materialCanonical = evidence("official-system", "Material Design 3 · Canonical layouts", "https://m3.material.io/foundations/layout/canonical-examples/overview", "A documented adaptive page-level layout pattern.");
const layout: Record<string, StyleEvidence> = {
  landing: evidence("documented-pattern", "Nielsen Norman Group · Scrolling and attention", "https://www.nngroup.com/articles/scrolling-and-attention/", "A guided long-scroll narrative from value proposition to action."),
  bento: evidence("documented-pattern", "Web Design Museum · Bento Grid", "https://www.webdesignmuseum.org/styles/bento-grid", "Mixed-size rectangular modules; a layout, not a governing aesthetic."),
  cards: evidence("official-system", "Material Design · Cards", "https://m3.material.io/components/cards/overview", "Independent grouped containers with clear boundaries."),
  masonry: evidence("documented-pattern", "MDN · Masonry layout", "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout", "Variable-height items fill vertical gaps; the lab uses a column fallback because native masonry is not Baseline."),
  editorial: evidence("documented-pattern", "Nielsen Norman Group · Typography", "https://www.nngroup.com/articles/typography-terms-ux/", "Headline, body, captions, columns, and reading measure establish the grid."),
  split: evidence("documented-pattern", "MDN · CSS Grid layout", "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout", "Two simultaneous, balanced grid regions with distinct roles."),
  dense: evidence("official-system", "IBM Carbon · 2x Grid", "https://carbondesignsystem.com/elements/2x-grid/overview/", "Compact spacing and explicit alignment increase information density."),
  dashboard: evidence("official-system", "IBM Carbon · Data visualization", "https://carbondesignsystem.com/data-visualization/getting-started/", "KPIs, filters, charts, and status tables form a task-oriented data workspace."),
  masterDetail: materialCanonical,
  poster: evidence("documented-pattern", "Web Design Museum · Brutalism", "https://www.webdesignmuseum.org/styles/brutalism", "Broken-grid overlap and asymmetric visual hierarchy."),
  feed: materialCanonical,
  supportingPane: materialCanonical,
  table: evidence("official-system", "IBM Carbon · Data table", "https://carbondesignsystem.com/components/data-table/usage/", "Semantic rows and columns for comparison, sorting, and scanning."),
  wizard: evidence("official-system", "IBM Carbon · Progress indicator", "https://carbondesignsystem.com/components/progress-indicator/usage/", "A sequential task with explicit current, completed, and upcoming steps."),
};

export const styleEvidenceRegistries: Partial<Record<AxisKey, Record<string, StyleEvidence>>> = {
  aesthetic,
  surface,
  layout,
};

export function getStyleEvidence(axis: AxisKey, id: string) {
  return styleEvidenceRegistries[axis]?.[id];
}

export function hasStyleEvidence(axis: AxisKey, id: string) {
  return Boolean(getStyleEvidence(axis, id));
}
