"use client";
import { useEffect, useState } from "react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem("consent");
    if (!v) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 bg-neutral-900 text-white p-4 flex items-center justify-between gap-4">
      <p className="text-sm">
        We use cookies for essential functionality. Manage your preferences in Settings.
      </p>
      <div className="flex gap-2">
        <button
          className="rounded bg-white text-black px-3 py-2 text-sm"
          onClick={() => { localStorage.setItem("consent", "essential"); setVisible(false); }}
        >
          Allow essential
        </button>
        <a className="underline text-sm" href="/privacy">Learn more</a>
      </div>
    </div>
  );
}