'use client';

import { useState } from 'react';
import styles from './NewsletterCta.module.css';

export default function NewsletterCta({ data = {} }) {
  const {
    title = 'Deepen Your Spiritual Journey',
    subtitle = 'Sign up for our newsletter to receive weekly curations of top bhajans and we shall share mantras directly in your inbox.',
    placeholder = 'Your E-mail address',
    buttonText = 'Subscribe Now',
  } = data;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        alert(result.error || 'Failed to subscribe. Please try again.');
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
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            {submitted ? (
              <p className={styles.success}>🙏 Thank you! You've joined our spiritual community.</p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  className={styles.input}
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? 'Subscribing...' : buttonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
