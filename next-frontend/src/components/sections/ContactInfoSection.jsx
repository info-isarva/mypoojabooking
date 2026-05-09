import styles from './ContactInfoSection.module.css';

const ICON_MAP = {
  Phone: '/assets/images/icons/contact/voice_support.svg',
  Mail: '/assets/images/icons/contact/digital_letter.svg',
  MapPin: '/assets/images/icons/contact/address.svg'
};

export default function ContactInfoSection({ data = {} }) {
  const { items = [] } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {items.map((item) => {
            const iconSrc = ICON_MAP[item.icon] || item.icon;
            
            return (
              <div key={item.id} className={styles.card}>
                <div className={`${styles.iconWrapper} ${item.icon === 'Mail' ? styles.largeIcon : ''}`}>
                  <img src={iconSrc} alt={item.title} className={styles.contactIcon} />
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className={styles.valueLink}>
                    {item.value}
                  </a>
                ) : (
                  <p className={styles.value}>{item.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
