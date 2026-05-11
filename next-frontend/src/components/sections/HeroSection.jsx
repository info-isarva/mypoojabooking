import Link from 'next/link';
import styles from './HeroSection.module.css';

const heroImg = '/assets/images/hero.webp';

export default function HeroSection({ data = {} }) {
  const {
    headline = 'Book Sacred Poojas at',
    headlineAccent = 'India\'s Holiest Temples',
    subheadline = 'Choose from 650+ authentic Vedic rituals performed by qualified pandits at renowned temples across India.',
    banner = heroImg,
    ctaText,
    ctaLink = '/#',
    ctas = [],
  } = data;

  const normalizedCtas = ctas.length > 0
    ? ctas
    : (ctaText ? [{ text: ctaText, link: ctaLink, type: 'primary' }] : []);

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {headline} <span className={styles.accent}>{headlineAccent}</span>
          </h1>
          <p className={styles.subtitle}>{subheadline}</p>

          {normalizedCtas.length > 0 && (
            <div className={styles.buttonGroup}>
              {normalizedCtas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.link}
                  className={`${styles.ctaButton} ${styles[cta.variant || 'primary']}`}
                >
                  {cta.text}
                </Link>
              ))}
            </div>
          )}

          {data.footerText && (
            <p className={styles.footerText}>{data.footerText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
