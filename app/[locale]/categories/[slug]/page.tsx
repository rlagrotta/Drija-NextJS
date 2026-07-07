import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/categories/CategoryHero";
import { CategoryPageFooter } from "@/components/categories/CategoryPageFooter";
import { SubcategoryQuickNav } from "@/components/categories/SubcategoryQuickNav";
import { SubcategorySection } from "@/components/categories/SubcategorySection";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryPageData } from "@/lib/category-page";
import { getFeaturedSlidesData } from "@/lib/featured-slides";
import { getPageI18n } from "@/lib/i18n/server";
import { getSupportCatalogForLocale } from "@/lib/support/catalogs/page";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getPageI18n(params);
  const pageData = await getCategoryPageData(slug, locale);
  if (!pageData) return { title: "Not found" };
  return {
    title: pageData.category.name,
    description: pageData.category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { slug } = await params;
  const pageData = await getCategoryPageData(slug, locale);

  if (!pageData) notFound();

  const { category, config, productsBySubcategory, ungroupedProducts } =
    pageData;
  const hasSubcategories = config.subcategories.length > 0;
  const cp = dict.categoryPage;
  const catalog = getSupportCatalogForLocale(locale);
  const featuredSlides = getFeaturedSlidesData(locale);
  const footer = (
    <CategoryPageFooter
      dict={dict}
      catalog={catalog}
      categoriasSlides={featuredSlides.categorias}
      nuevoSlides={featuredSlides.nuevo}
    />
  );

  if (!hasSubcategories) {
    const products = [...ungroupedProducts, ...Object.values(productsBySubcategory).flat()];

    return (
      <>
        <PageHeader title={category.name} description={category.description} />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <p className="text-neutral-600">{dict.products.comingSoon}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
        {footer}
      </>
    );
  }

  return (
    <>
      <CategoryHero title={category.name} image={config.heroImage} />

      <SubcategoryQuickNav subcategories={config.subcategories} />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {config.subcategories.map((sub) => (
          <SubcategorySection
            key={sub.id}
            subcategory={sub}
            products={productsBySubcategory[sub.slug] ?? []}
            locale={locale}
            viewProductLabel={cp.viewProduct}
          />
        ))}

        {ungroupedProducts.length > 0 && (
          <SubcategorySection
            subcategory={{
              id: "otros",
              slug: "otros",
              name: cp.otherProducts,
              icon: { src: category.image.src, alt: category.image.alt },
            }}
            products={ungroupedProducts}
            locale={locale}
            viewProductLabel={cp.viewProduct}
          />
        )}
      </div>

      {footer}
    </>
  );
}
