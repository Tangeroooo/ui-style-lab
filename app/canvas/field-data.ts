// Fictional, consistent data shared by Scenes and Pages. No network or account writes.
export const routes = [
  { id: "JE-01", en: "Eastern ridge", ko: "동쪽 능선", region: "Jeju", regionKo: "제주", kind: "ridge", km: 8.4, hours: 3, status: "open", visits: 128 },
  { id: "JE-02", en: "Basalt coast", ko: "현무암 해안", region: "Jeju", regionKo: "제주", kind: "coast", km: 5.2, hours: 2, status: "open", visits: 96 },
  { id: "GW-01", en: "Old pine forest", ko: "오래된 소나무 숲", region: "Gangwon", regionKo: "강원", kind: "forest", km: 6.8, hours: 2.5, status: "watch", visits: 74 },
  { id: "TY-01", en: "Island afternoon", ko: "섬의 오후", region: "Tongyeong", regionKo: "통영", kind: "coast", km: 4.1, hours: 1.5, status: "open", visits: 82 },
  { id: "GW-02", en: "Birch passage", ko: "자작나무 길", region: "Gangwon", regionKo: "강원", kind: "forest", km: 7.6, hours: 3, status: "open", visits: 108 },
  { id: "SE-01", en: "City foothills", ko: "도시의 산자락", region: "Seoul", regionKo: "서울", kind: "ridge", km: 10.6, hours: 4, status: "watch", visits: 134 },
] as const;
export const periods = {
  week: { en: "This week", ko: "이번 주", previous: 180, values: [24, 31, 27, 36, 29, 41, 28] },
  month: { en: "This month", ko: "이번 달", previous: 530, values: [128, 146, 164, 184] },
} as const;
export type Period = keyof typeof periods;
export function periodSummary(period: Period) {
  const data = periods[period];
  const total = data.values.reduce((sum, value) => sum + value, 0);
  return { total, change: ((total - data.previous) / data.previous * 100).toFixed(1), previous: data.previous };
}
