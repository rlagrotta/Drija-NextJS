"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { parseDearFlipElements, useDearFlipScripts } from "@/hooks/useDearFlipScripts";

import styles from "./CatalogPage.module.css";

type CatalogDearFlipCoverProps = {
  pdfUrl: string;
  coverSrc: string;
  coverAlt: string;
  openLabel: string;
  loadingLabel: string;
};

export function CatalogDearFlipCover({
  pdfUrl,
  coverSrc,
  coverAlt,
  openLabel,
  loadingLabel,
}: CatalogDearFlipCoverProps) {
  const scriptsReady = useDearFlipScripts();
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!scriptsReady || !thumb) {
      return;
    }

    thumb.className = "_df_thumb";
    thumb.setAttribute("source", pdfUrl);
    thumb.setAttribute("thumb", coverSrc);
    thumb.setAttribute("aria-label", openLabel);
    thumb.setAttribute("role", "button");
    thumb.removeAttribute("df-parsed");
    thumb.innerHTML = "";

    parseDearFlipElements();
  }, [scriptsReady, pdfUrl, coverSrc, openLabel]);

  return (
    <div className={styles.coverSection}>
      {scriptsReady ? (
        <>
          <div className={styles.flipbookHost}>
            <div ref={thumbRef} />
          </div>
          <p className={styles.openHint}>{openLabel}</p>
        </>
      ) : (
        <button type="button" className={styles.coverLoading} disabled aria-busy="true">
          <Image
            src={coverSrc}
            alt={coverAlt}
            width={672}
            height={420}
            className={styles.coverImage}
            priority
          />
          <span className="sr-only">{loadingLabel}</span>
        </button>
      )}
    </div>
  );
}
