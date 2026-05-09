import styles from './PricingCardsSection.module.css';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingCardsSection({ data = {} }) {
  const { devotee = {}, institution = {} } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Devotee Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.tag}>{devotee.tag}</span>
              <h2 className={styles.title}>{devotee.title}</h2>
            </div>
            
            <div className={styles.priceSection}>
              <span className={styles.currency}>{devotee.price}</span>
              <span className={styles.unit}>{devotee.unit}</span>
            </div>

            <p className={styles.description}>{devotee.description}</p>

            <ul className={styles.featureList}>
              {devotee.features?.map((feature, i) => (
                <li key={i} className={styles.feature}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.tag}>{institution.tag}</span>
              <h2 className={styles.title}>{institution.title}</h2>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.priceText}>{institution.price}</span>
            </div>

            <p className={styles.description}>{institution.description}</p>

            <div className={styles.itemList}>
              {institution.items?.map((item, i) => (
                <div key={i} className={styles.item}>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemStatus}>{item.status}</span>
                </div>
              ))}
            </div>

            <Link href={institution.buttonLink} className={styles.contactBtn}>
              {institution.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
