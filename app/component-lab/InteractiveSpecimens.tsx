import { useId, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Folder, FileUp, X, MoreHorizontal } from "lucide-react";
import type { ComponentId, ComponentState } from "./component-data";
import { routes } from "../canvas/field-data";
import type { Language } from "../style-data";

/** Stateful examples stay inside their specimen; they never navigate to unrelated lab sections. */
export function InteractiveSpecimen({ id, language, state }: { id: ComponentId; language: Language; state: ComponentState }) {
  const ko = language === "ko";
  const disabled = state === "disabled";
  const uid = useId();
  const [index, setIndex] = useState(state === "selected" ? 1 : 0);
  const [open, setOpen] = useState(id !== "split-button");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [month, setMonth] = useState(8);
  const [day, setDay] = useState(3);
  const [checked, setChecked] = useState(true);
  const result = <p className="specimen-live-message" role="status">{notice}</p>;
  if (id === "table") {
    const data = [...routes.slice(0, 2)].sort((a,b) => checked ? a.km-b.km : b.km-a.km);
    return <div className="specimen-table-wrap"><table><caption>{ko ? "최근 경로 · 선택과 거리 정렬" : "Recent routes · Select and sort by distance"}</caption><thead><tr><th scope="col">{ko ? "경로" : "Route"}</th><th scope="col">{ko ? "상태" : "Status"}</th><th scope="col" aria-sort={checked ? "ascending" : "descending"}><button type="button" onClick={()=>setChecked(!checked)}>{ko ? "거리" : "Distance"} <ChevronDown aria-hidden="true" style={{ width:12, height:12, transform:checked ? "rotate(180deg)" : undefined }} /></button></th></tr></thead><tbody>{data.map((route,i)=><tr key={route.id} aria-selected={index === i}><th scope="row"><button type="button" onClick={()=>{setIndex(i);setNotice(route[language]);}}>{route[language]}</button></th><td>{ko ? "공개" : "Published"}</td><td>{route.km} km</td></tr>)}</tbody></table>{result}</div>;
  }
  if (id === "tabs") {
    const labels = ko ? ["개요", "기록", "활동"] : ["Overview", "Notes", "Activity"];
    const body = ko ? ["동쪽 능선 · 제주 · 8.4 km", "바람이 잔잔했던 능선에서 남긴 현장 기록입니다.", "오늘 경로를 검토했습니다. 어제 안내서를 추가했습니다."] : ["Eastern ridge · Jeju · 8.4 km", "Field notes from a quiet morning on the ridge.", "Route reviewed today. Field guide added yesterday."];
    return <div><div className="specimen-tabs" role="tablist" aria-label={ko ? "콘텐츠 보기" : "Content views"}>{labels.map((label, i) => <button key={label} id={`${uid}-tab-${i}`} type="button" role="tab" disabled={disabled} aria-selected={index === i} aria-controls={`${uid}-panel`} tabIndex={index === i ? 0 : -1} onClick={() => setIndex(i)} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (i + (event.key === "ArrowRight" ? 1 : 2)) % 3; setIndex(next); document.getElementById(`${uid}-tab-${next}`)?.focus(); }}>{label}</button>)}</div><div className="specimen-destination" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${index}`}>{body[index]}</div></div>;
  }
  if (id === "pagination") return <div><nav className="specimen-pagination" aria-label={ko ? "페이지 이동" : "Pagination"}><button type="button" disabled={disabled || index === 0} onClick={() => setIndex(index - 1)}>{ko ? "이전" : "Previous"}</button>{[0, 1, 2].map(i => <button key={i} type="button" disabled={disabled} aria-current={index === i ? "page" : undefined} onClick={() => setIndex(i)}>{i + 1}</button>)}<button type="button" disabled={disabled || index === 2} onClick={() => setIndex(index + 1)}>{ko ? "다음" : "Next"}</button></nav><p className="specimen-destination" role="status">{ko ? `${index * 2 + 1}–${index * 2 + 2}번 경로 · 전체 6개` : `Routes ${index * 2 + 1}–${index * 2 + 2} of 6`}</p></div>;
  if (id === "navigation-menu" || id === "sidebar-menu" || id === "breadcrumb") {
    const labels = ko ? ["개요", "경로", "팀"] : ["Overview", "Routes", "Team"];
    const body = ko ? ["현장 기록 · 6개 경로", "동쪽 능선 · 현무암 해안", "Mina · Alex · 편집 팀"] : ["Field Notes · 6 routes", "Eastern ridge · Basalt coast", "Mina · Alex · Editorial team"];
    return <div><nav className={id === "sidebar-menu" ? "specimen-sidebar" : "specimen-navigation"} aria-label={ko ? "예시 화면 탐색" : "Sample navigation"}>{labels.map((label, i) => <a key={label} href={`#${uid}-destination`} aria-current={index === i ? "page" : undefined} onClick={event => { event.preventDefault(); setIndex(i); }}>{label}</a>)}</nav><section id={`${uid}-destination`} className="specimen-destination" aria-live="polite"><b>{labels[index]}</b><p>{body[index]}</p></section></div>;
  }
  if (id === "combobox") {
    const choices = ko ? ["성산 · 동쪽", "애월 · 서쪽"] : ["Seongsan · East", "Aewol · West"];
    const filtered = choices.filter(value => value.toLowerCase().includes(query.toLowerCase()));
    return <div className="specimen-combobox"><label htmlFor={`${uid}-input`}>{ko ? "지역 찾기" : "Find a region"}</label><div><input id={`${uid}-input`} role="combobox" disabled={disabled} value={query} aria-autocomplete="list" aria-expanded={open && !disabled} aria-controls={`${uid}-options`} onFocus={() => setOpen(true)} onChange={event => {setQuery(event.target.value);setOpen(true);}} onKeyDown={event => { if(event.key === "Escape") setOpen(false); if(event.key === "ArrowDown") {event.preventDefault();setOpen(true);requestAnimationFrame(() => document.getElementById(`${uid}-option-0`)?.focus());} if(event.key === "Enter" && filtered[0]) {setQuery(filtered[0]);setOpen(false);} }} placeholder={ko ? "지역 입력" : "Type a region"}/><ChevronDown aria-hidden="true" /></div><ul id={`${uid}-options`} role="listbox" hidden={!open || disabled} aria-label={ko ? "추천 지역" : "Suggested regions"}>{filtered.map((value,i) => <li key={value} role="presentation"><button id={`${uid}-option-${i}`} type="button" role="option" aria-selected={query === value} onClick={() => {setQuery(value);setOpen(false);document.getElementById(`${uid}-input`)?.focus();setOpen(false);}}>{value}</button></li>)}</ul></div>;
  }
  if (id === "calendar") {
    const date = new Date(Date.UTC(2026, month, 1));
    const days = new Date(Date.UTC(2026, month + 1, 0)).getUTCDate();
    const label = new Intl.DateTimeFormat(ko ? "ko-KR" : "en-US", {month:"long",year:"numeric",timeZone:"UTC"}).format(date);
    return <div className="specimen-calendar"><header><button type="button" disabled={disabled} aria-label={ko ? "이전 달" : "Previous month"} onClick={() => {setMonth(month-1);setDay(1);}}><ChevronLeft aria-hidden="true" /></button><b>{label}</b><button type="button" disabled={disabled} aria-label={ko ? "다음 달" : "Next month"} onClick={() => {setMonth(month+1);setDay(1);}}><ChevronRight aria-hidden="true" /></button></header><div className="week" aria-hidden="true">{(ko ? ["일","월","화","수","목","금","토"] : ["Su","Mo","Tu","We","Th","Fr","Sa"]).map(v => <span key={v}>{v}</span>)}</div><div className="days">{Array.from({length:date.getUTCDay()},(_,i)=><span key={`space-${i}`} />)}{Array.from({length:days},(_,i)=>i+1).map(d=><button key={d} type="button" disabled={disabled} aria-pressed={day === d} aria-label={`${label} ${d}`} onClick={()=>setDay(d)}>{d}</button>)}</div><p role="status">{label} · {day}</p></div>;
  }
  if (id === "tree-view") return <div><div className="specimen-tree" role="tree" aria-label={ko ? "경로 파일" : "Route files"}><button type="button" role="treeitem" aria-expanded={open} aria-selected="false" onClick={() => setOpen(!open)}><ChevronDown aria-hidden="true" /><Folder aria-hidden="true" />Jeju atlas</button>{open && <div role="group">{["Eastern ridge.gpx", "Basalt coast.gpx"].map((label,i)=><button type="button" key={label} role="treeitem" aria-selected={index === i} onClick={()=>{setIndex(i);setNotice(`${label} · GPX`);}}><FileUp aria-hidden="true" />{label}</button>)}</div>}</div>{result}</div>;
  if (id === "drawer") return <div className="specimen-drawer-stage"><div><button type="button" onClick={()=>setOpen(!open)} aria-expanded={open}>{ko ? "필터 열기" : "Open filters"}</button></div>{open && <aside aria-label={ko ? "필터" : "Filters"}><header><b>{ko ? "필터" : "Filters"}</b><button type="button" aria-label={ko ? "닫기" : "Close"} onClick={()=>setOpen(false)}><X aria-hidden="true" /></button></header><label><input type="checkbox" checked={checked} onChange={event=>setChecked(event.target.checked)}/>{ko ? "검증 완료" : "Validated"}</label><button type="button" onClick={()=>{setOpen(false);setNotice(ko ? `${checked ? 4 : 6}개 경로 표시` : `Showing ${checked ? 4 : 6} routes`);}}>{ko ? "결과 보기" : "Show results"}</button></aside>}{result}</div>;
  if (id === "context-menu" || id === "split-button") {
    const options = ko ? ["임시 저장", "미리보기", "예시 발행"] : ["Save draft", "Preview", "Publish demo"];
    return <div className="specimen-menu-demo"><div className="specimen-split-button"><button type="button" disabled={disabled} onClick={()=>setNotice(ko ? "예시 경로를 발행했습니다." : "Demo route published.")}>{ko ? "경로 발행" : "Publish route"}</button><button type="button" disabled={disabled} aria-haspopup="menu" aria-expanded={open} aria-label={ko ? "다른 발행 방식" : "Other publishing options"} onClick={()=>setOpen(!open)}><MoreHorizontal aria-hidden="true" /></button></div>{open && <div role="menu" tabIndex={-1} aria-label={ko ? "발행 방식" : "Publishing options"} onKeyDown={event=>{if(event.key === "Escape")setOpen(false);}}>{options.map(label=><button type="button" role="menuitem" key={label} disabled={disabled} onClick={()=>{setNotice(`${label} · ${ko ? "예시 완료" : "Demo complete"}`);setOpen(false);}}>{label}</button>)}</div>}{result}</div>;
  }
  if (id === "command-menu" || id === "command-palette") {
    const options = ko ? ["새 경로 만들기", "GPX 가져오기", "필터 열기"] : ["Create a new route", "Import GPX", "Open filters"];
    return <section className="specimen-command-palette" aria-label={ko ? "명령 검색 예시" : "Command search demo"}><header><input aria-label={ko ? "명령 검색" : "Search commands"} value={query} onChange={event=>setQuery(event.target.value)} placeholder={ko ? "명령 검색…" : "Search commands…"} /></header>{options.filter(label=>label.toLowerCase().includes(query.toLowerCase())).map(label=><button key={label} type="button" onClick={()=>setNotice(`${label} · ${ko ? "예시 선택됨" : "Selected in demo"}`)}>{label}</button>)}{result}</section>;
  }
  return null;
}
