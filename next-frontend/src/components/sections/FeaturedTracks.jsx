'use client';

import { useRef } from 'react';
import { useFilter } from '../../context/FilterContext';
import styles from './FeaturedTracks.module.css';

export default function FeaturedTracks({ data = {} }) {
  const { title = 'Featured Tracks', items = [] } = data;
  const { bhajanSearchQuery } = useFilter();
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = 400;
      scrollerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const query = (bhajanSearchQuery || '').toLowerCase();
  const filteredItems = items.filter(item => 
    !query || 
    item.title?.toLowerCase().includes(query) || 
    item.artist?.toLowerCase().includes(query) ||
    item.category?.toLowerCase().includes(query)
  );

  if (filteredItems.length === 0 && bhajanSearchQuery) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.controls}>
            <button
              className={styles.scrollBtn}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              className={styles.scrollBtn}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className={styles.scroller} ref={scrollerRef}>
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles.cardOverlay}>
                <div className={styles.cardInfo}>
                  <div className={styles.category}>{item.category}</div>
                  <h3 className={styles.trackTitle}>{item.title}</h3>
                  <p className={styles.featuring}>Featuring: {item.artist}</p>
                  <button className={styles.listenBtn}>
                    <span className={styles.playIcon}>▶</span> Listen Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
