import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (title: string, message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message: string, type: ToastType = "success", duration = 5000) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, title, message, type, duration };
      
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, duration);
      }
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto w-full bg-[#0E0E0F]/95 backdrop-blur-md border border-white/10 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6)] flex flex-col relative overflow-hidden group"
              id={`toast-${toast.id}`}
            >
              {/* Type Accent Progress/Bar line at top */}
              <div 
                className={`h-[3px] w-full transition-all duration-300 ${
                  toast.type === "success" 
                    ? "bg-emerald-500" 
                    : toast.type === "error" 
                    ? "bg-rose-500" 
                    : "bg-cyan-500"
                }`}
                style={{
                  animation: `shrinkWidth ${toast.duration || 5000}ms linear forwards`
                }}
              />

              <div className="p-4 flex items-start gap-3.5">
                {/* Icon wrapper */}
                <div className="flex-shrink-0 mt-0.5">
                  {toast.type === "success" && (
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  )}
                  {toast.type === "error" && (
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                  )}
                  {toast.type === "info" && (
                    <Info className="h-5 w-5 text-cyan-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0 pr-4">
                  <span className="block font-sans font-bold text-xs uppercase tracking-wider text-white">
                    {toast.title}
                  </span>
                  <p className="mt-1 font-sans text-xs text-zinc-400 font-medium leading-relaxed">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => hideToast(toast.id)}
                  className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors duration-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
