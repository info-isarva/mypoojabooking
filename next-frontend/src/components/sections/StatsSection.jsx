import styles from './StatsSection.module.css';

const stats = [
  { label: 'AUTHENTICATED TEMPLES', value: '30+' },
  { label: 'BOOKINGS PROCESSED', value: '1.1Lakh+' },
  { label: 'Daily Bookings', value: '5K+' },
  { label: 'Devotee Rating', value: '4.9/5' }
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <h2 className={styles.value}>{stat.value}</h2>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
