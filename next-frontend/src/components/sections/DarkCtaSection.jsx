'use client';

import { useState } from 'react';
import styles from './DarkCtaSection.module.css';
import Link from 'next/link';
import BookPoojaModal from '../common/BookPoojaModal';

export default function DarkCtaSection({ data = {} }) {
  const { title, titleAccent, subtitle, primaryCta, secondaryCta } = data;
  const [isBookPoojaOpen, setIsBookPoojaOpen] = useState(false);

  const handlePrimaryClick = (e) => {
    if (primaryCta?.action === 'bookPooja') {
      e.preventDefault();
      setIsBookPoojaOpen(true);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            {title} <span className={styles.accent}>{titleAccent}</span>
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
          
          <div className={styles.buttonGroup}>
            {primaryCta && (
              <Link
                href={primaryCta.link || '#'}
                className={styles.primaryBtn}
                onClick={handlePrimaryClick}
              >
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.link} className={styles.secondaryBtn}>
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      <BookPoojaModal
        isOpen={isBookPoojaOpen}
        onClose={() => setIsBookPoojaOpen(false)}
      />
    </section>
  );
}
