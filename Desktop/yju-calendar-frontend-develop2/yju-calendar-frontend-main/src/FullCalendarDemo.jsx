import React, {useEffect, useMemo, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const API = "/events"; // CRA proxy → http://localhost:4000/events

export default function FullCalendarDemo() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // ---------- 공용 fetch helpers ----------
    const apiGet = async () => {
        const r = await fetch(API);
        if (!r.ok) throw new Error("GET 실패 " + r.status);
        return r.json();
    };
    const apiPost = async (body) => {
        const r = await fetch(API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        if (!r.ok) throw new Error("POST 실패 " + r.status);
        return r.json();
    };
    const apiPatch = async (id, body) => {
        const r = await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        if (!r.ok) throw new Error("PATCH 실패 " + r.status);
        return r.json();
    };
    const apiDelete = async (id) => {
        const r = await fetch(`${API}/${id}`, {method: "DELETE"});
        if (!r.ok) throw new Error("DELETE 실패 " + r.status);
    };

    // ---------- 초기 로드 ----------
    useEffect(() => {
        (async () => {
            setLoading(true);
            setErr("");
            try {
                const data = await apiGet();
                setEvents(Array.isArray(data) ? data : []);
            } catch (e) {
                setErr("데이터 불러오기 실패: " + e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // ---------- FullCalendar 옵션 ----------
    const headerToolbar = useMemo(
        () => ({
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }),
        []
    );

    // ---------- 이벤트 생성(드래그 선택/하루 클릭) ----------
    async function handleSelect(selectInfo) {
        // selectInfo: { start, end, allDay, view, jsEvent, ... }
        const defaultTitle = "";
        const title = window.prompt("새 일정 제목을 입력하세요", defaultTitle);
        if (!title) return;

        // FullCalendar는 end가 종료 '다음날 00:00'일 수 있음 → 그대로 저장
        const payload = {
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr || null,
            allDay: !!selectInfo.allDay,
        };

        try {
            const saved = await apiPost(payload); // json-server가 id 부여
            setEvents((prev) => [...prev, saved]);
        } catch (e) {
            alert("등록 실패: " + e.message);
        }
    }

    // ---------- 이벤트 클릭: 수정/삭제 ----------
    async function handleEventClick(clickInfo) {
        const ev = clickInfo.event; // FullCalendar EventApi
        const current = ev.title;
        const action = window.prompt(
            `액션 선택 (e: 제목 수정 / d: 삭제 / 취소는 ESC)\n현재 제목: ${current}`,
            "e"
        );
        if (!action) return;

        if (action.toLowerCase() === "d") {
            if (!window.confirm("정말 삭제할까요?")) return;
            try {
                await apiDelete(ev.id);
                setEvents((prev) => prev.filter((x) => String(x.id) !== String(ev.id)));
            } catch (e) {
                alert("삭제 실패: " + e.message);
            }
            return;
        }

        if (action.toLowerCase() === "e") {
            const newTitle = window.prompt("새 제목 입력", current);
            if (!newTitle || newTitle === current) return;
            try {
                await apiPatch(ev.id, {title: newTitle});
                // 화면 즉시 반영
                ev.setProp("title", newTitle);
                setEvents((prev) =>
                    prev.map((x) => (String(x.id) === String(ev.id) ? {...x, title: newTitle} : x))
                );
            } catch (e) {
                alert("수정 실패: " + e.message);
            }
        }
    }

    // ---------- 드래그로 날짜 이동 ----------
    async function handleEventDrop(changeInfo) {
        const ev = changeInfo.event;
        try {
            await apiPatch(ev.id, {
                start: ev.startStr,
                end: ev.end ? ev.end.toISOString() : null,
                allDay: ev.allDay,
            });
            // state도 동기화
            setEvents((prev) =>
                prev.map((x) =>
                    String(x.id) === String(ev.id)
                        ? {...x, start: ev.startStr, end: ev.end ? ev.end.toISOString() : null, allDay: ev.allDay}
                        : x
                )
            );
        } catch (e) {
            alert("이동 실패: " + e.message);
            changeInfo.revert();
        }
    }

    // ---------- 길이 리사이즈 ----------
    async function handleEventResize(resizeInfo) {
        const ev = resizeInfo.event;
        try {
            await apiPatch(ev.id, {
                start: ev.startStr,
                end: ev.end ? ev.end.toISOString() : null,
                allDay: ev.allDay,
            });
            setEvents((prev) =>
                prev.map((x) =>
                    String(x.id) === String(ev.id)
                        ? {...x, start: ev.startStr, end: ev.end ? ev.end.toISOString() : null, allDay: ev.allDay}
                        : x
                )
            );
        } catch (e) {
            alert("리사이즈 실패: " + e.message);
            resizeInfo.revert();
        }
    }

    return (
        <div style={{maxWidth: 1100, margin: "40px auto", color: "#e9eef4"}}>
            <h2 style={{textAlign: "center", marginBottom: 12}}>📅 YJU 학사일정 (db.json 연동 + CRUD)</h2>
            {loading && <p style={{textAlign: "center"}}>불러오는 중…</p>}
            {err && <p style={{textAlign: "center", color: "tomato", fontWeight: 600}}>{err}</p>}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={headerToolbar}
                locale="ko"
                height="auto"
                events={events}

                selectable        // 드래그/클릭으로 선택
                selectMirror
                select={handleSelect}

                editable          // 드래그&드롭, 리사이즈 허용
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}

                eventClick={handleEventClick}
                navLinks
                nowIndicator
                // 보기 좋은 기본 설정(원하면 튜닝)
                dayMaxEvents={3}
            />
        </div>
    );
}
