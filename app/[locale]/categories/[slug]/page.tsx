import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getPageI18n(params);
  const category = await getCms().getCategoryBySlug(slug, locale);
  if (!category) return { title: "Not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const { slug } = await params;
  const category = await getCms().getCategoryBySlug(slug, locale);

  if (!category) notFound();

  const products = await getCms().getProducts({ categorySlug: slug, locale });

  return (
    <>
      <PageHeader title={category.name} description={category.description} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <p className="text-neutral-600">{dict.products.comingSoon}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
