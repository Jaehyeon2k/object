import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const nav = useNavigate();
    const loc = useLocation();
    const { user } = useAuth();

    const goAfter = () => {
        const to = loc.state?.from?.pathname || "/calendar";
        nav(to, { replace: true });
    };

    if (user) goAfter();

    const onLogin = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            goAfter();
        } catch (e) {
            setMsg(e.message);
        }
    };

    const onGoogle = async () => {
        setMsg("");
        try {
            await signInWithPopup(auth, googleProvider);
            goAfter();
        } catch (e) {
            setMsg(e.message);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto", color: "#e9eef4" }}>
            <h2>로그인</h2>
            <form onSubmit={onLogin}>
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
                <button type="submit" style={{ padding:"10px 14px", borderRadius:8, border:"none", background:"#1c2430", color:"#e9eef4" }}>이메일 로그인</button>
            </form>

            <div style={{ marginTop: 12 }}>
                <button onClick={onGoogle} style={{ padding:"10px 14px", borderRadius:8, border:"none", background:"#2a3442", color:"#e9eef4" }}>
                    Google로 로그인
                </button>
            </div>

            <p style={{ marginTop: 16 }}>
                계정이 없나요? <Link to="/signup">회원가입</Link>
            </p>
        </div>
    );
}
