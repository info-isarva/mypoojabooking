'use client';

import { useFilter } from '../../context/FilterContext';
import styles from './DeityFilter.module.css';

const DEFAULT_DEITIES = [
  { icon: '/assets/images/icons/shiva.svg',    label: 'Shiva Bhajans' },
  { icon: '/assets/images/icons/krishna.svg',  label: 'Krishna Bhajans' },
  { icon: '/assets/images/icons/hanuman.svg',  label: 'Hanuman Chalisa' },
  { icon: '/assets/images/icons/peacefull.svg', label: 'Peaceful Mantras' },
  { icon: '/assets/images/icons/ganesha.svg',  label: 'Ganesha Stotras' },
  { icon: '/assets/images/icons/devi.svg',     label: 'Devi Stotras' },
];

export default function DeityFilter({ data = {} }) {
  const { title = 'Explore by Deity', deities = DEFAULT_DEITIES } = data;
  const { activeDeity, toggleDeity } = useFilter();

  const getNormalizedLabel = (label) => label.split(' ')[0];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider} />
        <div className={styles.grid}>
          {deities.map((deity, index) => {
            const normalized = getNormalizedLabel(deity.label);
            const isActive = activeDeity === normalized;

            return (
              <button
                key={index}
                className={`${styles.deityBtn} ${isActive ? styles.active : ''}`}
                onClick={() => toggleDeity(normalized)}
                aria-label={deity.label}
              >
                <div className={styles.iconCircle}>
                  <img
                    src={deity.icon}
                    alt={deity.label}
                    className={styles.icon}
                  />
                </div>
                <span className={styles.label}>{deity.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
