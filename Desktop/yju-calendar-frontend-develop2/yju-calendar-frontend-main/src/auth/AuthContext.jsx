import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [init, setInit] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u || null);
            setInit(false);
        });
        return () => unsub();
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthCtx.Provider value={{ user, logout, loading: init }}>
            {children}
        </AuthCtx.Provider>
    );
}
