"use client";

import { useState, useSyncExternalStore, useCallback } from "react";

// Subscribe to storage events (for cross-tab sync)
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// Get current consent from localStorage
function getSnapshot() {
  return localStorage.getItem("cookie-consent");
}

// Server snapshot - return a value that indicates "not yet determined"
function getServerSnapshot() {
  return "pending";
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const handleAccept = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setDismissed(true);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setDismissed(true);
  }, []);

  // Don't render during SSR (pending), if consent exists, or if just dismissed
  if (consent === "pending" || consent !== null || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience on our website. By continuing to browse, you agree to our use of cookies in accordance with our{" "}
          <a href="/privacy" className="font-medium text-brand-green-600 underline hover:text-brand-green-700">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
