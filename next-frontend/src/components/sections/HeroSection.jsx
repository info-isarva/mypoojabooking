'use client';

import { useState, useEffect } from 'react';
import { Search, X, Building2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const heroImg = '/assets/images/hero.webp';

const TEMPLES_PORTALS = [
  { name: 'Shree Kashimath Samsthan', location: 'Varanasi', url: 'https://mypoojabooking.com/institution/kashimath' },
  { name: 'Sri Krishna Mandir Trust', location: 'New Delhi', url: 'https://mypoojabooking.com/institution/skmt_delhi' },
  { name: 'Srimath Anantheshwar Temple', location: 'Manjeshwar', url: 'https://mypoojabooking.com/institution/satmanjeshwar' },
  { name: 'Shree Venkatraman Dev', location: 'Kumta', url: 'https://mypoojabooking.com/institution/svdkumta' },
  { name: 'Mypoojabooking Central Portal', location: 'Central Admin', url: 'https://mypoojabooking.com/institution/alltemples' },
  { name: 'Shree Venkataramana Devasthan', location: 'Shree Ananthnagar, Bangalore', url: 'https://mypoojabooking.com/institution/svd_ananthnagar' },
  { name: 'GSB Samaj Seva Sangh', location: 'Vasai', url: 'https://mypoojabooking.com/institution/gsssvasai' }
];

export default function HeroSection({ data = {} }) {
  const {
    headline = 'Book Sacred Poojas at',
    headlineAccent = 'India\'s Holiest Temples',
    subheadline = 'Choose from 650+ authentic Vedic rituals performed by qualified pandits at renowned temples across India.',
    banner = heroImg,
    ctaText,
    ctaLink = '/#',
    ctas = [],
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedCtas = ctas.length > 0
    ? ctas
    : (ctaText ? [{ text: ctaText, link: ctaLink, variant: 'primary' }] : []);

  const openModal = () => {
    setIsModalOpen(true);
    setSearchQuery('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const filteredTemples = TEMPLES_PORTALS.filter(temple =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {headline} <span className={styles.accent}>{headlineAccent}</span>
            </h1>
            <p className={styles.subtitle}>{subheadline}</p>

            {normalizedCtas.length > 0 && (
              <div className={styles.buttonGroup}>
                {normalizedCtas.map((cta, index) => {
                  // Intercept Partner Login links (pointing to /login)
                  if (cta.link === '/login' || cta.text.toUpperCase() === 'PARTNER LOGIN') {
                    return (
                      <button
                        key={index}
                        onClick={openModal}
                        className={`${styles.ctaButton} ${styles[cta.variant || 'primary']}`}
                      >
                        {cta.text}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={cta.link}
                      className={`${styles.ctaButton} ${styles[cta.variant || 'primary']}`}
                    >
                      {cta.text}
                    </Link>
                  );
                })}
              </div>
            )}

            {data.footerText && (
              <p className={styles.footerText}>{data.footerText}</p>
            )}
          </div>
        </div>
      </section>

      {/* Portal Selection Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Institution Login As</h2>
              <button className={styles.modalClose} onClick={closeModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  placeholder="Search your temple or portal..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button className={styles.searchClear} onClick={() => setSearchQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className={styles.templeGrid}>
                {filteredTemples.length > 0 ? (
                  filteredTemples.map((temple, idx) => (
                    <a
                      key={idx}
                      href={temple.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.templeCard}
                    >
                      <div className={styles.templeIconCircle}>
                        <Building2 size={22} className={styles.templeIcon} />
                      </div>
                      <div className={styles.templeDetails}>
                        <h4 className={styles.templeName}>{temple.name}</h4>
                        <span className={styles.templeLocation}>{temple.location}</span>
                      </div>
                      <ExternalLink size={16} className={styles.arrowIcon} />
                    </a>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    No portals found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
