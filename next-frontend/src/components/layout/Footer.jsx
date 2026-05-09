'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Footer.module.css';

const FacebookIcon = () => (
  <img
    src="/assets/images/icons/social-media/facebook.svg"
    alt="Facebook"
    width="40"
    height="40"
    className={styles.socialIcon}
  />
);
const InstagramIcon = () => (
  <img
    src="/assets/images/icons/social-media/insta.svg"
    alt="Instagram"
    width="40"
    height="40"
    className={styles.socialIcon}
  />
);
const YoutubeIcon = () => (
  <img
    src="/assets/images/icons/social-media/youtube.svg"
    alt="YouTube"
    width="40"
    height="40"
    className={styles.socialIcon}
  />
);
const SendIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Brand Column */}
          <div className={styles.brandCol}>
            <h3 className={styles.brandTitle}>MyPoojaBooking</h3>
            <p className={styles.description}>
              Reviving sacred traditions through modern convenience. Bringing the divine closer to you, wherever you are.
            </p>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/mypoojabooking" className={styles.socialLink} aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://www.instagram.com/mypoojabooking" className={styles.socialLink} aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.youtube.com/mypoojabooking" className={styles.socialLink} aria-label="YouTube"><YoutubeIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link href="/pricing" className={styles.footerLink}>Pricing</Link></li>
              <li><Link href="/temple-login" className={styles.footerLink}>Temple Partners</Link></li>
              <li><Link href="/faq" className={styles.footerLink}>FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href="/policies?section=privacy" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link href="/policies?section=terms" className={styles.footerLink}>Terms of Service</Link></li>
              <li><Link href="/policies?section=refund" className={styles.footerLink}>Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.columnTitle}>Newsletter</h3>
            <p className={styles.newsletterText}>
              Subscribe for spiritual insights and festival updates.
            </p>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
              <div className={styles.inputGroup}>
                <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email Address"
                  className={styles.emailInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.subscribeBtn} aria-label="Subscribe to newsletter">
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <p className={styles.copyright}>&copy; 2026 MyPoojaBooking. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
