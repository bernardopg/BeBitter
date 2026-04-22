import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    getServerViewportSnapshot,
  );
}

function subscribeToMobileViewport(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

const getMobileViewportSnapshot = () =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

const getServerViewportSnapshot = () => false;
