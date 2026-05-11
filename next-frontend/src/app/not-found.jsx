'use client';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* Visual background layers */}
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Under Divine Construction</h1>
        <p className={styles.message}>
          We are working on these pages. <br />
          Please come again later for more information.
        </p>
        
        <div className={styles.buttonGroup}>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
          <Link href="/temples" className={styles.secondaryButton}>
            Explore Temples
          </Link>
        </div>
      </div>
    </div>
  );
}
