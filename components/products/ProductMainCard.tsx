import { ProductImageSlider } from "@/components/products/ProductImageSlider";
import { ProductMainCardActions } from "@/components/products/ProductMainCardActions";
import { ProductSpecsTable } from "@/components/products/ProductSpecsTable";
import type { Product } from "@/types/product";

import styles from "./ProductMainCard.module.css";

type ProductMainCardProps = {
  product: Product;
  whereToBuyHref: string;
  learnMoreLabel: string;
  whereToBuyLabel: string;
  closeModalLabel: string;
  downloadDatasheetLabel: string;
  downloadCatalogLabel: string;
  catalogDownloadHref: string;
  specsTitle: string;
  prevImageLabel: string;
  nextImageLabel: string;
};

export function ProductMainCard({
  product,
  whereToBuyHref,
  learnMoreLabel,
  whereToBuyLabel,
  closeModalLabel,
  downloadDatasheetLabel,
  downloadCatalogLabel,
  catalogDownloadHref,
  specsTitle,
  prevImageLabel,
  nextImageLabel,
}: ProductMainCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <ProductImageSlider
          images={product.images}
          prevLabel={prevImageLabel}
          nextLabel={nextImageLabel}
        />

        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          <ProductSpecsTable
            title={specsTitle}
            specs={product.specs}
            specsHtml={product.specsHtml}
          />

          <ProductMainCardActions
            productName={product.name}
            datasheet={product.datasheet}
            whereToBuyHref={whereToBuyHref}
            learnMoreLabel={learnMoreLabel}
            whereToBuyLabel={whereToBuyLabel}
            closeModalLabel={closeModalLabel}
            downloadDatasheetLabel={downloadDatasheetLabel}
            downloadCatalogLabel={downloadCatalogLabel}
            catalogDownloadHref={catalogDownloadHref}
          />
        </div>
      </div>
    </div>
  );
}
