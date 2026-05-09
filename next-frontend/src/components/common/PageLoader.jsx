'use client';

import { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';

const logo = '/assets/images/logo.png';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate initial loading time or wait for window load
    const handleLoad = () => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800); // Match CSS transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout to ensure loader doesn't stick forever
      const timeout = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.loaderOverlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="MyPoojaBooking" className={styles.logo} />
          <div className={styles.ring}></div>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
      </div>
    </div>
  );
}
