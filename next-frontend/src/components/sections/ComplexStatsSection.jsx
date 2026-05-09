import styles from './ComplexStatsSection.module.css';

export default function ComplexStatsSection({ data = {} }) {
  const { title, subtitle, regionalGuardians = {}, devoteeCard = {}, bottomStats = [] } = data;

  const defaultAvatars = [
    "/assets/images/icons/general/user-male.png",
    "/assets/images/icons/general/user-female.png",
    "/assets/images/icons/general/user-male.png"
  ];

  const displayAvatars = devoteeCard.avatars || defaultAvatars;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.topGrid}>
          <div className={styles.mainCard}>
            <div className={styles.mainCardContent}>
              <div className={styles.iconBox}>
                <img
                  src="/assets/images/icons/general/regional-gaurdiance.svg"
                  alt="Regional Guardians"
                  className={styles.iconImg}
                />
              </div>
              <h3 className={styles.mainCardTitle}>{regionalGuardians.title}</h3>
              <p className={styles.mainCardDesc}>{regionalGuardians.description}</p>
              <a href="#" className={styles.exploreLink}>{regionalGuardians.linkText}</a>
            </div>
            <div className={styles.mainCardImage}>
              <img src={regionalGuardians.image} alt={regionalGuardians.title} />
            </div>
          </div>

          <div className={styles.devoteeCard}>
            <div className={styles.devoteeIcon}>
              <img
                src="/assets/images/icons/general/Icon-group.svg"
                alt="Regional Guardians"
                className={styles.iconImg}
              />
            </div>
            <h3 className={styles.devoteeValue}>{devoteeCard.value}</h3>
            <p className={styles.devoteeDesc}>{devoteeCard.description}</p>
            <div className={styles.avatarRow}>
              <div className={styles.avatars}>
                {displayAvatars.map((src, idx) => (
                  <img key={idx} src={src} alt="Devotee" className={styles.avatarImg} />
                ))}
              </div>
              <span className={styles.avatarCount}>{devoteeCard.avatarCount}</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomStatsCard}>
          {bottomStats.map((stat, index) => (
            <div key={index} className={styles.bottomStatItem}>
              <h3 className={styles.bottomStatValue}>{stat.value}</h3>
              <p className={styles.bottomStatLabel}>{stat.label}</p>
              <p className={styles.bottomStatDesc}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
