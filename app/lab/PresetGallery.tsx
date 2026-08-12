import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import {
  axisKeys,
  getOption,
  presets,
  type Language,
  type Selection,
} from "../style-data";
import { labCopy, presetLabelsEn } from "./lab-copy";

const pageSize = 12;

type PresetGalleryProps = {
  language: Language;
  onChoosePreset: (selection: Selection) => void;
};

export function PresetGallery({ language, onChoosePreset }: PresetGalleryProps) {
  const t = labCopy[language];
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase(language === "ko" ? "ko" : "en"));
  const filters = useMemo(
    () => ["All", ...Array.from(new Set(presets.map((preset) => preset.category)))],
    [],
  );

  const matches = useMemo(() => presets.filter((preset) => {
    if (filter !== "All" && preset.category !== filter) return false;
    if (!deferredQuery) return true;
    const optionNames = axisKeys.flatMap((axis) => {
      const option = getOption(axis, preset.selection[axis]);
      return [option.en, option.ko];
    });
    return [
      preset.name,
      preset.label,
      preset.category,
      presetLabelsEn[preset.id],
      ...optionNames,
    ].join(" ").toLocaleLowerCase(language === "ko" ? "ko" : "en").includes(deferredQuery);
  }), [deferredQuery, filter, language]);

  const visiblePresets = matches.slice(0, visibleCount);

  return (
    <section className="preset-section" id="presets">
      <header>
        <div><span>{t.presetKicker} · {presets.length}</span><h2>{t.presetTitle[0]}<br />{t.presetTitle[1]}</h2></div>
        <p>{t.presetIntro}</p>
      </header>
      <div className="preset-tools">
        <label className="preset-search">
          <span className="sr-only">{t.searchPresets}</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize); }}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPresets}
          />
        </label>
        <div className="preset-filters" aria-label={t.filters}>
          {filters.map((category) => (
            <button
              className={filter === category ? "active" : ""}
              type="button"
              key={category}
              onClick={() => { setFilter(category); setVisibleCount(pageSize); }}
              aria-pressed={filter === category}
            >
              {category === "All" ? t.all : category}
            </button>
          ))}
        </div>
      </div>
      <p className="preset-result-count" aria-live="polite">{t.showing(visiblePresets.length, matches.length)}</p>
      {visiblePresets.length > 0 ? (
        <div className="preset-grid">
          {visiblePresets.map((preset, index) => (
            <button className="preset-card" type="button" key={preset.id} onClick={() => onChoosePreset(preset.selection)}>
              <div className="preset-mini" data-aesthetic={preset.selection.aesthetic} data-surface={preset.selection.surface} data-layout={preset.selection.layout} data-palette={preset.selection.palette}>
                <span className="mini-nav"><i /><b /><b /></span><span className="mini-hero"><strong /><em /></span><span className="mini-grid"><i /><i /><i /></span>
              </div>
              <div className="preset-copy"><span>{(index + 1).toString().padStart(2, "0")} · {preset.category}</span><h3>{preset.name}</h3><p>{language === "en" ? presetLabelsEn[preset.id] : preset.label}</p></div>
              <span className="preset-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </button>
          ))}
        </div>
      ) : <p className="preset-empty">{t.noPresets}</p>}
      {visiblePresets.length < matches.length && (
        <button className="preset-more" type="button" onClick={() => setVisibleCount((count) => count + pageSize)}>
          {t.showMore}<span>{matches.length - visiblePresets.length}</span>
        </button>
      )}
    </section>
  );
}
