'use client';

import { useState, useEffect } from 'react';
import { Search, X, Building2, ExternalLink } from 'lucide-react';
import styles from './BookPoojaModal.module.css';

const BOOKING_TEMPLES = [
  { name: 'Basrur Shree Kashimath', location: 'Basrur, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/5' },
  { name: 'Bhatkal Shree Kashimath', location: 'Bhatkal, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/17' },
  { name: 'Brahmavar Shri Kashimath', location: 'Brahmavar, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/16' },
  { name: 'Dahisar Sri Kashi Math Sri Vittal Rakhumai Mandir', location: 'Dahisar, Mumbai, Maharashtra', url: 'https://mypoojabooking.com/booking/kashimath/18' },
  { name: 'Kashi Moola Math Varanasi Chaturmas 2026', location: 'Varanasi, Uttar Pradesh', url: 'https://mypoojabooking.com/booking/kashimath/23' },
  { name: 'Kalpi Sri Kashi Math', location: 'Kalpi, Uttar Pradesh', url: 'https://mypoojabooking.com/booking/kashimath/12' },
  { name: 'Manjeshwar Shree Kashimath Samsthan', location: 'Manjeshwar, Kerala', url: 'https://mypoojabooking.com/booking/kashimath/24' },
  { name: 'Konchady Shree Venkataramana Temple', location: 'Mangaluru, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/14' },
  { name: 'Prayag Sri Kashi Math', location: 'Prayagraj, Uttar Pradesh', url: 'https://mypoojabooking.com/booking/kashimath/10' },
  { name: 'Nasik Shri Kashimath Samsthan', location: 'Nashik, Maharashtra', url: 'https://mypoojabooking.com/booking/kashimath/22' },
  { name: 'Shree Mahalasa Temple, Konchady', location: 'Mangaluru, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/8' },
  { name: 'Shirva Sri Kashi Math', location: 'Shirva, Karnataka', url: 'https://mypoojabooking.com/booking/kashimath/6' },
  { name: 'Varanasi Sri Kashi Math', location: 'Varanasi, Uttar Pradesh', url: 'https://mypoojabooking.com/booking/kashimath/9' },
  { name: 'Sri Vedavyasa Charitable Trust (regd), Haridwar', location: 'Haridwar, Uttarakhand', url: 'https://mypoojabooking.com/booking/kashimath/2' },
  { name: 'Walkeshwar Shree Kashi Math', location: 'Walkeshwar, Mumbai, Maharashtra', url: 'https://mypoojabooking.com/booking/kashimath/13' },
  { name: 'Varanasi Shree Kashi Math Renovation', location: 'Varanasi, Uttar Pradesh', url: 'https://mypoojabooking.com/booking/kashimath/19' },
  { name: 'Shri Krishna Mandir Trust, New Delhi', location: 'New Delhi', url: 'https://mypoojabooking.com/booking/skmt_delhi/501' },
  { name: 'Vyasashram Shree Kashi Math', location: 'Haridwar, Uttarakhand', url: 'https://mypoojabooking.com/booking/kashimath/1' },
  { name: 'Gsb Samaj Seva Sangh, Vasai', location: 'Vasai, Maharashtra', url: 'https://mypoojabooking.com/booking/gsssvasai/703' },
  { name: 'Shree Venkataramana Devasthan, Ananthnagar, Bangalore', location: 'Bangalore, Karnataka', url: 'https://mypoojabooking.com/booking/svd_ananthnagar/702' },
  { name: 'Srimath Anantheshwar Temple, Manjeshwar, Kerala', location: 'Manjeshwar, Kerala', url: 'https://mypoojabooking.com/booking/satmanjeshwar/601' }
];

export default function BookPoojaModal({ isOpen, onClose }) {
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

  const filteredTemples = BOOKING_TEMPLES.filter(
    (temple) =>
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <h2 className={styles.modalTitle}>Book Your Pooja</h2>
            <p className={styles.modalSubtitle}>Select a temple to redirect to its external booking page</p>
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
              placeholder="Search your temple or location..."
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
                No temples found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
