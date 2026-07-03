"use client";

import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import type { SupportCatalogAsset } from "@/types/support-catalog";
import { CatalogDearFlipCover } from "@/components/catalogs/CatalogDearFlipCover";

import styles from "./CatalogPage.module.css";

type CatalogPageContentProps = {
  activeCatalog: SupportCatalogAsset;
  downloads: {
    es: SupportCatalogAsset;
    en: SupportCatalogAsset;
  };
  heading: string;
  openLabel: string;
  loadingLabel: string;
  downloadEsLabel: string;
  downloadEnLabel: string;
  attribution: string;
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function CatalogPageContent({
  activeCatalog,
  downloads,
  heading,
  openLabel,
  loadingLabel,
  downloadEsLabel,
  downloadEnLabel,
  attribution,
  helpTitle,
  helpItems,
}: CatalogPageContentProps) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>{heading}</h1>

          <CatalogDearFlipCover
            key={activeCatalog.pdf}
            pdfUrl={activeCatalog.pdf}
            coverSrc={activeCatalog.cover.src}
            coverAlt={activeCatalog.cover.alt}
            coverWidth={activeCatalog.cover.width}
            coverHeight={activeCatalog.cover.height}
            openLabel={openLabel}
            loadingLabel={loadingLabel}
          />

          <div className={styles.downloads}>
            <a
              href={downloads.es.pdf}
              download={downloads.es.downloadFilename}
              className={styles.downloadButton}
            >
              {downloadEsLabel}
            </a>
            <a
              href={downloads.en.pdf}
              download={downloads.en.downloadFilename}
              className={styles.downloadButton}
            >
              {downloadEnLabel}
            </a>
          </div>

          <p
            className={styles.attribution}
            dangerouslySetInnerHTML={{ __html: attribution }}
          />
        </div>
      </div>

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
