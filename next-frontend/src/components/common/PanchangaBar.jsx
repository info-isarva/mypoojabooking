'use client';

import { Sun, Moon, Sparkles } from 'lucide-react';
import styles from './PanchangaBar.module.css';

export default function PanchangaBar({ serverData = null }) {
  if (!serverData) return null;

  // Helper to extract "Day Month" (e.g. "19 June") from the formatted date string "Friday, Jun 19, 2026"
  function getShortDate(dateStr) {
    if (!dateStr) return '';
    const match = dateStr.match(/([a-zA-Z]+)\s+(\d+)/);
    if (match) {
      const monthAbbr = match[1]; // e.g. "Jun"
      const dayNum = match[2]; // e.g. "19"
      const fullMonths = {
        'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
        'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
        'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
      };
      const monthFull = fullMonths[monthAbbr] || monthAbbr;
      return `${dayNum} ${monthFull}`;
    }
    return dateStr;
  }

  return (
    <div className={styles.panchangaPill} aria-label="Today's Panchanga Details">
      <div className={styles.panchangaLabel}>
        <span className={styles.todayText}>Today's</span>
        <div className={styles.titleLine}></div>
        <span className={styles.detailsText}>PANCHANGA</span>
        <span className={styles.dateText}>{getShortDate(serverData.date)}</span>
      </div>
      
      <div className={styles.panchangaContent} aria-live="polite" aria-atomic="true">
        {/* Tithi Section */}
        <div className={styles.panchangaItem}>
          <div className={styles.itemHeader}>
            <Sun size={20} className={styles.itemIcon} />
            <span className={styles.itemTitle}>Tithi</span>
          </div>
          <div className={styles.itemDetails}>
            <p className={styles.strongText}>{serverData.tithi}</p>
          </div>
        </div>

        <div className={styles.panchangaDivider}></div>

        {/* Masa - Nakshatra Section */}
        <div className={styles.panchangaItem}>
          <div className={styles.itemHeader}>
            <Moon size={20} className={styles.itemIcon} />
            <span className={styles.itemTitle}>Masa - Nakshatra</span>
          </div>
          <div className={styles.itemDetails}>
            <p className={styles.strongText}>{serverData.sowramanaMasaNakshatra}</p>
          </div>
        </div>

        <div className={styles.panchangaDivider}></div>

        {/* Samvatsara & Ayana Section */}
        <div className={styles.panchangaItem}>
          <div className={styles.itemHeader}>
            <Sparkles size={20} className={styles.itemIcon} />
            <span className={styles.itemTitle}>Samvatsara & Ayana</span>
          </div>
          <div className={styles.itemDetails}>
            <p className={styles.strongText}>{serverData.samvatsara} ({serverData.ayana})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
