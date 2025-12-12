// src/pages/CalendarPage.jsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchSchoolEvents } from "../api/eventsApi";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrMsg("");
      try {
        const data = await fetchSchoolEvents();
        setEvents(data);
      } catch (e) {
        console.error(e);
        const status = e.response?.status;
        setErrMsg(
          "데이터 불러오기 실패: " +
            (status ? `GET 실패 ${status}` : e.message)
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="page-root">
      <h2 className="page-title">YJU 학사일정</h2>
      <p className="page-subtitle">
        학교 전체 학사일정(개강, 등록, 시험 등)을 한눈에 볼 수 있는 캘린더입니다.
      </p>

      {loading && <p>불러오는 중…</p>}
      {errMsg && <p style={{ color: "#ff6b6b" }}>{errMsg}</p>}

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        height="auto"
        events={events}
      />
    </div>
  );
}
