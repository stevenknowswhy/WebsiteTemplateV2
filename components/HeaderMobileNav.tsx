// Pseudo-example: when nav open, focus first link and trap focus until closed
import { useEffect, useRef } from "react";

export function HeaderMobileNav({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = ref.current?.querySelector<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])");
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const focusables = ref.current
        ? Array.from(ref.current.querySelectorAll<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])"))
        : [];
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        lastEl.focus(); e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        firstEl.focus(); e.preventDefault();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return open ? (
    <div ref={ref} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
}