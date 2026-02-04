'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { faqItemSchema } from '@/lib/validations'
import type { ActionResponse } from '@/lib/types'
import type { FAQItem } from '@/lib/database.types'

export async function createFAQItem(
  formData: FormData
): Promise<ActionResponse<FAQItem>> {
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
    category: formData.get('category'),
    question: formData.get('question'),
    answer: formData.get('answer'),
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = faqItemSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: faqItem, error } = await db
    .from('faq_items')
    .insert(result.data)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')

  return { success: true, data: faqItem }
}

export async function updateFAQItem(
  id: string,
  formData: FormData
): Promise<ActionResponse<FAQItem>> {
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
    category: formData.get('category'),
    question: formData.get('question'),
    answer: formData.get('answer'),
    sort_order: Number(formData.get('sort_order')) || 0,
  }

  const result = faqItemSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const { data: faqItem, error } = await db
    .from('faq_items')
    .update(result.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')

  return { success: true, data: faqItem }
}

export async function deleteFAQItem(id: string): Promise<ActionResponse> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await db.from('faq_items').delete().eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')

  return { success: true }
}

export async function reorderFAQItems(
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

  const { error } = await db.rpc('batch_update_faq_sort_order', {
    update_data: updateData,
  })

  if (error) {
    return { success: false, error: 'Failed to reorder FAQ items' }
  }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')

  return { success: true }
}
