'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { contactFormSchema } from '@/lib/validations'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email/send-notification'
import type { ActionResponse } from '@/lib/types'

export async function submitContactForm(
  formData: FormData
): Promise<ActionResponse<{ id: string }>> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || null,
    subject: formData.get('subject') || null,
    message: formData.get('message'),
  }

  const result = contactFormSchema.safeParse(rawData)
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(', '),
    }
  }

  const data = result.data

  // Save to database
  const { data: submission, error } = await db
    .from('contact_submissions')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      is_read: false,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Failed to save contact submission:', error)
    return { success: false, error: 'Failed to submit form. Please try again.' }
  }

  // Send email notification (non-blocking)
  sendContactNotification(data).catch(console.error)

  // Send confirmation to customer (non-blocking)
  sendContactConfirmation(data).catch(console.error)

  return { success: true, data: { id: submission.id } }
}

export async function markSubmissionAsRead(
  id: string
): Promise<ActionResponse> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { error } = await db
    .from('contact_submissions')
    .update({ is_read: true })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/contact-submissions')
  revalidatePath('/admin/dashboard')

  return { success: true }
}

export async function deleteSubmission(id: string): Promise<ActionResponse> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const { error } = await db
    .from('contact_submissions')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/contact-submissions')
  revalidatePath('/admin/dashboard')

  return { success: true }
}
