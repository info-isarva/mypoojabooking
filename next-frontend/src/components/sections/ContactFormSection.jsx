'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from './ContactFormSection.module.css';

export default function ContactFormSection({ data = {} }) {
  const { title = 'Get In Touch', subtitle = 'Have a question or feedback?' } = data;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Ld_YOUR_DEFAULT_SITE_KEY_HERE';

  useEffect(() => {
    // Only load if key is configured and not default placeholder
    if (siteKey && !siteKey.includes('YOUR_DEFAULT_SITE_KEY')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        const badge = document.querySelector('.grecaptcha-badge');
        if (badge) badge.remove();
      };
    }
  }, [siteKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let token = '';
      if (window.grecaptcha && siteKey && !siteKey.includes('YOUR_DEFAULT_SITE_KEY')) {
        token = await new Promise((resolve) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action: 'submit' }).then(resolve);
          });
        });
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for reaching out! We will get back to you soon.',
          confirmButtonColor: '#d97706'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: result.error || 'Failed to send message. Please try again.',
          confirmButtonColor: '#d97706'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'An error occurred. Please try again later.',
        confirmButtonColor: '#d97706'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>{subtitle}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="name" className={styles.label}>NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="email" className={styles.label}>EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="subject" className={styles.label}>SUBJECT</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className={styles.input}
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <label htmlFor="message" className={styles.label}>MESSAGE</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>



            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
