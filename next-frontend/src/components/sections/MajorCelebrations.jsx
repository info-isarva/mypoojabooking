'use client';

import { useRef } from 'react';
import styles from './MajorCelebrations.module.css';

export default function MajorCelebrations({ data = {} }) {
  const { title, items = [], specialEvent } = data;
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

        <div className={styles.scrollerWrapper}>
          <div className={styles.scroller} ref={scrollerRef}>
            {items.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardMonth}>{item.month}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {specialEvent && (
          <div className={styles.specialBlock}>
            <div className={styles.specialContent}>
              <span className={styles.specialTag}>{specialEvent.tag || 'ANNUAL SPECIAL'}</span>
              <h2 className={styles.specialTitle}>{specialEvent.title}</h2>
              <p className={styles.specialDescription}>{specialEvent.description}</p>
              <div className={styles.specialActions}>
                <button className={styles.btnPrimary}>{specialEvent.cta1Text || 'Book Related Sevas'}</button>
                <button className={styles.btnSecondary}>{specialEvent.cta2Text || 'See Full Calendar'}</button>
              </div>
            </div>
            <div className={styles.specialImageWrapper}>
              <img src={specialEvent.image} alt={specialEvent.title} className={styles.specialImage} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
