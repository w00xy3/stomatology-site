"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
    } | null;
  }
}

export function useLenis() {
  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset });
    }
  }, []);

  return { scrollTo };
}
