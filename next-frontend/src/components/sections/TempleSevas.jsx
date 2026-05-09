'use client';

import { Settings } from 'lucide-react';
import styles from './TempleSevas.module.css';
import { trackEvent } from '../utils/GoogleAnalytics';

// Icon mapping based on the provided path
const iconPaths = {
  visitRequired: '/assets/images/icons/seva-booking/temple-visit-required.svg',
  visitNotRequired: '/assets/images/icons/seva-booking/temple-visit-not-required.svg',
  prasadam: '/assets/images/icons/seva-booking/prasadam-home-delivery.svg',
  cutoff: '/assets/images/icons/seva-booking/booking-cut-off.svg'
};

const keyDetails = [
  { icon: iconPaths.visitRequired, label: 'Temple Visit : Required', alt: 'Temple visit required' },
  { icon: iconPaths.visitNotRequired, label: 'Temple Visit : Not Required', alt: 'Temple visit not required' },
  { icon: iconPaths.prasadam, label: 'Prasadam : Home Delivery Available', alt: 'Prasadam home delivery available' },
  { icon: iconPaths.cutoff, label: 'Booking Cut-off: 12:00 A.M', alt: 'Booking cut-off time' },
];

const iconAlts = {
  visitRequired: 'Temple visit required',
  visitNotRequired: 'Temple visit not required',
  prasadam: 'Prasadam home delivery available',
  cutoff: 'Booking cut-off time'
};

export default function TempleSevas({ data = {} }) {
  const {
    title = 'Daily & Periodic Sevas',
    sevas = [
      { name: 'Abhisheka Seva', price: '₹501', icons: ['visitNotRequired', 'prasadam'] },
      { name: 'Archana (Kumkum/Pushpa)', price: '₹51', icons: ['visitNotRequired', 'prasadam'] },
      { name: 'Thulabhara Seva', price: '₹200', note: '(₹200 if devotee provides items; additional charges if provided by the temple)', icons: ['visitRequired'] },
      { name: 'Sahasranama Archana', price: '₹251', icons: ['visitNotRequired', 'cutoff', 'prasadam'] },
    ]
  } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sevasCard}>
          <div className={styles.header}>
            <Settings className={styles.headerIcon} />
            <h2 className={styles.title}>{title}</h2>
          </div>

          <div className={styles.sevasList}>
            {sevas.map((seva, index) => (
              <div key={index} className={styles.sevaRow}>
                <div className={styles.sevaInfo}>
                  <div className={styles.nameRow}>
                    <span className={styles.sevaName}>{seva.name}</span>
                    <div className={styles.sevaIcons}>
                      {seva.icons?.map((iconKey, i) => (
                        <img
                          key={i}
                          src={iconPaths[iconKey]}
                          alt={iconAlts[iconKey] || iconKey}
                          className={styles.sevaIcon}
                        />
                      ))}
                    </div>
                  </div>
                  {seva.note && <p className={styles.sevaNote}>{seva.note}</p>}
                </div>
                <div className={styles.actionArea}>
                  <div className={styles.sevaPrice}>{seva.price}</div>
                  {/* <button 
                    className={styles.bookBtn}
                    onClick={() => trackEvent('click_book_seva', {
                      seva_name: seva.name,
                      price: seva.price
                    })}
                  >
                    BOOK NOW
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.keyDetailsCard}>
          <div className={styles.detailsHeader}>
            <Settings className={styles.headerIcon} />
            <h2>Key Details</h2>
          </div>
          <div className={styles.detailsList}>
            {keyDetails.map((detail, index) => (
              <div key={index} className={styles.detailItem}>
                <img src={detail.icon} alt={detail.alt || ''} className={styles.detailIcon} />
                <span>{detail.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
