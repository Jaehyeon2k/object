import dayjs from "dayjs";

/**
 * 학사 일정 표시용 보정
 * - 방학: 시작일만 1일짜리 이벤트로 표시
 */
export function normalizeSchoolEvent(event) {
  const isVacation =
    typeof event.title === "string" &&
    event.title.includes("방학");

  if (!isVacation) return event;

  const start = event.start;

  return {
    ...event,
    start,
    end: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    allDay: true,
    title: `${event.title} (시작)`
  };
}
