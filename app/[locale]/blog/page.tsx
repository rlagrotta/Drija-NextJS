import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageDescription,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const posts = await getCms().getBlogPosts({ locale });

  return (
    <>
      <PageHeader
        title={dict.blog.pageTitle}
        description={dict.blog.pageDescription}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
