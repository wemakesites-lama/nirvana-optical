import { notFound } from 'next/navigation'
import { getBlogPostById } from '@/lib/db/queries'
import { BlogForm } from '@/components/admin/BlogForm'

export const metadata = {
  title: 'Edit Blog Post | Nirvana Optical Admin',
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: post, error } = await getBlogPostById(id)

  if (error || !post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-black">Edit Blog Post</h1>
        <p className="text-neutral-600 mt-1">Update your blog article</p>
      </div>

      <BlogForm post={post} />
    </div>
  )
}
