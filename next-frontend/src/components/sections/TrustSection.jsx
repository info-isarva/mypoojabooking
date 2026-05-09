import styles from './TrustSection.module.css';
import * as Icons from 'lucide-react';

export default function TrustSection({ data = {} }) {
  const { title, subtitle, items = [] } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.grid}>
          {items.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.Shield;
            return (
              <div key={index} className={styles.item}>
                <div className={styles.iconCircle}>
                  <Icon size={32} strokeWidth={2} className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
