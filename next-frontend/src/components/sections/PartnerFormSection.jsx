import styles from './PartnerFormSection.module.css';

export default function PartnerFormSection({ data = {} }) {
  const { boxTitle, boxText, phone, email } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.infoBox}>
            <h2 className={styles.boxTitle}>{boxTitle}</h2>
            <p className={styles.boxText}>{boxText}</p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <img src="/assets/images/icons/general/phone-white.svg" alt="Phone" className={styles.icon} />
                <span>{phone}</span>
              </div>
              <div className={styles.contactItem}>
                <img src="/assets/images/icons/general/email-white.svg" alt="Email" className={styles.icon} />
                <span>{email}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.formSide}>
            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>TEMPLE NAME</label>
                  <input type="text" placeholder="e.g. Somnath Temple" className={styles.input} />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>LOCATION</label>
                  <input type="text" placeholder="City, State" className={styles.input} />
                </div>
              </div>
              
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>CONTACT PERSON</label>
                  <input type="text" placeholder="Full Name" className={styles.input} />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>PHONE NUMBER</label>
                  <input type="text" placeholder="+91" className={styles.input} />
                </div>
              </div>
              
              <div className={styles.group}>
                <label className={styles.label}>MESSAGE</label>
                <textarea placeholder="Tell us more about your temple..." className={styles.textarea}></textarea>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
