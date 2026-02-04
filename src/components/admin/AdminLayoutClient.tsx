'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

interface AdminLayoutClientProps {
  children: React.ReactNode
  userEmail?: string
}

export function AdminLayoutClient({ children, userEmail }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  // Close sidebar on route change (mobile)
  // This is intentional - we need to sync UI state with route changes
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarOpen(false)
      previousPathname.current = pathname
    }
  }, [pathname])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          userEmail={userEmail}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
