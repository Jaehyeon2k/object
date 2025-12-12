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
export async function fetchSchoolEventsByYear(year) {
  const res = await fetch(`http://localhost:4100/api/school-events?year=${year}`);
  const json = await res.json();
  return json.events || [];
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
