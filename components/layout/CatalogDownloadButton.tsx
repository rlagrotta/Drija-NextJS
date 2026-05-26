"use client";

import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site";

import styles from "./CatalogDownloadButton.module.css";

export function CatalogDownloadButton() {
  const { dict } = useI18n();

  return (
    <a
      href={siteConfig.catalogDownloadUrl}
      download
      className={styles.button}
      aria-label={dict.catalogDownload.ariaLabel}
    >
      <span className={styles.line}>{dict.catalogDownload.line1}</span>
      <span className={styles.line}>{dict.catalogDownload.line2}</span>
    </a>
  );
}
