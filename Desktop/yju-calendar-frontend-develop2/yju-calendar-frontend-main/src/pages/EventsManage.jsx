// src/pages/EventsManage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const API_BASE = "http://localhost:4000/events"; // json-server

const initialForm = {
  title: "",
  start: "",
  end: "",
  allDay: true,
};

export default function EventsManage() {
  const { user } = useAuth();
  const ownerId = user?.uid || user?.email; // 작성자 식별자 (uid 우선, 없으면 email)

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  // -------- 공통: 데이터 불러오기 --------
  async function load() {
    if (!ownerId) return;
    setLoading(true);
    setMsg("");
    try {
      // 내 일정(scope=MY + owner=현재유저)만 가져오기
      const q = `scope=MY&owner=${encodeURIComponent(
        ownerId
      )}&_sort=start&_order=asc`;
      const r = await fetch(`${API_BASE}?${q}`);
      if (!r.ok) throw new Error("서버 오류 " + r.status);

      const data = await r.json();
      setRows(data);
    } catch (e) {
      console.error(e);
      setMsg("불러오기 실패: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // ownerId 바뀌면 다시 로딩
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  // -------- 폼 핸들러 --------
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!form.title.trim()) {
      setMsg("제목은 필수입니다.");
      return;
    }
    if (!form.start) {
      setMsg("시작 날짜를 선택하세요.");
      return;
    }

    const payload = {
      ...form,
      scope: "MY", // 내 일정
      owner: ownerId,
    };

    try {
      let r;
      if (editingId == null) {
        // 새로 추가
        r = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // 수정
        r = await fetch(`${API_BASE}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!r.ok) throw new Error("저장 실패 " + r.status);

      resetForm();
      load();
    } catch (e) {
      console.error(e);
      setMsg("저장 중 오류: " + e.message);
    }
  }

  // -------- 삭제 --------
  async function remove(id) {
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      const r = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("삭제 실패 " + r.status);
      setRows((prev) => prev.filter((v) => v.id !== id));
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  // -------- 수정 모드로 전환 --------
  function startEdit(ev) {
    setEditingId(ev.id);
    setForm({
      title: ev.title || "",
      start: ev.start || "",
      end: ev.end || "",
      allDay: ev.allDay ?? true,
    });
  }

  return (
    <div className="page-root" style={{ color: "var(--text-color)" }}>
      <h2 className="page-title">내 일정 관리</h2>
      <p className="page-subtitle">
        로그인한 사용자 기준으로, 나만의 개인 일정을 등록·수정·삭제할 수 있습니다.
      </p>

      {/* 상태 메시지 */}
      {loading && <p>불러오는 중…</p>}
      {msg && (
        <p style={{ color: "tomato", marginBottom: 16 }}>
          {msg}
        </p>
      )}

      {/* 입력 폼 */}
      <div
        style={{
          padding: 16,
          marginBottom: 24,
          borderRadius: 12,
          background: "#1b1f27",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>
          {editingId == null ? "새 일정 추가" : `일정 수정 (ID: ${editingId})`}
        </h3>

        <form
          onSubmit={onSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr auto",
            gap: 12,
            alignItems: "center",
          }}
        >
          {/* 제목 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, opacity: 0.7 }}>제목</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              style={{
                padding: 8,
                borderRadius: 8,
                border: "1px solid #333945",
                background: "#151821",
                color: "#e9eef4",
              }}
              placeholder="예) 팀플 발표, 과제 마감"
            />
          </div>

          {/* 시작일 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, opacity: 0.7 }}>시작</label>
            <input
              type="date"
              name="start"
              value={form.start}
              onChange={onChange}
              style={{
                padding: 8,
                borderRadius: 8,
                border: "1px solid #333945",
                background: "#151821",
                color: "#e9eef4",
              }}
            />
          </div>

          {/* 종료일 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, opacity: 0.7 }}>끝(옵션)</label>
            <input
              type="date"
              name="end"
              value={form.end}
              onChange={onChange}
              style={{
                padding: 8,
                borderRadius: 8,
                border: "1px solid #333945",
                background: "#151821",
                color: "#e9eef4",
              }}
            />
          </div>

          {/* 버튼 + allDay */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <label style={{ fontSize: 12, opacity: 0.7 }}>
              <input
                type="checkbox"
                name="allDay"
                checked={form.allDay}
                onChange={onChange}
                style={{ marginRight: 4 }}
              />
              종일
            </label>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "none",
                  background: "#2a65f7",
                  color: "#e9eef4",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {editingId == null ? "추가" : "수정 저장"}
              </button>
              {editingId != null && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid #555d6b",
                    background: "transparent",
                    color: "#e9eef4",
                    cursor: "pointer",
                  }}
                >
                  취소
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* 리스트 테이블 */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #2a2e36",
                padding: 8,
              }}
            >
              ID
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #2a2e36",
                padding: 8,
              }}
            >
              제목
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #2a2e36",
                padding: 8,
              }}
            >
              시작
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #2a2e36",
                padding: 8,
              }}
            >
              끝
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #2a2e36",
                padding: 8,
              }}
            >
              액션
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((ev) => (
            <tr key={ev.id}>
              <td style={{ padding: 8 }}>{ev.id}</td>
              <td style={{ padding: 8 }}>{ev.title}</td>
              <td style={{ padding: 8 }}>{ev.start}</td>
              <td style={{ padding: 8 }}>{ev.end || "-"}</td>
              <td style={{ padding: 8 }}>
                <button
                  onClick={() => startEdit(ev)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: "#2a3442",
                    color: "#e9eef4",
                    border: "none",
                    marginRight: 6,
                    cursor: "pointer",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => remove(ev.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: "#d9534f",
                    color: "#e9eef4",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && !loading && (
            <tr>
              <td colSpan={5} style={{ padding: 12, opacity: 0.8 }}>
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
