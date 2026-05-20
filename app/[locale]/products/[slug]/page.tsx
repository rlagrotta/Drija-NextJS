import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
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
  const product = await getCms().getProductBySlug(slug, locale);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { slug } = await params;
  const product = await getCms().getProductBySlug(slug, locale);

  if (!product) notFound();

  const category = await getCms().getCategoryBySlug(product.categorySlug, locale);
  const image = product.images[0];

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-neutral-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={href("/productos")} className="hover:text-drija-green">
              {dict.products.breadcrumbProducts}
            </Link>
          </li>
          {category && (
            <>
              <li>/</li>
              <li>
                <Link
                  href={href(`/categories/${category.slug}`)}
                  className="hover:text-drija-green"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li>/</li>
          <li className="text-neutral-800">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
          {image && (
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>

        <div>
          {product.isNew && (
            <span className="rounded-full bg-drija-green px-3 py-1 text-xs font-bold uppercase text-white">
              {dict.products.newBadge}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {dict.products.sku}: {product.sku}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">
            {product.description}
          </p>

          {product.specs && product.specs.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-neutral-900">
                {dict.products.specs}
              </h2>
              <dl className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 px-4 py-3 text-sm"
                  >
                    <dt className="font-medium text-neutral-600">
                      {spec.label}
                    </dt>
                    <dd className="text-neutral-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={href("/donde-comprar")}
              className="inline-flex rounded-full bg-drija-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-drija-green-dark"
            >
              {dict.products.whereToBuy}
            </Link>
            <Link
              href={href("/contacto")}
              className="inline-flex rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold uppercase tracking-wide hover:border-drija-green hover:text-drija-green"
            >
              {dict.products.inquire}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
