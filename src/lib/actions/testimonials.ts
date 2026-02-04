'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { testimonialSchema } from '@/lib/validations'
import type { ActionResponse } from '@/lib/types'
import type { Testimonial } from '@/lib/database.types'

export async function createTestimonial(
  formData: FormData
): Promise<ActionResponse<Testimonial>> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const rawData = {
    name: formData.get('name'),
    rating: Number(formData.get('rating')),
    quote: formData.get('quote'),
    is_featured: formData.get('is_featured') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = testimonialSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: testimonial, error } = await db
    .from('testimonials')
    .insert(result.data)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true, data: testimonial }
}

export async function updateTestimonial(
  id: string,
  formData: FormData
): Promise<ActionResponse<Testimonial>> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const rawData = {
    name: formData.get('name'),
    rating: Number(formData.get('rating')),
    quote: formData.get('quote'),
    is_featured: formData.get('is_featured') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = testimonialSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: testimonial, error } = await db
    .from('testimonials')
    .update(result.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true, data: testimonial }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await db.from('testimonials').delete().eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true }
}

export async function toggleTestimonialFeatured(
  id: string,
  isFeatured: boolean
): Promise<ActionResponse> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await db
    .from('testimonials')
    .update({ is_featured: isFeatured })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')

  return { success: true }
}
