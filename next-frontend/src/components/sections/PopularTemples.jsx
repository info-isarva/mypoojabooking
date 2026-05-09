'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import styles from './PopularTemples.module.css';

const imageMap = {
  'temple_somnath.png': '/assets/images/temple_somnath.png',
  'temple_kedarnath.png': '/assets/images/temple_kedarnath.png',
  'temple_mahakal.png': '/assets/images/temple_mahakal.png',
  'temple_kashi.png': '/assets/images/temple_kashi.png',
  'temple_tirupati.png': '/assets/images/temple_tirupati.png',
  'temple_jagannath.png': '/assets/images/temple_jagannath.png',
};

import EmptyStateSection from './EmptyStateSection';

export default function PopularTemples({ data = {} }) {
  const sliderRef = useRef(null);
  const [temples, setTemples] = useState(data.items || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    title = 'Explore Popular Temples',
    items: propItems,
    apiUrl,
  } = data;

  useEffect(() => {
    if (propItems && propItems.length > 0) {
      setTemples(propItems);
      setLoading(false);
      return;
    }

    if (data.items && data.items.length > 0) {
      setTemples(data.items);
      return;
    }

    if (apiUrl) {
      const fetchTemples = async () => {
        setLoading(true);
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch temples');
          }
          const result = await response.json();
          setTemples(result);
          setError(null);
        } catch (err) {
          console.error('API Error:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTemples();
    }
  }, [propItems, apiUrl]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!loading && (error || temples.length === 0)) {
    return (
      <EmptyStateSection
        data={{
          sectionName: 'Popular Temples',
          title: 'Popular Temples will be available soon',
          description: 'Popular Temples will be available soon. Please check back shortly for updates and bookings.'
        }}
      />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>{title}</h2>
          <Link href="/temples" className={styles.viewAll}>VIEW ALL</Link>
        </div>

        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={() => scroll('left')}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.slider} ref={sliderRef}>
            {loading && (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading divine destinations...</p>
              </div>
            )}
            {error && (
              <div className={styles.errorState}>
                <p>Unable to load temples. Please try again later.</p>
              </div>
            )}
            {!loading && !error && temples.map((temple) => (
              <div key={temple.id} className={styles.card}>
                <div className={styles.imgWrapper}>
                  <img
                    src={imageMap[temple.image] || temple.image}
                    alt={temple.name}
                    className={styles.img}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.templeName}>{temple.name}</h3>
                  <div className={styles.locationInfo}>
                    <MapPin size={14} className={styles.locationIcon} />
                    <span className={styles.location}>{temple.location}</span>
                  </div>
                  <p className={styles.description}>{temple.description}</p>

                  <div className={styles.tagsContainer}>
                    {temple.tags && temple.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>

                  <Link href={`/temples/${temple.slug || temple.id}`} className={styles.cardBtn}>KNOW MORE</Link>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={() => scroll('right')}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
