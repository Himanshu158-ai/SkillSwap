"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastItem({ id, message, type = "info", duration = 4000, onRemove }) {
  const [isDismissing, setIsDismissing] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(duration);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      triggerDismiss();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
    }
  };

  const resumeTimer = () => {
    if (remainingTimeRef.current > 0) {
      startTimer();
    }
  };

  const triggerDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onRemove(id);
    }, 300); // Matches the toast-out-right CSS animation duration
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Icons configurations
  const icons = {
    success: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const themeClasses = {
    success: "border-emerald-500/30 shadow-emerald-950/20 shadow-lg hover:border-emerald-500/50",
    error: "border-rose-500/30 shadow-rose-950/20 shadow-lg hover:border-rose-500/50",
    warning: "border-amber-500/30 shadow-amber-950/20 shadow-lg hover:border-amber-500/50",
    info: "border-sky-500/30 shadow-sky-950/20 shadow-lg hover:border-sky-500/50",
  };

  const progressBg = {
    success: "from-emerald-500 to-teal-400",
    error: "from-rose-500 to-red-400",
    warning: "from-amber-500 to-orange-400",
    info: "from-sky-500 to-indigo-400",
  };

  const titles = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Notification",
  };

  return (
    <div
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className={`toast-card pointer-events-auto w-full max-w-sm backdrop-blur-md bg-slate-950/80 border rounded-xl p-4 overflow-hidden relative flex items-start gap-3 shadow-2xl transition-all duration-300 ${
        themeClasses[type]
      } ${isDismissing ? "animate-toast-out" : "animate-toast-in"}`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      
      <div className="flex-grow min-w-0 pr-4">
        <h4 className="text-sm font-semibold text-white mb-0.5 capitalize">
          {titles[type]}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed break-words">
          {message}
        </p>
      </div>

      <button
        onClick={triggerDismiss}
        className="flex-shrink-0 text-slate-400 hover:text-white transition duration-150 rounded-lg p-0.5 hover:bg-slate-800/50 focus:outline-none cursor-pointer"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Auto-dismiss progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${progressBg[type]} toast-progress`}
        style={{
          animationDuration: `${duration}ms`,
        }}
      />
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toastMethods = {
    success: (msg, dur) => addToast(msg, "success", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
    warning: (msg, dur) => addToast(msg, "warning", dur),
    info: (msg, dur) => addToast(msg, "info", dur),
  };

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
