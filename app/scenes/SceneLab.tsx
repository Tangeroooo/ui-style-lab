import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Check, FileText, Upload, Users, CalendarDays, Settings2, BarChart3, RotateCcw, Trash2 } from "lucide-react";
import { getOption, type Language, type Selection } from "../style-data";
import { usesBilingualCopy, type KoreanCopyMode } from "../url-state";
import { scenes, type SceneId } from "./scene-data";
const AnalyticsPanel = lazy(() => import("../canvas/AnalyticsPanel").then((m) => ({ default: m.AnalyticsPanel })));
type DemoProps = { language: Language; copyMode?: KoreanCopyMode };

export function TeamScene({ language, copyMode = "only" }: DemoProps) {
  const ko = language === "ko";
  const uid = useId();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [members, setMembers] = useState([{ email: "mina@example.com", role: "owner" }, { email: "alex@example.com", role: "editor" }]);
  const [notice, setNotice] = useState("");
  return <div className="scene-team">
    <div className="scene-primary"><div className="scene-panel-heading"><div><span className="scene-eyebrow">{ko ? "함께 만드는 현장 기록" : "THE FIELD NOTES COLLECTIVE"}</span><h3>{ko ? "좋은 기록은 함께." : "Good work. Together."}{usesBilingualCopy(language, copyMode) && <span className="studio-companion" lang="en">Good work. Together.</span>}</h3><p>{ko ? "다음 여정을 기록할 동료를 초대하세요." : "Bring your people into the next chapter."}</p></div><Users aria-hidden="true" /></div>
      <form className="scene-invite" onSubmit={(event) => { event.preventDefault(); const clean = email.trim().toLowerCase(); if (members.some((m) => m.email === clean)) { setNotice(ko ? "이미 참여 중인 멤버입니다." : "This person is already on the team."); return; } setMembers([...members, { email: clean, role }]); setEmail(""); setNotice(ko ? "예시 팀에 멤버를 추가했습니다." : "Member added to this demo team."); }}>
        <label htmlFor={`${uid}-email`}>{ko ? "이메일 주소" : "Email address"}<input id={`${uid}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required /></label>
        <label>{ko ? "권한" : "Role"}<select value={role} onChange={(e) => setRole(e.target.value)}><option value="editor">{ko ? "편집자" : "Editor"}</option><option value="viewer">{ko ? "뷰어" : "Viewer"}</option></select></label>
        <button className="scene-action" type="submit">{ko ? "초대하기" : "Invite member"}<ArrowRight aria-hidden="true" /></button>
      </form>
      <div className="scene-list-title"><b>{ko ? "멤버" : "People"}</b><span>{members.length.toString().padStart(2, "0")}</span></div>
      <ul className="scene-members">{members.map((member, index) => <li key={member.email}><span className="scene-avatar" data-tone={index % 3}>{member.email.slice(0, 1).toUpperCase()}</span><div><b>{member.email.split("@")[0]}</b><small>{member.email}</small></div>{member.role === "owner" ? <span className="scene-badge">{ko ? "소유자" : "Owner"}</span> : <><select aria-label={`${member.email} ${ko ? "권한" : "role"}`} value={member.role} onChange={(e) => setMembers(members.map((m) => m.email === member.email ? { ...m, role: e.target.value } : m))}><option value="editor">{ko ? "편집자" : "Editor"}</option><option value="viewer">{ko ? "뷰어" : "Viewer"}</option></select><button className="scene-icon" type="button" aria-label={`${ko ? "삭제" : "Remove"} ${member.email}`} onClick={() => { setMembers(members.filter((m) => m.email !== member.email)); setNotice(ko ? "멤버를 삭제했습니다." : "Member removed."); }}><Trash2 aria-hidden="true" /></button></>}</li>)}</ul>
      <p className="scene-notice" role="status">{notice || (ko ? "예시 데이터 · 실제 초대 메일은 전송되지 않습니다." : "Demo data · No invitation emails are sent.")}</p>
    </div>
    <aside className="scene-secondary"><span className="scene-eyebrow">{ko ? "작은 팀, 넓은 시야" : "SMALL TEAM, WIDE HORIZONS"}</span><div className="scene-orbit" aria-hidden="true"><span><Users aria-hidden="true" /></span><i /><i /><i /></div><h4>{ko ? "함께할 공간이 있습니다." : "Room for your people."}</h4><p>{ko ? "편집자는 기록을 추가하고, 뷰어는 팀의 여정을 읽을 수 있어요." : "Editors shape the collection. Viewers follow the journey."}</p><div className="scene-mini-stat"><strong>{members.length}</strong><span>{ko ? "함께하는 멤버" : "people, one collection"}</span></div></aside>
  </div>;
}

export function UploadScene({ language, copyMode = "only" }: DemoProps) {
  const ko = language === "ko";
  const [files, setFiles] = useState([{ name: "eastern-ridge.gpx", size: 24800 }]);
  const [pending, setPending] = useState<{ name: string; size: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const busy = pending.length > 0;
  useEffect(() => {
    if (!busy) return;
    const timer = window.setInterval(() => setProgress((p) => Math.min(100, p + 20)), 200);
    return () => window.clearInterval(timer);
  }, [busy]);
  useEffect(() => {
    if (progress !== 100 || !busy) return;
    const timer = window.setTimeout(() => { setFiles((old) => [...old, ...pending]); setPending([]); setProgress(0); }, 200);
    return () => window.clearTimeout(timer);
  }, [busy, pending, progress]);
  function addFiles(incoming: { name: string; size: number }[]) {
    if (busy) return;
    if (incoming.some((f) => !/\.(gpx|kml|pdf)$/i.test(f.name) || f.size > 10 * 1024 * 1024)) { setError(ko ? "GPX, KML, PDF 파일만 가능합니다. 파일당 최대 10MB입니다." : "Choose GPX, KML or PDF files, up to 10 MB each."); return; }
    const unique = incoming.filter((f, i) => !files.some((old) => old.name === f.name) && incoming.findIndex((item) => item.name === f.name) === i);
    setError(unique.length ? "" : ko ? "이미 추가된 파일입니다." : "These files are already in the collection."); setPending(unique); setProgress(0);
  }
  return <div className="scene-primary"><div className="scene-panel-heading"><div><span className="scene-eyebrow">{ko ? "팀 자료 모음" : "COLLECTION / ROUTE FILES"}</span><h3>{ko ? "다음 여정의 시작." : "Every journey starts here."}{usesBilingualCopy(language, copyMode) && <span className="studio-companion" lang="en">Every journey starts here.</span>}</h3><p>{ko ? "경로 파일과 안내서를 한곳에 보관하세요." : "A home for route files and field guides."}</p></div><Upload aria-hidden="true" /></div>
    <div className="scene-drop" data-dragging={dragging} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}>
      <Upload aria-hidden="true" /><h4>{ko ? "여기에 파일을 놓으세요" : "Drop a little inspiration"}</h4><p>GPX · KML · PDF / {ko ? "파일당 최대 10MB" : "Up to 10 MB per file"}</p><label className="scene-file-button">{ko ? "파일 선택" : "Choose files"}<input type="file" multiple accept=".gpx,.kml,.pdf" disabled={busy} onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} /></label><button type="button" className="scene-text-action" disabled={busy} onClick={() => addFiles([{ name: `field-guide-${files.length}.pdf`, size: 82000 }])}>{ko ? "샘플 파일로 체험" : "Try a sample file"}</button>
    </div>
    {error && <p role="alert" className="scene-error">{error}</p>}
    {busy && <div className="scene-upload-progress"><span>{ko ? "예시 처리 중" : "Simulating upload"} · {progress}%</span><progress max="100" value={progress} aria-label={ko ? "파일 처리 진행률" : "File progress"} /><button type="button" onClick={() => { setPending([]); setProgress(0); }}>{ko ? "취소" : "Cancel"}</button></div>}
    <ul className="scene-files">{files.map((file) => <li key={file.name}><FileText aria-hidden="true" /><div><b>{file.name}</b><small>{Math.max(1, Math.round(file.size / 1024))} KB</small></div><Check aria-label={ko ? "완료" : "Complete"} /><button className="scene-icon" type="button" aria-label={`${ko ? "삭제" : "Remove"} ${file.name}`} onClick={() => setFiles(files.filter((f) => f.name !== file.name))}><Trash2 aria-hidden="true" /></button></li>)}</ul>
    <p role="status" className="scene-notice">{ko ? `${files.length}개 파일 · 파일 내용은 읽거나 전송하지 않습니다.` : `${files.length} files · File contents are never read or uploaded.`}</p>
  </div>;
}

export function BookingScene({ language, copyMode = "only" }: DemoProps) {
  const ko = language === "ko";
  const [day, setDay] = useState(12);
  const [time, setTime] = useState("09:00");
  const [confirmed, setConfirmed] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const year = 2026 + Math.floor((10 + monthOffset) / 12);
  const month = (10 + monthOffset) % 12;
  const monthName = new Intl.DateTimeFormat(ko ? "ko-KR" : "en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month, 1)));
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const start = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const changeMonth = (offset: number) => { setMonthOffset(offset); setDay(new Date(Date.UTC(2026, 10 + offset, 12)).getUTCDay() === 0 ? 13 : 12); setConfirmed(false); };
  const weekdays = ko ? ["일", "월", "화", "수", "목", "금", "토"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return <div className="scene-booking"><div className="scene-primary"><div className="scene-panel-heading"><div><span className="scene-eyebrow">{ko ? "동쪽 능선 · 가이드 산책" : "EASTERN RIDGE / GUIDED WALK"}</span><h3>{ko ? "잠시, 바깥으로." : "A little time outside."}{usesBilingualCopy(language, copyMode) && <span className="studio-companion" lang="en">A little time outside.</span>}</h3><p>{ko ? "예시 일정에서 날짜와 시간을 선택하세요." : "Choose a day and time in this sample calendar."}</p></div><CalendarDays aria-hidden="true" /></div>
    <div className="scene-calendar-title"><b>{monthName}</b><div><button type="button" disabled={monthOffset === 0} aria-label={ko ? "이전 달" : "Previous month"} onClick={() => changeMonth(monthOffset - 1)}><ChevronLeft aria-hidden="true" /></button><button type="button" aria-label={ko ? "다음 달" : "Next month"} onClick={() => changeMonth(monthOffset + 1)}><ChevronRight aria-hidden="true" /></button></div></div>
    <div className="scene-calendar" role="group" aria-label={ko ? "예약 날짜" : "Booking date"}>{weekdays.map((w) => <span key={w}>{w}</span>)}{Array.from({ length: start }, (_, i) => <span aria-hidden="true" key={`blank-${i}`} />)}{Array.from({ length: days }, (_, i) => i + 1).map((d) => <button type="button" key={d} disabled={(d + start - 1) % 7 === 0} aria-pressed={day === d} aria-label={`${monthName} ${d}`} onClick={() => { setDay(d); setConfirmed(false); }}>{d}</button>)}</div>
    <div className="scene-time" role="group" aria-label={ko ? "출발 시간" : "Departure time"}>{["09:00", "11:30", "14:00"].map((slot) => <button key={slot} type="button" aria-pressed={time === slot} onClick={() => { setTime(slot); setConfirmed(false); }}>{slot}</button>)}</div>
    </div><aside className="scene-secondary booking-summary"><span className="scene-eyebrow">{ko ? "나의 여정" : "YOUR NEXT CHAPTER"}</span><div className="scene-route-art" aria-hidden="true"><i /><i /><i /></div><h4>{ko ? "동쪽 능선" : "Eastern ridge"}</h4><p>{ko ? "8.4km의 풍경, 세 시간의 여유." : "8.4 km of landscape. Three unhurried hours."}</p><dl><div><dt>{ko ? "날짜" : "Date"}</dt><dd>{year}.{String(month + 1).padStart(2, "0")}.{day}</dd></div><div><dt>{ko ? "시간" : "Time"}</dt><dd>{time}</dd></div><div><dt>{ko ? "인원" : "Guests"}</dt><dd>{ko ? "1명" : "1 walker"}</dd></div></dl><button className="scene-action" type="button" onClick={() => setConfirmed(!confirmed)}>{confirmed ? <><Check aria-hidden="true" />{ko ? "일정 다시 선택" : "Edit reservation"}</> : <>{ko ? "예시 예약 확인" : "Confirm demo reservation"}<ArrowRight aria-hidden="true" /></>}</button><p className="scene-notice" role="status">{confirmed ? (ko ? "예시 예약이 완료됐습니다. 실제 예약은 생성되지 않습니다." : "Demo reservation confirmed. No real booking was made.") : (ko ? "예시 일정 · 일요일 휴무" : "Sample availability · Closed Sundays")}</p></aside></div>;
}

export function SettingsScene({ language, copyMode = "only" }: DemoProps) {
  const ko = language === "ko";
  const initial = { name: "Mina Park", bio: ko ? "천천히 걷고, 오래 기록합니다." : "Walk slowly. Keep the good details.", digest: true, offline: false };
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [notice, setNotice] = useState("");
  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);
  return <form className="scene-primary scene-settings" onSubmit={(event) => { event.preventDefault(); setSaved(draft); setNotice(ko ? "이 예시 화면에 설정을 저장했습니다." : "Preferences saved for this demo session."); }}><div className="scene-panel-heading"><div><span className="scene-eyebrow">{ko ? "나의 작업 공간" : "YOUR WORKSPACE"}</span><h3>{ko ? "나에게 맞는 방식으로." : "Make yourself at home."}{usesBilingualCopy(language, copyMode) && <span className="studio-companion" lang="en">Make yourself at home.</span>}</h3><p>{ko ? "기록하고 소식을 받는 방식을 정하세요." : "A few preferences for the way you explore."}</p></div><Settings2 aria-hidden="true" /></div><div className="scene-profile"><span className="scene-avatar">{draft.name.slice(0, 1).toUpperCase() || "M"}</span><div><b>{draft.name || (ko ? "이름을 입력하세요" : "Your name")}</b><small>{ko ? "현장 기록 멤버" : "Field Notes member"}</small></div></div><div className="scene-settings-fields"><label>{ko ? "이름" : "Display name"}<input value={draft.name} required maxLength={60} onChange={(e) => { setDraft({ ...draft, name: e.target.value }); setNotice(""); }} /></label><label>{ko ? "소개" : "A little about you"}<textarea value={draft.bio} maxLength={160} onChange={(e) => { setDraft({ ...draft, bio: e.target.value }); setNotice(""); }} /><small>{draft.bio.length} / 160</small></label></div>{(["digest", "offline"] as const).map((key) => <div className="scene-setting-row" key={key}><div><b>{key === "digest" ? ko ? "주간 소식" : "Weekly field notes" : ko ? "오프라인 지도" : "Offline maps"}</b><p>{key === "digest" ? ko ? "일주일에 한 번, 새로운 기록을 모아봅니다." : "A quiet roundup of the week's discoveries." : ko ? "연결 없이도 여정을 이어갑니다." : "Keep your route close, even off the grid."}</p></div><button className="scene-switch" type="button" role="switch" aria-label={key === "digest" ? ko ? "주간 소식" : "Weekly field notes" : ko ? "오프라인 지도" : "Offline maps"} aria-checked={draft[key]} onClick={() => { setDraft({ ...draft, [key]: !draft[key] }); setNotice(""); }}><span /></button></div>)}<div className="scene-save"><span role="status">{dirty ? ko ? "저장하지 않은 변경 사항" : "You have unsaved changes" : notice || (ko ? "예시 설정 · 새로고침 시 초기화" : "Demo preferences · Resets on reload")}</span><button type="button" disabled={!dirty} onClick={() => { setDraft(saved); setNotice(""); }}>{ko ? "취소" : "Discard"}</button><button className="scene-action" type="submit" disabled={!dirty}>{ko ? "변경 저장" : "Save changes"}<Check aria-hidden="true" /></button></div></form>;
}

export function SceneLab({ selection, language, copyMode, scene, onSceneChange }: { selection: Selection; language: Language; copyMode: KoreanCopyMode; scene: SceneId; onSceneChange: (scene: SceneId) => void }) {
  const [revision, setRevision] = useState(0);
  const current = scenes.find((item) => item.id === scene)!;
  const ko = language === "ko";
  const icons = [Users, Upload, BarChart3, CalendarDays, Settings2];
  const stage = useRef<HTMLDivElement>(null);
  return <section id="scene-lab" className="live-site scene-lab" lang={language} data-aesthetic={selection.aesthetic} data-surface={selection.surface} data-layout={selection.layout} data-nav={selection.nav} data-nav-style={selection.navStyle} data-type={selection.type} data-ko-type={selection.koType} data-font-mode={selection.fontMode} data-palette={selection.palette} data-motion={selection.motion} data-language={language} data-copy-mode={copyMode}>
    <nav className="scene-tabs" aria-label={ko ? "사용 장면" : "Scenes"}>{scenes.map((item, i) => { const Icon = icons[i]; return <button type="button" key={item.id} aria-pressed={scene === item.id} onClick={() => onSceneChange(item.id)}><Icon aria-hidden="true" /><span>{item[language]}</span></button>; })}</nav>
    <header className="scene-heading"><div><span className="scene-eyebrow">{getOption("aesthetic", selection.aesthetic)[language]} / 0{scenes.indexOf(current) + 1}</span><h2>{current[language]}{usesBilingualCopy(language, copyMode) && <small lang="en">{current.en}</small>}</h2><p>{current.detail[language]}</p></div><button type="button" className="scene-reset" onClick={() => setRevision(revision + 1)}><RotateCcw aria-hidden="true" />{ko ? "처음으로" : "Reset scene"}</button></header>
    <div className="scene-stage" ref={stage} key={`${scene}-${revision}-${language}`}>
      {scene === "team" && <TeamScene language={language} copyMode={copyMode} />}{scene === "upload" && <UploadScene language={language} copyMode={copyMode} />}{scene === "analytics" && <Suspense fallback={<div data-agent-pending="true" className="chart-skeleton" />}><AnalyticsPanel language={language} copyMode={copyMode} selection={selection} /></Suspense>}{scene === "booking" && <BookingScene language={language} copyMode={copyMode} />}{scene === "settings" && <SettingsScene language={language} copyMode={copyMode} />}
    </div><footer className="scene-anatomy"><span>{ko ? "이 장면의 구성" : "IN THIS SCENE"}</span><p>{current.parts[language]}</p><span>{ko ? "직접 조작해 보세요" : "Made to be interacted with"}</span></footer>
  </section>;
}
