import { BlogForm } from '@/components/admin/BlogForm'

export const metadata = {
  title: 'New Blog Post | Nirvana Optical Admin',
}

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-black">New Blog Post</h1>
        <p className="text-neutral-600 mt-1">
          Create a new article for your blog
        </p>
      </div>

      <BlogForm />
    </div>
  )
}
