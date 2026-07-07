"use client";

import Image from "next/image";
import { useDearFlipTrigger } from "@/hooks/useDearFlipTrigger";

import styles from "./CatalogPromoSection.module.css";

type CatalogPromoSectionProps = {
  title: string;
  viewCatalogLabel: string;
  downloadCatalogLabel: string;
  loadingLabel: string;
  pdfUrl: string;
  downloadHref: string;
  bannerImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function CatalogPromoSection({
  title,
  viewCatalogLabel,
  downloadCatalogLabel,
  loadingLabel,
  pdfUrl,
  downloadHref,
  bannerImage,
}: CatalogPromoSectionProps) {
  const { triggerRef, scriptsReady, openFlipbook } = useDearFlipTrigger(
    pdfUrl,
    viewCatalogLabel,
  );

  return (
    <section className={styles.section} aria-labelledby="catalog-promo-title">
      <div className={styles.inner}>
        <h2 id="catalog-promo-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.button}
            onClick={openFlipbook}
            disabled={!scriptsReady}
          >
            {viewCatalogLabel}
          </button>
          <a href={downloadHref} download className={styles.button}>
            {downloadCatalogLabel}
          </a>
        </div>

        <div className={styles.banner}>
          <button
            type="button"
            className={styles.bannerButton}
            onClick={openFlipbook}
            disabled={!scriptsReady}
            aria-label={viewCatalogLabel}
            aria-busy={!scriptsReady}
          >
            <span
              className={styles.bannerFrame}
              style={{
                aspectRatio: `${bannerImage.width} / ${bannerImage.height}`,
              }}
            >
              <Image
                src={bannerImage.src}
                alt={bannerImage.alt}
                width={bannerImage.width}
                height={bannerImage.height}
                className={styles.bannerImage}
                sizes="(max-width: 873px) 100vw, 873px"
              />
            </span>
            {!scriptsReady ? <span className="sr-only">{loadingLabel}</span> : null}
          </button>
        </div>

        <div className={styles.hiddenTrigger} aria-hidden="true">
          <div ref={triggerRef} />
        </div>
      </div>
    </section>
  );
}
