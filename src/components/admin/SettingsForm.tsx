'use client'

import { useState, useTransition } from 'react'
import { updateMultipleSettings } from '@/lib/actions/settings'

interface SettingsFormProps {
  initialSettings: Record<string, string>
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState({
    setmore_url: initialSettings.setmore_url ?? '',
    contact_email: initialSettings.contact_email ?? '',
    whatsapp_number: initialSettings.whatsapp_number ?? '',
    facebook_url: initialSettings.facebook_url ?? '',
    instagram_url: initialSettings.instagram_url ?? '',
  })
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const result = await updateMultipleSettings(settings)

      if (result.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(result.error ?? 'Failed to save settings')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Settings saved successfully
        </div>
      )}

      {/* Booking Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-brand-black mb-4">
          Booking Integration
        </h2>

        <div>
          <label
            htmlFor="setmore_url"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Setmore Booking URL
          </label>
          <input
            id="setmore_url"
            type="url"
            value={settings.setmore_url}
            onChange={(e) => handleChange('setmore_url', e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
            placeholder="https://booking.setmore.com/..."
          />
          <p className="mt-1 text-sm text-neutral-500">
            Your Setmore booking page URL. Find this in your Setmore dashboard.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-brand-black mb-4">
          Contact Information
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="contact_email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Contact Email
            </label>
            <input
              id="contact_email"
              type="email"
              value={settings.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
              placeholder="admin@nirvanaoptical.com"
            />
            <p className="mt-1 text-sm text-neutral-500">
              Email address for contact form notifications.
            </p>
          </div>

          <div>
            <label
              htmlFor="whatsapp_number"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              WhatsApp Number
            </label>
            <input
              id="whatsapp_number"
              type="tel"
              value={settings.whatsapp_number}
              onChange={(e) => handleChange('whatsapp_number', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
              placeholder="+27123456789"
            />
            <p className="mt-1 text-sm text-neutral-500">
              Include country code (e.g., +27 for South Africa).
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-brand-black mb-4">
          Social Media
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="facebook_url"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Facebook Page URL
            </label>
            <input
              id="facebook_url"
              type="url"
              value={settings.facebook_url}
              onChange={(e) => handleChange('facebook_url', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label
              htmlFor="instagram_url"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Instagram Profile URL
            </label>
            <input
              id="instagram_url"
              type="url"
              value={settings.instagram_url}
              onChange={(e) => handleChange('instagram_url', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-brand-green-600 text-white rounded-md hover:bg-brand-green-700 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
