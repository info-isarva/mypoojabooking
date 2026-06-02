import styles from './BhajansSection.module.css';
const imgHanumanchalisa = '/assets/images/bajanas/hanuman_chalisa.png';
const imgLalithasahasranamam = '/assets/images/bajanas/lalitha_sahasranamam.png';
const imgVishnusahasranamam = '/assets/images/bajanas/vishnu_sahasranamam.png';

const items = [
  {
    title: 'Hanuman Chalisa',
    image: imgHanumanchalisa,
    tag: 'PEACEFUL MANTRAS',
    btnText: 'READ NOW'
  },
  {
    title: 'Lalitha Sahasranamam',
    image: imgLalithasahasranamam,
    tag: 'DEVI STOTRAS',
    btnText: 'READ NOW'
  },
  {
    title: 'Vishnu Sahasranamam',
    image: imgVishnusahasranamam,
    tag: 'VISHNU BHAJANS',
    btnText: 'LISTEN NOW'
  }
];

export default function BhajansSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Bhajans & Stotras</h2>
            <p className={styles.subtitle}>Participate in personalized rituals specially curated for your needs and get divine blessings.</p>
          </div>
          <div className={styles.btnViewAllWrapper}>
            <button className={styles.btnViewAll}>VIEW ALL</button>
          </div>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.tag}>{item.tag}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <button className={styles.btnCard}>{item.btnText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
