'use client';

import Link from 'next/link';
import styles from './AboutTemple.module.css';
import PanchangaBar from '../common/PanchangaBar';
import { trackEvent } from '../utils/GoogleAnalytics';
import { Share2 } from 'lucide-react';

export default function AboutTemple({ data = {} }) {
  const {
    title = 'About the Temple',
    content = [],
    image,
    badgeText,
    ctas = []
  } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentSide}>
          {data.lastUpdated && (
            <p className={styles.lastUpdated}>
              Last updated on: {new Date(data.lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          )}
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.textContent}>
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
            <div className={styles.buttonGroup}>
              {ctas.map((cta, index) => (
                <Link 
                  key={index} 
                  href={cta.link} 
                  className={`${styles.ctaButton} ${styles[cta.variant || 'primary']}`}
                >
                  {cta.text}
                </Link>
              ))}
              <button 
                className={`${styles.ctaButton} ${styles.share}`}
                onClick={() => {
                  trackEvent('click_whatsapp_share', {
                    temple_name: title
                  });
                  window.open(`https://wa.me/?text=Check out ${title} on MyPoojaBooking: ${window.location.href}`, '_blank');
                }}
              >
                <Share2 size={18} />
                SHARE
              </button>
            </div>
        </div>
        
        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.mainImage} />
            {badgeText && (
              <div className={styles.floatingBadge}>
                {badgeText}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.panchangaWrapper}>
        <PanchangaBar serverData={data.panchangaData} />
      </div>
    </section>
  );
}
