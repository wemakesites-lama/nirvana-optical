import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/db/queries";
import { renderContent, isHTML } from "@/lib/utils/markdown";
import type { BlogPost } from "@/lib/database.types";

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getBlogPostBySlug(slug);
  const post = data as BlogPost | null;

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch post and related posts in parallel for faster TTFB
  const [
    { data, error },
    { data: allPosts }
  ] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts("published")
  ]);

  const post = data as BlogPost | null;

  if (error || !post || post.status !== "published") {
    notFound();
  }
  const posts = (allPosts ?? []) as BlogPost[];
  const otherPosts = posts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Render content - handles both HTML and markdown
  const renderedContent = isHTML(post.content)
    ? post.content
    : renderContent(post.content);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-green-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-100">
                <svg className="h-4 w-4 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-brand-black">{post.author || 'Nirvana Optical Team'}</span>
                <span className="block text-xs text-muted-foreground">Optometry Expert</span>
              </div>
            </div>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.published_at ?? post.created_at}>
              {formatDate(post.published_at ?? post.created_at)}
            </time>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative aspect-[21/9] max-w-5xl mx-auto -mt-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover rounded-xl shadow-lg"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article className="px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl prose text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </article>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="border-t border-border bg-brand-green-50/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-brand-black">
              More Articles
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {otherPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group rounded-2xl border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  <h3 className="text-lg font-semibold text-brand-black transition-colors duration-200 group-hover:text-brand-green-600">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <time dateTime={related.published_at ?? related.created_at}>
                      {formatDate(related.published_at ?? related.created_at)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
