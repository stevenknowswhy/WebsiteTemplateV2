"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ToastProps {
  id: string;
  message: string;
  type?: "info" | "error" | "success" | "warning";
  onClose: (id: string) => void;
}

export function Toast({ message, type = "info", onClose, id }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [onClose, id]);

  const bgColor = {
    info: "bg-blue-600",
    error: "bg-red-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
  }[type];

  return createPortal(
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-4 right-4 rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-300 transform ${bgColor}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => onClose(id)}
          className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body
  );
}

interface ToastContainerProps {
  children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
  return createPortal(
    <div className="fixed top-4 right-4 z-[10000] space-y-2">
      {children}
    </div>,
    document.body
  );
}