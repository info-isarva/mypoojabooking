'use client';

import { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterContext';
import styles from './DevotionalLibrary.module.css';

const FILTERS = ['Latest', 'Popular', 'Alpha-order'];

export default function DevotionalLibrary({ data = {} }) {
  const {
    title = 'Devotional Library',
    items = [],
  } = data;

  const [activeFilter, setActiveFilter] = useState('Latest');
  const [visibleCount, setVisibleCount] = useState(6);
  const { activeDeity, bhajanSearchQuery } = useFilter();

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter, activeDeity, bhajanSearchQuery]);

  // Combine category sorting, deity filtering and search
  const filtered = items.filter(item => {
    // Deity Filter (Multi-tag support)
    const matchesDeity = !activeDeity || (item.deities && item.deities.includes(activeDeity));

    // Search Filter
    const query = (bhajanSearchQuery || '').toLowerCase();
    const matchesSearch = !query ||
      item.title?.toLowerCase().includes(query) ||
      item.subtitle?.toLowerCase().includes(query) ||
      item.tag?.toLowerCase().includes(query);

    return matchesDeity && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeFilter === 'Alpha-order') return a.title.localeCompare(b.title);
    return 0;
  });

  const displayItems = sorted.slice(0, visibleCount);
  const hasMore = sorted.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {displayItems.length > 0 ? (
          <div className={styles.grid}>
            {displayItems.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.cardImage} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    {item.tag && <span className={styles.cardTag}>{item.tag}</span>}
                    {/* <button className={styles.favoriteBtn} aria-label="Add to favourites">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button> */}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.subtitle && <p className={styles.cardSubtitle}>{item.subtitle}</p>}

                  <div className={styles.cardAction}>
                    <a
                      href={item.link || '#'}
                      className={styles.actionBtn}
                    >
                      {item.type === 'read' ? 'Read' : 'Listen'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No bhajans found matching your criteria. Try another search or filter!</p>
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMore}>
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Explore More Collections <span className={styles.arrow}>↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
