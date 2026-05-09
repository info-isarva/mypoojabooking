import Link from 'next/link';
import styles from './EmptyStateSection.module.css';

export default function EmptyStateSection({ data = {} }) {
  const {
    sectionName = 'Events',
    title: customTitle,
    description = 'Sacred poojas for special occasions will be available soon. Please check back shortly for updates and bookings.',
    ctaText = 'Explore Temples',
    ctaLink = '/temples',
    image = '/assets/images/EmptyState/spiritual_lamps_circle.png'
  } = data;

  const displayTitle = customTitle || `${sectionName} Will Be Available Soon`;

  return (
    <section className={styles.section}>
      <div className={styles.decorativeLeaf}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10c-5 15-15 25-15 40s10 25 15 40c5-15 15-25 15-40s-10-25-15-40z" opacity="0.1" />
          <path d="M20 40c10-5 20-5 30 10-10 15-20 15-30 0z" opacity="0.05" />
          <path d="M80 40c-10-5-20-5-30 10 10 15 20 15 30 0z" opacity="0.05" />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={image} alt="Spiritual lamps" className={styles.mainImage} />
        </div>

        <h2 className={styles.title}>{displayTitle}</h2>
        <p className={styles.description}>{description}</p>

        <Link href={ctaLink} className={styles.ctaBtn}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
