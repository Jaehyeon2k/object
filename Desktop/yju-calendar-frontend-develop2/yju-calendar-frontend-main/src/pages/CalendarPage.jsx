// src/pages/CalendarPage.jsx
import { useCallback, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const SCHOOL_API = "http://localhost:4100/api/school-events";

// 제목 정규화(표기 흔들림 최소 보정)
function normTitle(title) {
  return String(title ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace("휴학신청기간", "휴학신청 기간");
}

// end가 start보다 빠른 이상데이터면 end 제거(= 하루짜리로 처리)
function fixInvalidEnd(e) {
  if (!e?.end) return e;
  const s = new Date(e.start);
  const en = new Date(e.end);
  if (en < s) return { ...e, end: null };
  return e;
}

function normalizeForDisplay(raw) {
  const e0 = fixInvalidEnd(raw);
  const title = normTitle(e0.title);

  // ✅ 방학 OR 계절수업 기간
  const isShortDisplay =
    title.includes("방학") ||
    title.includes("계절수업 기간");

  if (!isShortDisplay) {
    return { ...e0, title };
  }

  const startDate = new Date(e0.start);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1); // 하루짜리 표시

  return {
    ...e0,
    title: `${title} (시작)`,
    allDay: true,
    end: endDate.toISOString().slice(0, 10),
  };
}


// FullCalendar 범위(info.start~info.end)에 걸치면 true
function overlapsRange(e, rangeStart, rangeEnd) {
  const s = new Date(e.start);
  const eEnd = e.end
    ? new Date(e.end)
    : new Date(new Date(e.start).getTime() + 24 * 60 * 60 * 1000);

  return s < rangeEnd && eEnd > rangeStart;
}

/**
 * ✅ 원본 사이트가 "다음년도 블록"을 뒤에 붙여서 중복되는 경우가 있음.
 * 네 요구대로: 같은 연도 데이터에서 "신정"이 2번 나오면,
 * 두번째 "신정"부터 끝까지 싹 버린다.
 */
function cutAfterSecondNewYear(list, year) {
  const out = [];
  let newYearCount = 0;

  for (const raw of list) {
    const t = normTitle(raw?.title);
    const start = String(raw?.start ?? "");

    const isNewYear =
      t === "신정" &&
      start.startsWith(`${year}-01-01`); // 해당 연도의 신정만 카운트

    if (isNewYear) {
      newYearCount += 1;
      if (newYearCount >= 2) break; // ✅ 두번째 신정부터 뒤 데이터 버림
    }

    out.push(raw);
  }

  return out;
}

// ✅ (title,start,end) 완전중복 제거
function dedupeExact(list) {
  const seen = new Set();
  const out = [];
  for (const raw of list) {
    const t = normTitle(raw?.title);
    const s = raw?.start ?? "";
    const e = raw?.end ?? "";
    const key = `${t}|${s}|${e}|${raw?.scope ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...raw, title: t });
  }
  return out;
}

export default function CalendarPage() {
  const calendarRef = useRef(null);

  // year -> events[]
  const cacheRef = useRef(new Map());
  // year -> Promise (중복 요청 방지)
  const pendingRef = useRef(new Map());

  const [loadedYears, setLoadedYears] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const ensureYear = useCallback(async (year) => {
    if (cacheRef.current.has(year)) return;

    if (pendingRef.current.has(year)) {
      await pendingRef.current.get(year);
      return;
    }

    const p = (async () => {
      const res = await fetch(`${SCHOOL_API}?year=${year}`);
      if (!res.ok) throw new Error(`school-events ${year} 실패: ${res.status}`);

      const json = await res.json();
      const list0 = Array.isArray(json.events) ? json.events : [];

      // ✅ (핵심) 2번째 신정부터 뒤 블록 제거
      const list1 = cutAfterSecondNewYear(list0, year);

      // ✅ 완전중복 제거
      const list2 = dedupeExact(list1);

      cacheRef.current.set(year, list2);

      setLoadedYears((prev) =>
        prev.includes(year) ? prev : [...prev, year].sort((a, b) => a - b)
      );
    })();

    pendingRef.current.set(year, p);

    try {
      await p;
    } finally {
      pendingRef.current.delete(year);
    }
  }, []);

  const eventSource = useCallback(
    async (info, successCallback, failureCallback) => {
      setErrMsg("");

      const y1 = info.start.getFullYear();
      const y2 = info.end.getFullYear();

      try {
        await ensureYear(y1);
        if (y2 !== y1) await ensureYear(y2);

        const rangeStart = info.start;
        const rangeEnd = info.end;

        const picked = [];

        for (const arr of cacheRef.current.values()) {
          for (const raw of arr) {
            const display = normalizeForDisplay(raw);
            if (!overlapsRange(display, rangeStart, rangeEnd)) continue;
            picked.push(display);
          }
        }

        successCallback(picked);
      } catch (e) {
        console.error(e);
        setErrMsg(e.message || String(e));
        failureCallback(e);
      }
    },
    [ensureYear]
  );

  const loadedCount = useMemo(() => {
    let n = 0;
    for (const arr of cacheRef.current.values()) n += arr.length;
    return n;
  }, [loadedYears]);

  return (
    <div className="page-root" style={{ padding: 16 }}>
      <h2>YJU 학사일정</h2>

      <div style={{ opacity: 0.8, marginBottom: 8 }}>
        loadedYears: {loadedYears.join(", ") || "(none)"} / events: {loadedCount}
      </div>

      {errMsg && <div style={{ color: "tomato", marginBottom: 8 }}>{errMsg}</div>}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        height="auto"
        events={eventSource}
      />
    </div>
  );
}
