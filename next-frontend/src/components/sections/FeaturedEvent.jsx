'use client';

import Link from 'next/link';
import { MapPin, Calendar, User, Building, Music } from 'lucide-react';
import styles from './FeaturedEvent.module.css';

export default function FeaturedEvent({ data = {} }) {
  const {
    badge = '⭐ FEATURED EVENT',
    title = 'Kashi Moola Math Chaturmas 2026',
    location = 'Varanasi',
    dateRange = 'July–September 2026',
    description = 'Participate in Chaturmas by registering as a devotee, booking accommodation, and accessing all event services.',
    registerText = 'Register as a Devotee',
    registerLink = '/chaturmas-register',
    bookText = 'Book Accommodation',
    bookLink = '/chaturmas-accommodation',
    bhajanText = 'Bhajana Booking',
    bhajanLink = '',
    backgroundImage = '/assets/images/kashimath-chaturmasa-vratha-2026-01.jpg'
  } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.card}
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url(${backgroundImage})` }}
        >
          <div className={styles.content}>
            <span className={styles.badge}>{badge}</span>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <MapPin size={18} className={styles.icon} />
                <span>{location}</span>
              </div>
              <div className={styles.metaDivider}>•</div>
              <div className={styles.metaItem}>
                <Calendar size={18} className={styles.icon} />
                <span>{dateRange}</span>
              </div>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.buttonGroup}>
              {registerLink && (
                <Link href={registerLink} className={styles.primaryBtn}>
                  <User size={18} className={styles.btnIcon} />
                  <span>{registerText}</span>
                </Link>
              )}
              {bookLink && (
                <Link href={bookLink} className={styles.secondaryBtn}>
                  <Building size={18} className={styles.btnIcon} />
                  <span>{bookText}</span>
                </Link>
              )}
              {bhajanLink && (
                <Link href={bhajanLink} className={styles.secondaryBtn}>
                  <Music size={18} className={styles.btnIcon} />
                  <span>{bhajanText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
