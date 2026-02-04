"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/types";

interface MobileNavProps {
  links: readonly NavLink[] | NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-brand-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-transform duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-black transition-transform duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-white px-6 pt-24 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        style={{ overscrollBehavior: "contain" }}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-lg font-medium text-brand-black transition-colors duration-200 hover:bg-brand-green-50 hover:text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-border pt-6">
          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg bg-brand-green-500 px-6 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          >
            Book Eye Test
          </Link>
        </div>
      </nav>
    </div>
  );
}
