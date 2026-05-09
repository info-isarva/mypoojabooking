import styles from './FeatureGridSection.module.css';
import * as Icons from 'lucide-react';

export default function FeatureGridSection({ data = {} }) {
  const { tag, title, items = [] } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {items.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.HelpCircle;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
