import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const onSignup = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(cred.user, { displayName });
            }
            nav("/calendar", { replace: true });
        } catch (e) {
            setMsg(e.message);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto", color: "#e9eef4" }}>
            <h2>회원가입</h2>
            <form onSubmit={onSignup}>
                <div style={{ marginBottom: 12 }}>
                    <label>이름(표시명)</label>
                    <input value={displayName} onChange={e=>setDisplayName(e.target.value)} type="text"
                           style={{ width:"100%", padding:10, borderRadius:8, border:"1px solid #2a2e36", background:"#0b0c10", color:"#e9eef4" }}/>
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>이메일</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required
                           style={{ width:"100%", padding:10, borderRadius:8, border:"1px solid #2a2e36", background:"#0b0c10", color:"#e9eef4" }}/>
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>비밀번호</label>
                    <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required
                           style={{ width:"100%", padding:10, borderRadius:8, border:"1px solid #2a2e36", background:"#0b0c10", color:"#e9eef4" }}/>
                </div>
                {msg && <p style={{color:"tomato"}}>{msg}</p>}
                <button type="submit" style={{ padding:"10px 14px", borderRadius:8, border:"none", background:"#1c2430", color:"#e9eef4" }}>가입</button>
            </form>

            <p style={{ marginTop: 16 }}>
                이미 계정이 있나요? <Link to="/login">로그인</Link>
            </p>
        </div>
    );
}
