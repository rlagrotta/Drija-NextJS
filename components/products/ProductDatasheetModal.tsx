"use client";

import Image from "next/image";
import { useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductDatasheet } from "@/types/product";

import styles from "./ProductDatasheetModal.module.css";

type ProductDatasheetModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  datasheet: ProductDatasheet;
  closeLabel: string;
  downloadDatasheetLabel: string;
  downloadCatalogLabel: string;
  catalogDownloadHref: string;
};

function DownloadIcon() {
  return (
    <svg
      className={styles.downloadIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 4v12M7 13l5 5 5-5M5 20h14" />
    </svg>
  );
}

export function ProductDatasheetModal({
  open,
  onClose,
  productName,
  datasheet,
  closeLabel,
  downloadDatasheetLabel,
  downloadCatalogLabel,
  catalogDownloadHref,
}: ProductDatasheetModalProps) {
  const titleId = useId();
  const downloadHref = datasheet.downloadUrl ?? datasheet.image.src;
  const cropEmbeddedHeader = datasheet.cropHeader ?? false;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={styles.dialog}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.toolbar}>
              <a
                href={downloadHref}
                download
                className={styles.downloadButton}
              >
                {downloadDatasheetLabel}
                <DownloadIcon />
              </a>
              <a
                href={catalogDownloadHref}
                download
                className={styles.downloadButton}
              >
                {downloadCatalogLabel}
                <DownloadIcon />
              </a>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label={closeLabel}
              >
                <svg
                  className={styles.closeIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className={styles.body}>
              <h2 id={titleId} className="sr-only">
                {productName}
              </h2>
              <div className={styles.imageFrame}>
                <Image
                  src={datasheet.image.src}
                  alt={datasheet.image.alt}
                  width={2400}
                  height={1600}
                  className={
                    cropEmbeddedHeader
                      ? styles.datasheetImageCropped
                      : styles.datasheetImage
                  }
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
