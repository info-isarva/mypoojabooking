import styles from './PricingGuidelinesSection.module.css';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function PricingGuidelinesSection({ data = {} }) {
  const { title, guidelines = [], partnerCard = {} } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Guidelines List */}
          <div className={styles.guidelinesArea}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.guidelinesList}>
              {guidelines.map((text, i) => (
                <div key={i} className={styles.guideline}>
                  <span className={styles.number}>0{i + 1}</span>
                  <p 
                    className={styles.guidelineText}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partner Card */}
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>{partnerCard.title}</h3>
            <p className={styles.partnerDesc}>{partnerCard.description}</p>
            
            <div className={styles.contactInfo}>
              <Mail size={18} className={styles.mailIcon} />
              <a href={`mailto:${partnerCard.email}`} className={styles.email}>
                {partnerCard.email}
              </a>
            </div>

            <Link href={partnerCard.buttonLink} className={styles.registerBtn}>
              {partnerCard.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
