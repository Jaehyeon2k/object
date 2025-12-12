// src/api/eventsApi.js
import axios from "axios";

// json-server 주소를 명시적으로 4000 포트로 지정
const api = axios.create({
  baseURL: "http://localhost:4000",
});

export async function fetchEvents() {
  const res = await api.get("/events");
  return res.data;
}

export async function createEvent(event) {
  const res = await api.post("/events", event);
  return res.data;
}

export async function updateEvent(id, patch) {
  const res = await api.patch(`/events/${id}`, patch);
  return res.data;
}

export async function deleteEvent(id) {
  await api.delete(`/events/${id}`);
}

// 🔹 학교 일정(SCOPE = 'SCHOOL')만 가져오는 함수
export async function fetchSchoolEvents() {
  const res = await api.get("/events", {
    params: { scope: "SCHOOL" },
  });
  return res.data;
}
