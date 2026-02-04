'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { promoBannerSchema } from '@/lib/validations'
import type { ActionResponse } from '@/lib/types'
import type { PromoBanner } from '@/lib/database.types'

export async function createPromoBanner(
  formData: FormData
): Promise<ActionResponse<PromoBanner>> {
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
    headline: formData.get('headline'),
    subheadline: formData.get('subheadline') || null,
    image_url: formData.get('image_url') || null,
    image_alt: formData.get('image_alt') || null,
    layout: formData.get('layout') || 'text-overlay',
    link_url: formData.get('link_url') || null,
    link_text: formData.get('link_text'),
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
    background_color: formData.get('background_color') || null,
    text_color: formData.get('text_color') || null,
  }

  const result = promoBannerSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: banner, error } = await db
    .from('promo_banners')
    .insert(result.data)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/carousel')
  revalidatePath('/')
  revalidatePath('/offers')

  return { success: true, data: banner }
}

export async function updatePromoBanner(
  id: string,
  formData: FormData
): Promise<ActionResponse<PromoBanner>> {
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
    headline: formData.get('headline'),
    subheadline: formData.get('subheadline') || null,
    image_url: formData.get('image_url') || null,
    image_alt: formData.get('image_alt') || null,
    layout: formData.get('layout') || 'text-overlay',
    link_url: formData.get('link_url') || null,
    link_text: formData.get('link_text'),
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
    background_color: formData.get('background_color') || null,
    text_color: formData.get('text_color') || null,
  }

  const result = promoBannerSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: banner, error } = await db
    .from('promo_banners')
    .update(result.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/carousel')
  revalidatePath('/')
  revalidatePath('/offers')

  return { success: true, data: banner }
}

export async function deletePromoBanner(id: string): Promise<ActionResponse> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await db.from('promo_banners').delete().eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/carousel')
  revalidatePath('/')
  revalidatePath('/offers')

  return { success: true }
}

export async function togglePromoBannerActive(
  id: string,
  isActive: boolean
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
    .from('promo_banners')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/carousel')
  revalidatePath('/')
  revalidatePath('/offers')

  return { success: true }
}

export async function reorderPromoBanners(
  orderedIds: string[]
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

  // Use batch update function for performance (1 query instead of N queries)
  const updateData = orderedIds.map((id, index) => ({ id, sort_order: index }))

  const { error } = await db.rpc('batch_update_promo_sort_order', {
    update_data: updateData,
  })

  if (error) {
    return { success: false, error: 'Failed to reorder banners' }
  }

  revalidatePath('/admin/carousel')
  revalidatePath('/')
  revalidatePath('/offers')

  return { success: true }
}
