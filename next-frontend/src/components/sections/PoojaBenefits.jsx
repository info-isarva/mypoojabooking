import styles from './PoojaBenefits.module.css';
import { Sparkles, Heart, ShieldCheck, Sun } from 'lucide-react';

const benefits = [
  {
    title: 'Positive Energy',
    description: 'Ancient Vedic Rituals to replenish positive life force within your surroundings.',
    icon: <Sparkles size={32} strokeWidth={1.5} />
  },
  {
    title: 'Divine Blessings',
    description: 'Connect with the divine and receive blessings for health, wealth, and happiness.',
    icon: <Heart size={32} strokeWidth={1.5} />
  },
  {
    title: 'Remove Obstacles',
    description: 'Specific poojas designed to clear hurdles and bring success in all your endeavors.',
    icon: <ShieldCheck size={32} strokeWidth={1.5} />
  },
  {
    title: 'Inner Peace',
    description: 'Experience tranquility and mental clarity through sacred mantras and prayers.',
    icon: <Sun size={32} strokeWidth={1.5} />
  }
];

export default function PoojaBenefits() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Benefits of Performing Pooja</h2>
        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {benefit.icon}
              </div>
              <h3 className={benefit.titleClass || styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
