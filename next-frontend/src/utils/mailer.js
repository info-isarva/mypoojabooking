import nodemailer from 'nodemailer';

// Helper to create SMTP transport using environment variables
export function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[Mailer] SMTP_USER or SMTP_PASS not set. Using test/fallback log mode.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

// Send Contact Us Mail
export async function sendContactEmail({ name, email, subject, message }) {
  const transporter = getTransporter();
  const fromEmail = process.env.SMTP_FROM || '"MyPoojaBooking Support" <noreply@mypoojabooking.com>';
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@mypoojabooking.com';

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New Contact Request: ${subject}`,
    text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 5px solid #d97706;">
        ${message.replace(/\n/g, '<br>')}
      </blockquote>
    `,
  };

  if (!transporter) {
    console.log('[Mailer Fallback] Simulated Sending Contact Email:', mailOptions);
    return { success: true, simulated: true };
  }

  return transporter.sendMail(mailOptions);
}

// Send Newsletter Subscription Mail (Notification to admin or confirmation to user)
export async function sendNewsletterNotification({ email }) {
  const transporter = getTransporter();
  const fromEmail = process.env.SMTP_FROM || '"MyPoojaBooking Newsletter" <noreply@mypoojabooking.com>';
  
  // 1. Notify Admin
  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@mypoojabooking.com';
  const adminMailOptions = {
    from: fromEmail,
    to: adminEmail,
    subject: `New Newsletter Subscription`,
    text: `A new user has subscribed to the newsletter: ${email}`,
    html: `<h3>New Newsletter Subscription</h3><p>Email: <strong>${email}</strong> has subscribed to your weekly spiritual curations.</p>`,
  };

  // 2. Send Welcome Confirmation to Subscriber
  const welcomeMailOptions = {
    from: fromEmail,
    to: email,
    subject: `Welcome to MyPoojaBooking Newsletter!`,
    text: `Thank you for subscribing to the MyPoojaBooking newsletter. We will send you weekly curations of top bhajans and mantras directly to your inbox.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #d97706; text-align: center;">Welcome to MyPoojaBooking!</h2>
        <p>Pranam,</p>
        <p>Thank you for subscribing to our newsletter. You've joined our spiritual community! We will share weekly curations of top bhajans, special festival updates, and mantras directly in your inbox.</p>
        <p>If you did not request this subscription, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.85em; color: #888; text-align: center;">MyPoojaBooking &copy; 2026. All rights reserved.</p>
      </div>
    `,
  };

  if (!transporter) {
    console.log('[Mailer Fallback] Simulated Newsletter Sub:', email);
    return { success: true, simulated: true };
  }

  // Send both emails
  await Promise.all([
    transporter.sendMail(adminMailOptions).catch(e => console.error('Admin notification failed:', e)),
    transporter.sendMail(welcomeMailOptions).catch(e => console.error('User welcome email failed:', e)),
  ]);

  return { success: true };
}
