'use client';

import { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
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

            <div className={styles.captchaPlaceholder}>
              <div className={styles.captchaBox}>
                <input type="checkbox" id="captcha" className={styles.checkbox} />
                <label htmlFor="captcha">I'm not a robot</label>
              </div>
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className={styles.recaptchaLogo} />
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
