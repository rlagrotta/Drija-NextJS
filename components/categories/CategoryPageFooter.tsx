import { CatalogPromoSection } from "@/components/catalog/CatalogPromoSection";
import { FeaturedTabsSection } from "@/components/home/FeaturedTabsSection";
import type { Dictionary } from "@/lib/i18n/types";
import type { FeaturedSlide } from "@/types/featured-slide";
import type { SupportCatalogAsset } from "@/types/support-catalog";

type CategoryPageFooterProps = {
  dict: Dictionary;
  catalog: SupportCatalogAsset;
  categoriasSlides: FeaturedSlide[];
  nuevoSlides: FeaturedSlide[];
};

export function CategoryPageFooter({
  dict,
  catalog,
  categoriasSlides,
  nuevoSlides,
}: CategoryPageFooterProps) {
  const cp = dict.categoryPage;

  return (
    <>
      <CatalogPromoSection
        title={cp.catalogTitle}
        viewCatalogLabel={cp.viewCatalog}
        downloadCatalogLabel={cp.downloadCatalog}
        loadingLabel={dict.supportCatalogs.flipbookLoading}
        pdfUrl={catalog.pdf}
        downloadHref={catalog.pdf}
        bannerImage={catalog.cover}
      />

      <FeaturedTabsSection
        categoriasSlides={categoriasSlides}
        nuevoSlides={nuevoSlides}
        categoriesLabel={dict.home.categories}
        newArrivalsLabel={dict.home.newArrivals}
        prevLabel={dict.home.featuredPrev}
        nextLabel={dict.home.featuredNext}
        carouselLabel={dict.home.featuredCarousel}
      />
    </>
  );
}
