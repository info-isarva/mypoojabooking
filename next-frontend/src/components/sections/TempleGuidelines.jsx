import styles from './TempleGuidelines.module.css';

export default function TempleGuidelines({ data = {} }) {
  const { title = 'Temple Guidelines', subtitle, guidelines = [] } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.grid}>
          {guidelines.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconBox}>
                {item.icon && (item.icon.endsWith('.svg') || item.icon.startsWith('/')) ? (
                  <img src={item.icon} alt="" className={styles.iconImg} />
                ) : (
                  <span className={styles.icon}>{item.icon}</span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
