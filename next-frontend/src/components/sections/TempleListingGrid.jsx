'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useFilter } from '../../context/FilterContext';
import { API_URL } from '@/utils/api';
import styles from './TempleListingGrid.module.css';
import EmptyStateSection from './EmptyStateSection';

const imageMap = {
  'temple_somnath.png': '/assets/images/temple_somnath.png',
  'temple_kedarnath.png': '/assets/images/temple_kedarnath.png',
  'temple_mahakal.png': '/assets/images/temple_mahakal.png',
  'temple_kashi.png': '/assets/images/temple_kashi.png',
  'temple_tirupati.png': '/assets/images/temple_tirupati.png',
  'temple_jagannath.png': '/assets/images/temple_jagannath.png',
};

export default function TempleListingGrid({ data = {} }) {
  const { templeSearchQuery } = useFilter();
  const {
    apiUrl = `${API_URL}/temples`,
    loadMoreIncrement = 9,
    initialTemples = []
  } = data;

  const [temples, setTemples] = useState(initialTemples);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(initialTemples.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialTemples && initialTemples.length > 0) {
      setTemples(initialTemples);
      setLoading(false);
      return;
    }
    const fetchTemples = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch temples');
        const result = await response.json();
        setTemples(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemples();
  }, [apiUrl, initialTemples]);

  const filteredTemples = useMemo(() => {
    if (!templeSearchQuery) return temples;
    const query = templeSearchQuery.toLowerCase();
    return temples.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query)
    );
  }, [temples, templeSearchQuery]);

  const visibleTemples = filteredTemples.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + loadMoreIncrement);
  };

  // Drag-to-scroll for tags
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onTagsMouseDown = useCallback((e) => {
    const el = e.currentTarget;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.classList.add(styles.dragging);
  }, [styles.dragging]);

  const onTagsMouseLeave = useCallback((e) => {
    dragState.current.isDown = false;
    e.currentTarget.classList.remove(styles.dragging);
  }, [styles.dragging]);

  const onTagsMouseUp = useCallback((e) => {
    dragState.current.isDown = false;
    e.currentTarget.classList.remove(styles.dragging);
  }, [styles.dragging]);

  const onTagsMouseMove = useCallback((e) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const el = e.currentTarget;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }, []);

  if (loading) return <div className={styles.loader}>Seeking divine destinations...</div>;
  if (error) {
    return (
      <EmptyStateSection 
        data={{ 
          sectionName: 'Temples',
          title: 'Temples will be available soon',
          description: 'Temples will be available soon. Please check back shortly for updates and bookings.',
          ctaText: 'Back to Home',
          ctaLink: '/'
        }} 
      />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.resultsHeader}>
          <p className={styles.resultsCount}>
            Showing {visibleTemples.length} of {filteredTemples.length} temples
            {templeSearchQuery && ` for "${templeSearchQuery}"`}
          </p>
        </div>

        <div className={styles.grid}>
          {visibleTemples.map((temple) => (
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

                <div
                  className={styles.tagsContainer}
                  onMouseDown={onTagsMouseDown}
                  onMouseLeave={onTagsMouseLeave}
                  onMouseUp={onTagsMouseUp}
                  onMouseMove={onTagsMouseMove}
                >
                  {temple.tags && temple.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardSpacer} />

                {(temple.website || temple.slug === 'dwarkadhish') && (
                  temple.website ? (
                    <a
                      href={temple.website}
                      className={styles.cardBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Know More
                    </a>
                  ) : (
                    <Link href={`/temples/${temple.slug || temple.id}`} className={styles.cardBtn}>
                      Know More
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredTemples.length && (
          <div className={styles.loadMoreWrapper}>
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              LOAD MORE TEMPLES
            </button>
          </div>
        )}

        {filteredTemples.length === 0 && (
          <EmptyStateSection 
            data={{ 
              sectionName: 'Temples',
              title: 'No Temples Found',
              description: templeSearchQuery 
                ? `No sacred destinations found matching "${templeSearchQuery}". Please try a different search term.`
                : 'Temples will be available soon. Please check back shortly for updates and bookings.',
              ctaText: 'Clear Search',
              ctaLink: '/temples'
            }} 
          />
        )}
      </div>
    </section>
  );
}
