import styles from './TempleInfoBar.module.css';

export default function TempleInfoBar({ data = {} }) {
  const { items = [] } = data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {items.map((item, index) => (
          <div key={index} className={styles.infoBox}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
