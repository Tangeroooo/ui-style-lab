import { useEffect, useRef, useState } from "react";
import type { Selection } from "../style-data";
import { serializeExperienceQuery } from "../url-state";

/** Mount only nearby previews; every thumbnail uses the real page renderer. */
export function LivePresetPreview({ selection }: { selection: Selection }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(.25);
  useEffect(() => {
    if (!host.current) return;
    const element = host.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1000));
    observer.observe(element); resize.observe(element);
    return () => { observer.disconnect(); resize.disconnect(); };
  }, []);
  const src = `?${serializeExperienceQuery({ selection, language: "en", copyMode: "mixed", view: "reference", section: "page", component: "button", capture: true, strict: true })}&thumbnail=1`;
  return <div className="preset-live" ref={host} aria-hidden="true" inert>{visible && <iframe title="Page preview" src={src} tabIndex={-1} loading="lazy" style={{ transform: `scale(${scale})` }} />}<span className="preset-live-label">PAGE PREVIEW</span></div>;
}
