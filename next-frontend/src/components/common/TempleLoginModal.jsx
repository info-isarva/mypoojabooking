'use client';

import { useState, useEffect } from 'react';
import { Search, X, Building2, ExternalLink } from 'lucide-react';
import styles from './TempleLoginModal.module.css';

const TEMPLES_PORTALS = [
  { name: 'Shree Kashimath Samsthan', location: 'Varanasi', url: 'https://mypoojabooking.com/institution/kashimath' },
  { name: 'Sri Krishna Mandir Trust', location: 'New Delhi', url: 'https://mypoojabooking.com/institution/skmt_delhi' },
  { name: 'Srimath Anantheshwar Temple', location: 'Manjeshwar', url: 'https://mypoojabooking.com/institution/satmanjeshwar' },
  { name: 'Shree Venkatraman Dev', location: 'Kumta', url: 'https://mypoojabooking.com/institution/svdkumta' },
  { name: 'Mypoojabooking Central Portal', location: 'Central Admin', url: 'https://mypoojabooking.com/institution/alltemples' },
  { name: 'Shree Venkataramana Devasthan', location: 'Shree Ananthnagar, Bangalore', url: 'https://mypoojabooking.com/institution/svd_ananthnagar' },
  { name: 'GSB Samaj Seva Sangh', location: 'Vasai', url: 'https://mypoojabooking.com/institution/gsssvasai' }
];

export default function TempleLoginModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPortals = TEMPLES_PORTALS.filter(
    (portal) =>
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <h2 className={styles.modalTitle}>Institution Login As</h2>
            <p className={styles.modalSubtitle}>Select your temple or portal to log in</p>
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search your temple or portal..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          <div className={styles.templeGrid}>
            {filteredPortals.length > 0 ? (
              filteredPortals.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.templeCard}
                >
                  <div className={styles.templeIconCircle}>
                    <Building2 size={22} className={styles.templeIcon} />
                  </div>
                  <div className={styles.templeDetails}>
                    <h4 className={styles.templeName}>{portal.name}</h4>
                    <span className={styles.templeLocation}>{portal.location}</span>
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
  );
}
