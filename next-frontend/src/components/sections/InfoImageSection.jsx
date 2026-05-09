import styles from './InfoImageSection.module.css';
import Link from 'next/link';

export default function InfoImageSection({ data = {} }) {
  const { title, description, pointsTitle, points = [], ctaText, ctaLink, image } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          
          {pointsTitle && <h3 className={styles.pointsTitle}>{pointsTitle}</h3>}
          <ul className={styles.pointsList}>
            {points.map((point, index) => (
              <li key={index} className={styles.pointItem}>
                <span className={styles.bullet}>a.</span> {point}
              </li>
            ))}
          </ul>
          
          {ctaText && (
            <Link href={ctaLink} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      </div>
    </section>
  );
}
