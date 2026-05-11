'use client';

import { Search } from 'lucide-react';
import { useFilter } from '../../context/FilterContext';
import styles from './TempleListingHero.module.css';
const heroImg = '/assets/images/hero.webp';

export default function TempleListingHero({ data = {} }) {
  const { templeSearchQuery, setTempleSearchQuery } = useFilter();
  const {
    headline = 'Explore Sacred Temples',
    subheadline = 'Find and book poojas at India\'s most revered spiritual destinations.',
    banner = heroImg,
    placeholder = 'Search by temple name or location...'
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
                value={templeSearchQuery}
                onChange={(e) => setTempleSearchQuery(e.target.value)}
              />
              <button className={styles.searchBtn}>SEARCH</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
