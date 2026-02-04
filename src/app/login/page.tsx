import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { LoginForm } from '@/components/admin/LoginForm'

export const metadata = {
  title: 'Admin Login | Nirvana Optical',
  description: 'Sign in to the Nirvana Optical admin dashboard',
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const { redirectTo } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          <h1 className="text-2xl font-bold text-center text-brand-black mb-2">
            Admin Login
          </h1>
          <p className="text-neutral-600 text-center text-sm mb-6">
            Sign in to manage your website content
          </p>

          <LoginForm redirectTo={redirectTo} />
        </div>

        <p className="text-center text-neutral-500 text-sm mt-6">
          <Link href="/" className="text-brand-green-600 hover:text-brand-green-700">
            &larr; Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
