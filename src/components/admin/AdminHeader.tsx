'use client'

import { logout } from '@/lib/actions/auth'
import { useTransition } from 'react'

interface AdminHeaderProps {
  userEmail?: string
  onMenuToggle: () => void
}

export function AdminHeader({ userEmail, onMenuToggle }: AdminHeaderProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <header className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 text-neutral-600 hover:text-brand-black hover:bg-neutral-100 rounded-md"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h2 className="text-base sm:text-lg font-semibold text-brand-black">
          Content Management
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {userEmail && (
          <span className="hidden sm:inline text-sm text-neutral-600 truncate max-w-[200px]">
            {userEmail}
          </span>
        )}

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-sm text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="hidden sm:inline">Signing out...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
