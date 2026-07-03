"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { parseDearFlipElements, useDearFlipScripts } from "@/hooks/useDearFlipScripts";

import styles from "./CatalogPage.module.css";

type CatalogDearFlipCoverProps = {
  pdfUrl: string;
  coverSrc: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  openLabel: string;
  loadingLabel: string;
};

export function CatalogDearFlipCover({
  pdfUrl,
  coverSrc,
  coverAlt,
  coverWidth,
  coverHeight,
  openLabel,
  loadingLabel,
}: CatalogDearFlipCoverProps) {
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

  const handleCoverClick = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    trigger.click();
  }, []);

  return (
    <div className={styles.coverSection}>
      <button
        type="button"
        className={styles.coverButton}
        onClick={handleCoverClick}
        disabled={!scriptsReady}
        aria-label={openLabel}
        aria-busy={!scriptsReady}
      >
        <span
          className={styles.coverFrame}
          style={{ aspectRatio: `${coverWidth} / ${coverHeight}` }}
        >
          <Image
            src={coverSrc}
            alt={coverAlt}
            width={coverWidth}
            height={coverHeight}
            className={styles.coverImage}
            priority
          />
        </span>
        {!scriptsReady ? <span className="sr-only">{loadingLabel}</span> : null}
      </button>

      <p className={styles.openHint}>{openLabel}</p>

      <div className={styles.hiddenTrigger} aria-hidden="true">
        <div ref={triggerRef} />
      </div>
    </div>
  );
}
