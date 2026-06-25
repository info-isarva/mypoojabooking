import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/utils/mailer';

export async function POST(request) {
  try {
    const { name, email, subject, message, recaptchaToken } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Google reCAPTCHA v3 Validation
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA token is missing. Please refresh and try again.' },
          { status: 400 }
        );
      }

      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
        const response = await fetch(verifyUrl, { method: 'POST' });
        const result = await response.json();

        if (!result.success || result.score < 0.5) {
          console.warn('[reCAPTCHA v3 Failed]', result);
          return NextResponse.json(
            { error: 'Security check failed. Please try again.' },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error('reCAPTCHA verification error:', err);
        // Fallback or handle connection error gracefully
      }
    } else {
      console.warn('[reCAPTCHA v3] RECAPTCHA_SECRET_KEY is not defined in environment variables. Verification skipped.');
    }

    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
