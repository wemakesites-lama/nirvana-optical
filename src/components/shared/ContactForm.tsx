"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setError(result.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-green-200 bg-brand-green-50 p-8 text-center" role="alert" aria-live="polite">
        <svg className="mx-auto h-12 w-12 text-brand-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-brand-black">
          Message Sent
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for contacting us. We&rsquo;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-brand-black"
          >
            Full Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name..."
            className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground transition-colors duration-200 focus:border-brand-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-brand-black"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com..."
            className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground transition-colors duration-200 focus:border-brand-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-brand-black"
        >
          Phone Number{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Your phone number..."
          className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground transition-colors duration-200 focus:border-brand-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-brand-black"
        >
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          placeholder="What is this about..."
          className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground transition-colors duration-200 focus:border-brand-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-brand-black"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help..."
          className="mt-1.5 w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-sm text-brand-black placeholder:text-muted-foreground transition-colors duration-200 focus:border-brand-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-green-500 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2 disabled:opacity-70 sm:w-auto"
      >
        {isPending ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
