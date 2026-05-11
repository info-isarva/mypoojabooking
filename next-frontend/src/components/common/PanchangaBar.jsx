'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { API_URL } from '@/utils/api';
import styles from './PanchangaBar.module.css';

export default function PanchangaBar({ 
  apiUrl = `${API_URL}/panchanga`,
  serverData = null 
}) {
  const [data, setData] = useState(serverData);
  const [loading, setLoading] = useState(!serverData);

  useEffect(() => {
    const fetchPanchanga = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching panchanga:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!serverData) {
      fetchPanchanga();
    }
    
    // Refresh every hour to handle date transitions without manual refresh
    const interval = setInterval(fetchPanchanga, 3600000); 

    return () => clearInterval(interval);
  }, [apiUrl, serverData]);

  if (loading) return <div className={styles.loading}>Loading Panchanga...</div>;
  if (!data) return null;

  return (
    <div className={styles.panchangaPill} aria-label="Today's Panchanga Details">
      <div className={styles.panchangaLabel}>
        <span className={styles.todayText}>Today's</span>
        <div className={styles.titleLine}></div>
        <span className={styles.detailsText}>PANCHANGA DETAILS</span>
      </div>
      
      <div className={styles.panchangaContent} aria-live="polite" aria-atomic="true">
        <div className={styles.panchangaItem}>
          <div className={styles.itemHeader}>
            <Sun size={20} className={styles.itemIcon} />
            <span className={styles.itemTitle}>Tithi</span>
          </div>
          <div className={styles.itemDetails}>
            {data.tithi.map((item, idx) => (
              <p key={idx}><strong>{item.name}</strong> - {item.start} - {item.end}</p>
            ))}
          </div>
        </div>

        <div className={styles.panchangaDivider}></div>

        <div className={styles.panchangaItem}>
          <div className={styles.itemHeader}>
            <Moon size={20} className={styles.itemIcon} />
            <span className={styles.itemTitle}>Nakshatra</span>
          </div>
          <div className={styles.itemDetails}>
            {data.nakshatra.map((item, idx) => (
              <p key={idx}><strong>{item.name}</strong> - {item.start} - {item.end}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
