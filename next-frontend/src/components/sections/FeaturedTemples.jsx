import Link from 'next/link';
import styles from './FeaturedTemples.module.css';

const featuredAyodhya = '/assets/images/featured_ayodhya.png';
const featuredKailasa = '/assets/images/featured_kailasa.png';

const defaultFeatured = [
  {
    id: 1,
    name: 'Shri Ram Janmabhoomi Mandir',
    description: 'The dawn of a new era in Ayodhya. Experience the grandeur of the temple that celebrates the return of Lord Ram.',
    image: featuredAyodhya,
    link: '/temples/ram-mandir',
  },
  {
    id: 2,
    name: 'Kailasa Temple, Ellora',
    description: 'A rock-cut masterpiece carved from a single stone. One of the most extraordinary structures in human history.',
    image: featuredKailasa,
    link: '/temples/kailasa',
  },
];

export default function FeaturedTemples({ data = {} }) {
  const { title = 'Featured Temples', items = defaultFeatured } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.grid}>
          {items.map((temple) => (
            <div key={temple.id} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img
                  src={temple.image}
                  alt={temple.name}
                  className={styles.img}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.templeName}>{temple.name}</h3>
                <p className={styles.description}>{temple.description}</p>
                <Link href={temple.link} className={styles.viewBtn}>View Temple</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
