"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  parseDearFlipElements,
  useDearFlipScripts,
} from "@/hooks/useDearFlipScripts";

export function useDearFlipTrigger(pdfUrl: string, openLabel: string) {
  const scriptsReady = useDearFlipScripts();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!scriptsReady || !trigger) {
      return;
    }

    trigger.className = "_df_button";
    trigger.setAttribute("source", pdfUrl);
    trigger.textContent = openLabel;
    trigger.removeAttribute("df-parsed");

    parseDearFlipElements();
  }, [scriptsReady, pdfUrl, openLabel]);

  const openFlipbook = useCallback(() => {
    triggerRef.current?.click();
  }, []);

  return { triggerRef, scriptsReady, openFlipbook };
}
