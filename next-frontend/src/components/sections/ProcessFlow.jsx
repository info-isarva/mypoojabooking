import styles from './ProcessFlow.module.css';
import { Search, Smartphone, ShieldCheck, ClipboardEdit, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Select Your Pooja',
    icon: '/assets/images/icons/process/select-pooja.svg'
  },
  {
    title: 'Enter Mobile Number',
    icon: '/assets/images/icons/process/Mobile-number.svg'
  },
  {
    title: 'Verify with OTP',
    icon: '/assets/images/icons/process/otp.svg'
  },
  {
    title: 'Fill Booking Details',
    icon: '/assets/images/icons/process/booking.svg'
  },
  {
    title: 'Confirm Booking',
    icon: '/assets/images/icons/process/confirm-booking.svg'
  }
];

export default function ProcessFlow() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>How It Works</h2>
        <p className={styles.subtitle}>See how it works and simplify your puja booking experience.</p>
        
        <div className={styles.stepper}>
          {steps.map((step, index) => {
            return (
              <div key={index} className={styles.step}>
                {index < steps.length - 1 && <div className={styles.connector}></div>}
                <div className={styles.iconContainer}>
                  <img src={step.icon} alt={step.title} className={styles.processIcon} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
