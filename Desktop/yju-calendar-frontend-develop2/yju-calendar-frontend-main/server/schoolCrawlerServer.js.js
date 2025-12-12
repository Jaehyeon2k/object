/**
 * DB 없이 학사일정 자동수집 → JSON 반환 + "서버 메모리 캐싱"
 * - GET  /api/school-events?year=2025
 * - GET  /api/health
 *
 * 필요 라이브러리: axios, cheerio, dayjs (너희 package.json에 이미 있음)
 */

const http = require("http");
const url = require("url");
const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");

// =========================
// 1) 여기를 너희 학교 URL로 맞춰야 함
// =========================
// Network에서 확인한 yearSchdul.do의 "Request URL"을 여기에 그대로 넣어.
const YJU_YEAR_SCHDUL_URL = "https://www.yju.ac.kr/schdulmanage/kr/3/yearSchdul.do"; 
// ⚠️ 위는 예시. 실제로는 yearSchdul.do 같은 엔드포인트가 따로 있을 가능성이 큼.
//   예: "https://www.yju.ac.kr/kr/3248/yearSchdul.do"  ← 이런 식으로.

// year 파라미터가 POST(Form)로 들어가는 경우가 많아서 기본은 POST로 해둠.
const REQUEST_METHOD = "POST"; // "GET" 또는 "POST"

// =========================
// 2) 서버 설정
// =========================
const PORT = 4100;

// "서버 메모리 캐싱"
// cache[year] = { data: [...], fetchedAt: ISOString }
const cache = Object.create(null);

// 캐시 유효시간(밀리초): 6시간
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

// =========================
// 유틸: CORS + JSON 응답
// =========================
function sendJson(res, statusCode, bodyObj) {
  const json = JSON.stringify(bodyObj);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(json);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(text);
}

// =========================
// 핵심: yearSchdul.do 응답(HTML 조각) → events 배열로 변환
// =========================
function parseYearScheduleHtmlToEvents(html, targetYear) {
  const $ = cheerio.load(html);
  const events = [];

  // "학사일정" 영역이 #timeTableList.yearSchdul 아래에 있음 (네가 준 Response 기준)
  const root = $("#timeTableList.yearSchdul");
  if (!root.length) return events;

  // 월별 블록: li 안에 h3(예: "1월"), dl 안에 dt/dd가 번갈아 나옴
  root.find("ul > li").each((_, li) => {
    const monthText = $(li).find("h3").first().text().trim(); // "1월"
    const monthMatch = monthText.match(/(\d{1,2})\s*월/);
    if (!monthMatch) return;

    const month = String(monthMatch[1]).padStart(2, "0");

    // dt와 dd가 순서대로 나오므로 dt마다 다음 dd를 잡아 제목을 뽑는다
    const dts = $(li).find("dl > dt");
    dts.each((idx, dt) => {
      const dtText = $(dt).find("span").text().replace(/\s+/g, " ").trim();
      // 예: "01-28 (화) ~ 01-30 (목)" 또는 "01-01 (수)"
      const dateMatches = dtText.match(/\b(\d{2})-(\d{2})\b/g); // ["01-28","01-30"] or ["01-01"]
      if (!dateMatches || dateMatches.length < 1) return;

      const startMMDD = dateMatches[0]; // "01-28"
      const endMMDD = dateMatches.length >= 2 ? dateMatches[1] : null;

      const startDay = startMMDD.split("-")[1]; // "28"
      const start = `${targetYear}-${month}-${startDay}`;

      let end = null;
      if (endMMDD) {
        const endDay = endMMDD.split("-")[1];
        // FullCalendar는 end를 보통 "다음날(Exclusive)"로 주는 게 깔끔
        end = dayjs(`${targetYear}-${month}-${endDay}`).add(1, "day").format("YYYY-MM-DD");
      }

      // 제목은 dt 다음 dd의 a 텍스트
      const dd = $(dt).next("dd");
      const title = dd.find("a").first().text().replace(/\s+/g, " ").trim() || "학사일정";

      // id는 안정적으로 만들기
      const id = `SCHOOL-${targetYear}-${month}-${startDay}-${title}`.replace(/\s+/g, "_");

      events.push({
        id,
        title,
        start,
        end,         // null 또는 YYYY-MM-DD (exclusive)
        allDay: true,
        scope: "SCHOOL",
      });
    });
  });

  return events;
}

// =========================
// 학교 서버에서 HTML 받아오기
// =========================
async function fetchYearScheduleHtml(year) {
  if (!YJU_YEAR_SCHDUL_URL || YJU_YEAR_SCHDUL_URL.includes("<학교도메인>")) {
    throw new Error("YJU_YEAR_SCHDUL_URL을 실제 yearSchdul.do Request URL로 바꿔야 합니다.");
  }

  if (REQUEST_METHOD === "GET") {
    // GET 파라미터로 year 넘기는 경우
    const res = await axios.get(YJU_YEAR_SCHDUL_URL, {
      params: { year },
      timeout: 15000,
    });
    return res.data;
  }

  // POST(Form)로 year 넘기는 경우 (대부분 이 케이스)
  const form = new URLSearchParams();
  form.set("year", String(year));

  const res = await axios.post(YJU_YEAR_SCHDUL_URL, form.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    timeout: 15000,
  });
  return res.data;
}

// =========================
// 메인 서버
// =========================
const server = http.createServer(async (req, res) => {
  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, time: new Date().toISOString() });
  }

  if (req.method === "GET" && pathname === "/api/school-events") {
    const year = Number(parsed.query.year || dayjs().year());
    const force = parsed.query.force === "1";

    // 캐시 검사
    const cached = cache[year];
    const now = Date.now();
    if (!force && cached && now - Date.parse(cached.fetchedAt) < CACHE_TTL_MS) {
      return sendJson(res, 200, {
        source: "cache",
        year,
        fetchedAt: cached.fetchedAt,
        events: cached.data,
      });
    }

    try {
      const html = await fetchYearScheduleHtml(year);
      const events = parseYearScheduleHtmlToEvents(html, year);

      cache[year] = { data: events, fetchedAt: new Date().toISOString() };

      return sendJson(res, 200, {
        source: "school",
        year,
        fetchedAt: cache[year].fetchedAt,
        events,
      });
    } catch (e) {
      return sendJson(res, 500, {
        error: true,
        message: e.message || String(e),
      });
    }
  }

  return sendText(res, 404, "Not Found");
});

server.listen(PORT, () => {
  console.log(`[schoolCrawler] http://localhost:${PORT}`);
  console.log(`[schoolCrawler] GET /api/school-events?year=2025`);
});
