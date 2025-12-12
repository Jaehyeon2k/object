// import React, { useEffect, useMemo, useState } from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'
//
// const SRC = 'https://r.jina.ai/http://bokji.yju.ac.kr/index.php?document_srl=80177&mid=page_Npbh48'
//
// const MONTH_MAP = { '1월':1,'2월':2,'3월':3,'4월':4,'5월':5,'6월':6,'7월':7,'8월':8,'9월':9,'10월':10,'11월':11,'12월':12 }
// const guessCategory = (t='')=>{
//     if (/시험|중간|기말|평가/i.test(t)) return '시험'
//     if (/개강|수강|정정|등록|휴학|복학|졸업|입학/i.test(t)) return '학사'
//     if (/휴일|연휴|방학|공휴/i.test(t)) return '휴무'
//     if (/행사|설명회|대회|작품전/i.test(t)) return '행사'
//     return '기타'
// }
// const parseDayRange = (s)=>{
//     const r = s.match(/(\d{1,2})\([^)]*\)\s*[~\-–∼]\s*(\d{1,2})\([^)]*\)/)
//     if (r) return { d1:+r[1], d2:+r[2] }
//     const one = s.match(/(\d{1,2})\([^)]*\)/)
//     if (one) return { d1:+one[1], d2:+one[1] }
//     return null
// }
// function parseScheduleToEvents(text){
//     const lines = text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)
//     let year=null, month=null
//     const ev=[]
//     for (const line of lines){
//         const y=line.match(/^(\d{4})년$/); if(y){ year=+y[1]; continue }
//         const m=line.match(/^(\d{1,2}월)$/); if(m){ month=MONTH_MAP[m[1]]; continue }
//         if (!line.startsWith('•')) continue
//         if (!year||!month) continue
//         const [whenRaw, titleRaw=''] = line.replace(/^•\s*/,'').split(/\s*:\s*/)
//         const title = (titleRaw||whenRaw||'학사일정').trim()
//         const rng = parseDayRange(whenRaw||'')
//         if (rng){
//             const s=new Date(year, month-1, rng.d1)
//             const e=new Date(year, month-1, rng.d2)
//             ev.push({
//                 id:`${year}-${month}-${rng.d1}-${title}`,
//                 title, start:s.toISOString().slice(0,10),
//                 end:rng.d1===rng.d2? s.toISOString().slice(0,10) : e.toISOString().slice(0,10),
//                 allDay:true, category:guessCategory(title), memo:whenRaw
//             })
//         } else {
//             ev.push({
//                 id:`${year}-${month}-${Math.random().toString(36).slice(2)}`,
//                 title, start:new Date(year, month-1, 1).toISOString().slice(0,10),
//                 allDay:true, category:guessCategory(title), memo:whenRaw
//             })
//         }
//     }
//     return ev
// }
//
// export default function BokjiCalendar(){
//     const [events,setEvents]=useState([])
//     const [loading,setLoading]=useState(true)
//     const [error,setError]=useState('')
//     useEffect(()=>{
//         (async()=>{
//             try{
//                 setLoading(true); setError('')
//                 const res = await fetch(SRC,{cache:'no-store'})
//                 const txt = await res.text()
//                 const parsed = parseScheduleToEvents(txt)
//                 setEvents(parsed)
//             }catch(e){
//                 setError('학사일정 로드 실패: '+e.message)
//             }finally{
//                 setLoading(false)
//             }
//         })()
//     },[])
//     const fcEvents = useMemo(()=>events.map(e=>({
//         id:e.id, title:e.title, start:e.start, end:e.end, allDay:e.allDay
//     })),[events])
//
//     return (
//         <div style={{maxWidth:1100, margin:'32px auto', padding:16}}>
//             <h2>📅 사회복지과 학사일정 (프론트엔드 크롤링)</h2>
//             {loading && <p>불러오는 중…</p>}
//             {error && (
//                 <div style={{background:'#2a1f1f', color:'#ffb4b4', padding:'8px 12px', borderRadius:8, marginBottom:12}}>
//                     {error} — 임시 데이터로 테스트하려면 <button onClick={()=>setEvents([
//                     {id:'t1',title:'(테스트) 개강',start:'2025-03-03',allDay:true},
//                     {id:'t2',title:'(테스트) 중간고사',start:'2025-04-21',end:'2025-04-25',allDay:true}
//                 ])}>여기 클릭</button>
//                 </div>
//             )}
//             <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//                 initialView="dayGridMonth"
//                 headerToolbar={{ left:'prev,next today', center:'title', right:'dayGridMonth,timeGridWeek,timeGridDay,listMonth' }}
//                 dayMaxEvents
//                 events={fcEvents}
//                 height="auto"
//             />
//         </div>
//     )
// }
