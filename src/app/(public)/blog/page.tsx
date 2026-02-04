import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { getBlogPosts } from "@/lib/db/queries";
import type { BlogPost } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Eye Health Blog & Tips",
  description:
    "Expert eye care tips, eyewear guides, and optical health insights from our optometry team at Nirvana Optical in Mahikeng.",
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts("published");
  const publishedPosts = (posts ?? []) as BlogPost[];
  const [featured, ...rest] = publishedPosts;

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Eye care tips, eyewear guides, and insights from our optometry team."
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Featured Post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[16/10] bg-brand-green-50 lg:aspect-auto lg:min-h-[300px] relative overflow-hidden">
                  {featured.featured_image ? (
                    <Image
                      src={featured.featured_image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg
                        className="h-20 w-20 text-brand-green-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={0.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-600">
                    Featured
                  </span>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-black transition-colors duration-200 group-hover:text-brand-green-600 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{featured.author || 'Nirvana Optical Team'}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={featured.published_at ?? featured.created_at}>
                      {formatDate(featured.published_at ?? featured.created_at)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* No posts message */}
          {publishedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[16/10] bg-brand-green-50 relative overflow-hidden">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 text-brand-green-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={0.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-brand-black transition-colors duration-200 group-hover:text-brand-green-600">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.author || 'Nirvana Optical Team'}</span>
                      <span aria-hidden="true">&middot;</span>
                      <time dateTime={post.published_at ?? post.created_at}>
                        {formatDate(post.published_at ?? post.created_at)}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
