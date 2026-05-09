import styles from './BookingKiosk.module.css';
import { Check } from 'lucide-react';
const imgKiosk = '/assets/images/kiosk.png';

const features = [
  'Easy service selection with clear categories',
  'Quick date & time slot booking',
  'Minimal user input with guided steps',
  'Secure and multiple payment options',
  'Instant receipt with booking confirmation'
];

export default function BookingKiosk() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>Pooja Booking Kiosk</h2>
            <div className={styles.descriptionWrapper}>
              <p className={styles.description}>
                Book your pooja quickly and seamlessly through our intuitive self-service kiosk, designed to
                provide a smooth and hassle-free booking experience for every devotee. With a user-friendly
                interface and guided steps, you can easily navigate through the process without any
                assistance.
              </p>
              <p className={styles.description}>
                Select your preferred seva from a well-organized list, choose a convenient date and time slot
                based on availability, and complete your booking within minutes. The kiosk ensures secure
                payment options and instantly generates your confirmation, making the entire experience
                fast, reliable, and spiritually fulfilling.
              </p>
            </div>

            <h3 className={styles.subHeading}>Primary Deity</h3>

            <ul className={styles.featureList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <Check className={styles.checkIcon} size={18} />
                  <span className={styles.featureText}>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={styles.btnBookNow}>BOOK NOW</button>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src={imgKiosk}
              alt="Pooja Booking Kiosk"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
