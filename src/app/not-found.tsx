import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Decorative eye */}
      <div className="relative" aria-hidden="true">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-brand-green-100">
          <svg
            className="h-16 w-16 text-brand-green-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-500 text-lg font-bold text-white">
          ?
        </div>
      </div>

      <h1 className="mt-8 text-4xl font-bold tracking-tight text-brand-black sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        We can&rsquo;t seem to find what you&rsquo;re looking for. The page may
        have been moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-brand-black transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
