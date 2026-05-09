import styles from './JourneyProcessSection.module.css';

export default function JourneyProcessSection({ data = {} }) {
  const { title, subtitle, steps = [] } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.journey}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.circleWrapper}>
                <div className={styles.circle}>
                  <span className={styles.number}>{step.number}</span>
                </div>
                {index < steps.length - 1 && <div className={styles.connector}></div>}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
