import { Phone, Mail } from 'lucide-react';
import styles from './ReachUs.module.css';

export default function ReachUs({ data = {}, id }) {
  const {
    title = 'Visit & Reach Us',
    mapEmbed,
    mapImage,
    address,
    contacts = [],
    howToReach = []
  } = data;

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        
        <div className={styles.content}>
          <div className={styles.mapSide}>
            <div className={styles.mapWrapper}>
              {mapEmbed ? (
                <iframe
                  src={mapEmbed}
                  className={styles.mapIframe}
                  title="Temple Location Map"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <>
                  <img src={mapImage} alt="Map to Temple" className={styles.mapImg} />
                  <div className={styles.mapOverlay}>
                    <div className={styles.marker}>📍</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.infoSide}>
            <div className={styles.infoBlock}>
              <h3 className={styles.blockTitle}>Temple Address</h3>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.addressLink}
              >
                <p className={styles.addressText}>{address}</p>
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.blockTitle}>Contact Details</h3>
              <div className={styles.contactsList}>
                {contacts.map((contact, index) => (
                  <div key={index} className={styles.contactItem}>
                    <span className={styles.cIcon}>
                      {contact.icon?.includes('phone') ? <Phone size={18} /> : <Mail size={18} />}
                    </span>
                    <a 
                      href={contact.icon?.includes('phone') ? `tel:${contact.value.replace(/\s+/g, '')}` : `mailto:${contact.value}`}
                      className={styles.cValueLink}
                    >
                      <span className={styles.cValue}>{contact.value}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {howToReach.length > 0 && (
              <div className={styles.infoBlock}>
                <h3 className={styles.blockTitle}>How To Reach</h3>
                <div className={styles.reachList}>
                  {howToReach.map((item, index) => (
                    <div key={index} className={styles.reachItem}>
                      <strong>{item.method}:</strong> {item.detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
