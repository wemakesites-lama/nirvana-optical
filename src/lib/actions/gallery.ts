'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { galleryImageSchema } from '@/lib/validations'
import type { ActionResponse } from '@/lib/types'
import type { GalleryImage } from '@/lib/database.types'

export async function createGalleryImage(
  formData: FormData
): Promise<ActionResponse<GalleryImage>> {
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
    image_url: formData.get('image_url'),
    alt_text: formData.get('alt_text'),
    category: formData.get('category'),
    brand: formData.get('brand') || null,
    description: formData.get('description') || null,
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = galleryImageSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: image, error } = await db
    .from('gallery_images')
    .insert(result.data)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  return { success: true, data: image }
}

export async function updateGalleryImage(
  id: string,
  formData: FormData
): Promise<ActionResponse<GalleryImage>> {
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
    image_url: formData.get('image_url'),
    alt_text: formData.get('alt_text'),
    category: formData.get('category'),
    brand: formData.get('brand') || null,
    description: formData.get('description') || null,
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = galleryImageSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: image, error } = await db
    .from('gallery_images')
    .update(result.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  return { success: true, data: image }
}

export async function deleteGalleryImage(id: string): Promise<ActionResponse> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await db.from('gallery_images').delete().eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  return { success: true }
}

export async function reorderGalleryImages(
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

  const { error } = await db.rpc('batch_update_gallery_sort_order', {
    update_data: updateData,
  })

  if (error) {
    return { success: false, error: 'Failed to reorder images' }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  return { success: true }
}
