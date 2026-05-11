'use client';

import { Search } from 'lucide-react';
import { useFilter } from '../../context/FilterContext';
import styles from './TempleListingHero.module.css'; // Reusing styles for consistency
export default function BhajanListingHero({ data = {} }) {
  const { bhajanSearchQuery, setBhajanSearchQuery } = useFilter();
  const {
    headline = 'Bhajans & Stotras',
    subheadline = 'Immerse yourself in divine vibrations with our curated collection.',
    banner = '/assets/images/bajanas/hero.webp',
    placeholder = 'Search by bhajan, stotra or deity...'
  } = data;

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{headline}</h1>
          <p className={styles.subtitle}>{subheadline}</p>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={bhajanSearchQuery}
                onChange={(e) => setBhajanSearchQuery(e.target.value)}
              />
              <button className={styles.searchBtn}>SEARCH</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
