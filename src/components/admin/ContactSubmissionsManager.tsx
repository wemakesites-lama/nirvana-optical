'use client'

import { useState, useTransition } from 'react'
import { markSubmissionAsRead, deleteSubmission } from '@/lib/actions/contact'
import type { ContactSubmission } from '@/lib/database.types'

interface ContactSubmissionsManagerProps {
  submissions: ContactSubmission[]
}

export function ContactSubmissionsManager({
  submissions: initialSubmissions,
}: ContactSubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null)
  const [isPending, startTransition] = useTransition()
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'unread') return !s.is_read
    if (filter === 'read') return s.is_read
    return true
  })

  const unreadCount = submissions.filter((s) => !s.is_read).length

  const handleView = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)

    if (!submission.is_read) {
      setSubmissions(
        submissions.map((s) =>
          s.id === submission.id ? { ...s, is_read: true } : s
        )
      )

      startTransition(async () => {
        await markSubmissionAsRead(submission.id)
      })
    }
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    setSubmissions(submissions.filter((s) => s.id !== id))
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null)
    }

    startTransition(async () => {
      await deleteSubmission(id)
    })
  }

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="w-1/2">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-brand-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'unread'
                ? 'bg-brand-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'read'
                ? 'bg-brand-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Read ({submissions.length - unreadCount})
          </button>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
            <p className="text-neutral-600">No messages to show</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSubmissions.map((submission) => (
              <button
                key={submission.id}
                onClick={() => handleView(submission)}
                className={`w-full text-left bg-white rounded-lg shadow-sm border p-4 transition-colors ${
                  selectedSubmission?.id === submission.id
                    ? 'border-brand-green-500 ring-1 ring-brand-green-500'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      submission.is_read ? 'bg-neutral-300' : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-medium truncate ${
                          submission.is_read
                            ? 'text-neutral-700'
                            : 'text-brand-black'
                        }`}
                      >
                        {submission.name}
                      </span>
                      <span className="text-xs text-neutral-500 flex-shrink-0">
                        {new Date(submission.created_at).toLocaleDateString(
                          'en-ZA',
                          {
                            day: 'numeric',
                            month: 'short',
                          }
                        )}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        submission.is_read
                          ? 'text-neutral-500'
                          : 'text-neutral-700'
                      }`}
                    >
                      {submission.subject || 'No subject'}
                    </p>
                    <p className="text-sm text-neutral-500 truncate">
                      {submission.message}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail View */}
      <div className="w-1/2">
        {selectedSubmission ? (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-brand-black">
                  {selectedSubmission.name}
                </h2>
                <p className="text-neutral-600">
                  {selectedSubmission.subject || 'No subject'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(selectedSubmission.id)}
                disabled={isPending}
                className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="text-brand-green-600 hover:underline"
                >
                  {selectedSubmission.email}
                </a>
              </div>

              {selectedSubmission.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${selectedSubmission.phone}`}
                    className="text-brand-green-600 hover:underline"
                  >
                    {selectedSubmission.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(selectedSubmission.created_at).toLocaleString(
                  'en-ZA',
                  {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }
                )}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <h3 className="text-sm font-medium text-neutral-700 mb-2">
                Message
              </h3>
              <div className="prose prose-neutral prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-neutral-700">
                  {selectedSubmission.message}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-neutral-200">
              <a
                href={`mailto:${selectedSubmission.email}?subject=Re: ${
                  selectedSubmission.subject || 'Your enquiry'
                }`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-green-600 text-white px-4 py-2 rounded-md hover:bg-brand-green-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply via Email
              </a>
              {selectedSubmission.phone && (
                <a
                  href={`tel:${selectedSubmission.phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center text-neutral-500">
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  )
}
