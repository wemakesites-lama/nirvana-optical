'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ActionResponse } from '@/lib/types'

export async function updateSetting(
  key: string,
  value: string
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

  // Upsert the setting
  const { error } = await db
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/settings')
  revalidatePath('/booking')

  return { success: true }
}

export async function updateMultipleSettings(
  settings: Record<string, string>
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

  const upsertData = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
  }))

  const { error } = await db
    .from('site_settings')
    .upsert(upsertData, { onConflict: 'key' })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/settings')
  revalidatePath('/booking')
  revalidatePath('/')

  return { success: true }
}
