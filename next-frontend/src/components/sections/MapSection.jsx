import styles from './MapSection.module.css';

export default function MapSection({ data = {} }) {
  const { mapEmbed } = data;

  if (!mapEmbed) return null;

  return (
    <section className={styles.section}>
      <div className={styles.mapContainer}>
        <iframe
          src={mapEmbed}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </div>
    </section>
  );
}
