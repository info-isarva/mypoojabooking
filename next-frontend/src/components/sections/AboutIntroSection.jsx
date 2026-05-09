import styles from './AboutIntroSection.module.css';

export default function AboutIntroSection({ data = {} }) {
  const { title, description, stats = [], quote, image } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <img src={image} alt="Sacred" className={styles.image} />
            {quote && (
              <div className={styles.quoteBox}>
                <p>"{quote}"</p>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.contentCol}>
          <h2 className={styles.title}>{title}</h2>
          {Array.isArray(description) ? (
            description.map((para, i) => (
              <p key={i} className={styles.description}>{para}</p>
            ))
          ) : (
            <p className={styles.description}>{description}</p>
          )}
          
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
