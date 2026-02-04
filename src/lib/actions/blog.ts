'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { blogPostSchema } from '@/lib/validations'
import type { ActionResponse } from '@/lib/types'
import type { BlogPost } from '@/lib/database.types'

export async function createBlogPost(
  formData: FormData
): Promise<ActionResponse<BlogPost>> {
  const supabase = await createClient()

  // Auth check - use getUser() for security
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Parse and validate form data
  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    featured_image: formData.get('featured_image') || null,
    status: formData.get('status') || 'draft',
    author: formData.get('author'),
  }

  const result = blogPostSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const data = result.data

  // Set published_at if publishing
  const insertData = {
    ...data,
    published_at: data.status === 'published' ? new Date().toISOString() : null,
  }

  // Use type assertion to bypass strict Supabase typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data: post, error } = await db
    .from('blog_posts')
    .insert(insertData)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'A post with this slug already exists' }
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')

  return { success: true, data: post as BlogPost }
}

export async function updateBlogPost(
  id: string,
  formData: FormData
): Promise<ActionResponse<BlogPost>> {
  const supabase = await createClient()

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  // Get current post to check if status changed
  const { data: currentPost } = await db
    .from('blog_posts')
    .select('status, published_at')
    .eq('id', id)
    .single()

  // Parse and validate form data
  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    featured_image: formData.get('featured_image') || null,
    status: formData.get('status') || 'draft',
    author: formData.get('author'),
  }

  const result = blogPostSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const data = result.data

  // Set published_at if publishing for the first time
  let published_at = currentPost?.published_at
  if (data.status === 'published' && currentPost?.status !== 'published') {
    published_at = new Date().toISOString()
  }

  const updateData = {
    ...data,
    published_at,
  }

  const { data: post, error } = await db
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'A post with this slug already exists' }
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)

  return { success: true, data: post as BlogPost }
}

export async function deleteBlogPost(id: string): Promise<ActionResponse> {
  const supabase = await createClient()

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  // Use RETURNING clause to get slug in one query instead of two
  const { data: deletedPost, error } = await db
    .from('blog_posts')
    .delete()
    .eq('id', id)
    .select('slug')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (deletedPost?.slug) {
    revalidatePath(`/blog/${deletedPost.slug}`)
  }

  return { success: true }
}

export async function publishBlogPost(id: string): Promise<ActionResponse> {
  const supabase = await createClient()

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data: post, error } = await db
    .from('blog_posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('slug')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`)
  }

  return { success: true }
}

export async function unpublishBlogPost(id: string): Promise<ActionResponse> {
  const supabase = await createClient()

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { data: post, error } = await db
    .from('blog_posts')
    .update({ status: 'draft' })
    .eq('id', id)
    .select('slug')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`)
  }

  return { success: true }
}
