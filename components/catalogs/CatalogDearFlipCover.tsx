"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useDearFlipTrigger } from "@/hooks/useDearFlipTrigger";

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
  const { triggerRef, scriptsReady, openFlipbook } = useDearFlipTrigger(
    pdfUrl,
    openLabel,
  );

  const handleCoverClick = useCallback(() => {
    openFlipbook();
  }, [openFlipbook]);

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
