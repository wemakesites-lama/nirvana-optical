import { Suspense } from 'react'
import { getSiteSettings } from '@/lib/db/queries'
import { SettingsForm } from '@/components/admin/SettingsForm'

export const metadata = {
  title: 'Settings | Nirvana Optical Admin',
}

export default function SettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-black">Settings</h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-1">
          Configure site-wide settings and integrations
        </p>
      </div>

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  )
}

async function SettingsContent() {
  const settings = await getSiteSettings()

  return <SettingsForm initialSettings={settings} />
}

function SettingsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 sm:p-6 animate-pulse">
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-neutral-200 rounded w-32 mb-2" />
            <div className="h-10 bg-neutral-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
