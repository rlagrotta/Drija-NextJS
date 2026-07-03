"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    DFLIP?: {
      parseBooks: () => void;
    };
    dFlipLocation?: string;
    jQuery?: unknown;
  }
}

let dearFlipScriptsPromise: Promise<void> | null = null;

function loadStylesheet(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src: string): Promise<void> {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

function loadDearFlipScripts(): Promise<void> {
  if (dearFlipScriptsPromise) {
    return dearFlipScriptsPromise;
  }

  dearFlipScriptsPromise = (async () => {
    window.dFlipLocation = "/dearflip/";

    loadStylesheet("/dearflip/css/dflip.min.css");
    loadStylesheet("/dearflip/css/themify-icons.min.css");

    await loadScript("/dearflip/js/libs/jquery.min.js");
    await loadScript("/dearflip/js/dflip.min.js");
  })();

  return dearFlipScriptsPromise;
}

export function useDearFlipScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadDearFlipScripts()
      .then(() => {
        if (!cancelled) {
          setReady(true);
        }
      })
      .catch((error) => {
        console.error("DearFlip failed to load:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

export function parseDearFlipElements() {
  window.DFLIP?.parseBooks();
}
