import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use verified domain or Resend's default for testing
// Once domain is verified in Resend, change to: 'Nirvana Optical <noreply@nirvanaoptical.co.za>'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Nirvana Optical <onboarding@resend.dev>'

interface ContactNotificationData {
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
}

export async function sendContactNotification(data: ContactNotificationData) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured, skipping email notification')
    return { success: true, skipped: true }
  }

  const contactEmail = process.env.CONTACT_EMAIL || 'admin@nirvanaoptical.com'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirvanaoptical.co.za'

  try {
    console.log('Sending notification email to:', contactEmail)
    console.log('From:', FROM_EMAIL)

    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      replyTo: data.email,
      subject: `New Contact Form: ${data.subject || 'General Enquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1a3c34; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>

            <div style="background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1a3c34; margin-top: 0;">Contact Details</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="mailto:${data.email}" style="color: #1a3c34;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="tel:${data.phone}" style="color: #1a3c34;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.subject || 'General Enquiry'}</td>
                </tr>
              </table>

              <h3 style="color: #1a3c34; margin-top: 20px;">Message</h3>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; white-space: pre-wrap;">
${data.message}
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${siteUrl}/admin/contact-submissions" style="display: inline-block; background-color: #1a3c34; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View in Admin Dashboard
                </a>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
              <p>This email was sent from the contact form at ${siteUrl}</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error.message }
    }

    console.log('Email sent successfully:', emailData?.id)
    return { success: true, id: emailData?.id }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

// Send confirmation email to the customer
export async function sendContactConfirmation(data: ContactNotificationData) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured, skipping confirmation email')
    return { success: true, skipped: true }
  }

  try {
    console.log('Sending confirmation email to:', data.email)

    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Thank you for contacting Nirvana Optical',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1a3c34; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
            </div>

            <div style="background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
              <p>Dear ${data.name},</p>

              <p>Thank you for contacting Nirvana Optical. We have received your message and will get back to you as soon as possible.</p>

              <p>If your enquiry is urgent, please don't hesitate to call us directly at <strong>018 338 1015</strong>.</p>

              <p>Kind regards,<br>The Nirvana Optical Team</p>

              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

              <p style="color: #666; font-size: 14px;">
                <strong>Nirvana Optical</strong><br>
                Shop 13, Mikro Plaza, Cnr First &amp; Bessemer Street<br>
                Mafikeng Industrial, Mahikeng, 2746<br>
                Phone: 018 338 1015
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Failed to send confirmation email:', error)
      return { success: false, error: error.message }
    }

    console.log('Confirmation email sent successfully:', emailData?.id)
    return { success: true, id: emailData?.id }
  } catch (error) {
    console.error('Confirmation email error:', error)
    return { success: false }
  }
}
