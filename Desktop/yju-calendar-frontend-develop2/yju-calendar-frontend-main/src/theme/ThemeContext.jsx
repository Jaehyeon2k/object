// src/theme/ThemeContext.jsx
// -------------------------------------------
// 전역 테마(Dark / Light) 상태를 관리하는 Context
// - 초기값: LocalStorage → 없으면 'dark' 기본값
// - document.documentElement(data-theme) 에 테마 값을 넣어서
//   CSS 변수로 색상 변경
// -------------------------------------------

import React, { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 브라우저 새로고침해도 유지되도록 LocalStorage 사용
    const saved = window.localStorage.getItem("yju-theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  // theme 값이 바뀔 때마다 DOM & LocalStorage 동기화
  useEffect(() => {
    // <html data-theme="dark"> 형태로 설정
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("yju-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 컴포넌트에서 손쉽게 사용할 수 있게 커스텀 훅 제공
export function useTheme() {
  return useContext(ThemeContext);
}
