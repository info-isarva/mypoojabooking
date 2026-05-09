'use client';

import { useRef } from 'react';
import styles from './HorizontalScroller.module.css';

export default function HorizontalScroller({ data = {} }) {
  const { title, items = [], cardType = 'default' } = data;
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = 400;
      scrollerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.controls}>
            <button className={styles.scrollBtn} onClick={() => scroll('left')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className={styles.scrollBtn} onClick={() => scroll('right')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className={styles.scroller} ref={scrollerRef}>
          {items.map((item, index) => (
            <div key={index} className={`${styles.card} ${styles[cardType]}`}>
              {cardType === 'celebration' && (
                <div className={styles.cardContent}>
                  <div className={styles.tag}>{item.tag}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
              )}
              {cardType === 'festival' && (
                <div className={styles.festivalCard}>
                   <div className={styles.dateBox}>
                      <span className={styles.day}>{item.day}</span>
                      <span className={styles.month}>{item.month}</span>
                   </div>
                   <div className={styles.fInfo}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardSubtitle}>{item.location}</p>
                      <button className={styles.cardLink}>Explore Event →</button>
                   </div>
                </div>
              )}
              {cardType === 'default' && (
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
