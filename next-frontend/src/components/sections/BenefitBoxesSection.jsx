import styles from './BenefitBoxesSection.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function BenefitBoxesSection({ data = {} }) {
  const { devotee = {}, partner = {} } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.mainCard}>
          <div className={styles.devoteeSide}>
            <span className={styles.tag}>{devotee.tag}</span>
            <h2 className={styles.title}>{devotee.title}</h2>
            <div className={styles.points}>
              {devotee.points?.map((point, index) => (
                <div key={index} className={styles.point}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={18} className={styles.icon} />
                  </div>
                  <div className={styles.pointContent}>
                    <h4 className={styles.pointTitle}>{point.title}</h4>
                    <p className={styles.pointDesc}>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.partnerSide}>
            <span className={styles.tag}>{partner.tag}</span>
            <h2 className={styles.title}>{partner.title}</h2>
            <div className={styles.points}>
              {partner.points?.map((point, index) => (
                <div key={index} className={styles.point}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={18} className={styles.icon} />
                  </div>
                  <div className={styles.pointContent}>
                    <h4 className={styles.pointTitle}>{point.title}</h4>
                    <p className={styles.pointDesc}>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
