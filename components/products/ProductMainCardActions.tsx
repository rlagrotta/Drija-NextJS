"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductDatasheetModal } from "@/components/products/ProductDatasheetModal";
import type { ProductDatasheet } from "@/types/product";

import styles from "./ProductMainCard.module.css";

type ProductMainCardActionsProps = {
  productName: string;
  datasheet?: ProductDatasheet;
  whereToBuyHref: string;
  learnMoreLabel: string;
  whereToBuyLabel: string;
  closeModalLabel: string;
  downloadDatasheetLabel: string;
  downloadCatalogLabel: string;
  catalogDownloadHref: string;
};

export function ProductMainCardActions({
  productName,
  datasheet,
  whereToBuyHref,
  learnMoreLabel,
  whereToBuyLabel,
  closeModalLabel,
  downloadDatasheetLabel,
  downloadCatalogLabel,
  catalogDownloadHref,
}: ProductMainCardActionsProps) {
  const [datasheetOpen, setDatasheetOpen] = useState(false);

  return (
    <>
      <div className={styles.actions}>
        {datasheet ? (
          <button
            type="button"
            className={styles.learnMore}
            onClick={() => setDatasheetOpen(true)}
          >
            {learnMoreLabel}
          </button>
        ) : null}
        <Link href={whereToBuyHref} className={styles.whereToBuy}>
          {whereToBuyLabel}
        </Link>
      </div>

      {datasheet ? (
        <ProductDatasheetModal
          open={datasheetOpen}
          onClose={() => setDatasheetOpen(false)}
          productName={productName}
          datasheet={datasheet}
          closeLabel={closeModalLabel}
          downloadDatasheetLabel={downloadDatasheetLabel}
          downloadCatalogLabel={downloadCatalogLabel}
          catalogDownloadHref={catalogDownloadHref}
        />
      ) : null}
    </>
  );
}
