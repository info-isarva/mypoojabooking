import styles from './LegalHeroSection.module.css';

export default function LegalHeroSection({ data = {} }) {
  const { title, lastUpdated, backgroundImage } = data;

  return (
    <section className={styles.section} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {lastUpdated && <p className={styles.lastUpdated}>{lastUpdated}</p>}
      </div>
    </section>
  );
}
