"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/*
 * Start each newly visited page at the top. Without this, client navigation could keep the previous
 * page's scroll position and land visitors at the bottom of the next page.
 * Skipped for links with a #hash (they scroll to their target) and for Back/Forward,
 * where the browser restores the previous position.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);
  const historyNav = useRef(false);

  useEffect(() => {
    const onPop = () => (historyNav.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (historyNav.current) {
      historyNav.current = false;
      return;
    }
    const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
