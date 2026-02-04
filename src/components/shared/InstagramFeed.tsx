import Image from "next/image";
import type { InstagramPost } from "@/lib/database.types";

interface InstagramFeedProps {
  posts: InstagramPost[];
}

export function InstagramFeed({ posts }: InstagramFeedProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Show max 6 posts
  const displayPosts = posts.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      {/* Subtle geometric accents */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0" y1="20" x2="100" y2="20"
          stroke="var(--color-brand-green-200)"
          strokeWidth="0.08"
          opacity="0.25"
        />
        <line
          x1="0" y1="80" x2="100" y2="80"
          stroke="var(--color-brand-green-200)"
          strokeWidth="0.08"
          opacity="0.25"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-green-600">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Follow Us on Instagram</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
            Latest from Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See our latest frames, happy customers, and behind-the-scenes moments.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
          {displayPosts.map((post, index) => (
            <a
              key={post.id}
              href={post.permalink || `https://instagram.com/nirvana_optical`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-brand-green-50"
            >
              {/* Corner accent marks - alternating pattern */}
              {index % 3 === 0 && (
                <>
                  <span className="absolute left-0 top-0 z-10 h-4 w-px bg-brand-green-400/40 transition-all duration-300 group-hover:h-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                  <span className="absolute left-0 top-0 z-10 h-px w-4 bg-brand-green-400/40 transition-all duration-300 group-hover:w-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                </>
              )}
              {index % 3 === 1 && (
                <>
                  <span className="absolute right-0 top-0 z-10 h-4 w-px bg-brand-green-400/40 transition-all duration-300 group-hover:h-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                  <span className="absolute right-0 top-0 z-10 h-px w-4 bg-brand-green-400/40 transition-all duration-300 group-hover:w-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                </>
              )}
              {index % 3 === 2 && (
                <>
                  <span className="absolute bottom-0 left-0 z-10 h-4 w-px bg-brand-green-400/40 transition-all duration-300 group-hover:h-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                  <span className="absolute bottom-0 left-0 z-10 h-px w-4 bg-brand-green-400/40 transition-all duration-300 group-hover:w-6 group-hover:bg-brand-green-500/60" aria-hidden="true" />
                </>
              )}

              <Image
                src={post.image_url}
                alt={post.caption || "Instagram post"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />

              {/* Hover overlay with engagement stats */}
              <div className="absolute inset-0 flex items-center justify-center bg-brand-green-600/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-6 text-white">
                  {/* Likes */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-semibold">{post.like_count.toLocaleString()}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                    </svg>
                    <span className="font-semibold">{post.comment_count.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* External link icon */}
              <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-2">
                  <svg
                    className="h-4 w-4 text-brand-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com/nirvana_optical"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @nirvana_optical
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
