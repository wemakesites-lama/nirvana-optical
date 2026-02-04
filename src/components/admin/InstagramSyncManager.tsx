"use client";

import { useState } from "react";

interface SyncResult {
  synced: number;
  posts?: Array<{ id: string; caption?: string }>;
}

export function InstagramSyncManager() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/instagram/sync", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sync failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const isConfigured = process.env.NEXT_PUBLIC_INSTAGRAM_CONFIGURED === 'true';

  return (
    <div className="space-y-6">
      {/* Configuration Status */}
      <div className={`rounded-lg border p-6 ${isConfigured ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {isConfigured ? (
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${isConfigured ? 'text-green-900' : 'text-yellow-900'}`}>
              {isConfigured ? 'Instagram API Configured' : 'Instagram API Not Configured'}
            </h3>
            <p className={`mt-1 text-sm ${isConfigured ? 'text-green-700' : 'text-yellow-700'}`}>
              {isConfigured
                ? 'Your Instagram account is connected and ready to sync.'
                : 'Follow the setup guide to connect your Instagram account.'}
            </p>
            {!isConfigured && (
              <a
                href="/INSTAGRAM_API_SETUP.md"
                target="_blank"
                className="mt-2 inline-flex items-center text-sm font-medium text-yellow-800 hover:text-yellow-900"
              >
                View Setup Guide
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sync Button */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Manual Sync</h3>
        <p className="mt-1 text-sm text-gray-600">
          Fetch the latest posts from your Instagram account and update your website.
        </p>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600 disabled:opacity-50"
        >
          {syncing ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Syncing...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync Now
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <h3 className="font-semibold text-green-900">✅ Sync Successful!</h3>
          <p className="mt-1 text-sm text-green-700">
            Synced {result.synced} post{result.synced !== 1 ? 's' : ''} from Instagram.
          </p>
          {result.posts && (
            <div className="mt-4 space-y-2">
              {result.posts.slice(0, 3).map((post, i) => (
                <div key={post.id} className="text-sm text-green-800">
                  {i + 1}. {post.caption?.substring(0, 60)}...
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-900">❌ Sync Failed</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          {error.includes('not configured') && (
            <a
              href="/INSTAGRAM_API_SETUP.md"
              target="_blank"
              className="mt-2 inline-flex items-center text-sm font-medium text-red-800 hover:text-red-900"
            >
              View Setup Guide
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Setup Instructions */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900">Quick Setup</h3>
        <ol className="mt-3 space-y-2 text-sm text-gray-700">
          <li>1. Follow the <a href="/INSTAGRAM_API_SETUP.md" target="_blank" className="text-brand-green-600 hover:underline">Instagram API Setup Guide</a></li>
          <li>2. Add your credentials to <code className="rounded bg-gray-200 px-1 py-0.5">.env.local</code></li>
          <li>3. Restart your dev server</li>
          <li>4. Click &quot;Sync Now&quot; above</li>
        </ol>
      </div>
    </div>
  );
}
