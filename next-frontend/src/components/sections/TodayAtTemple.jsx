'use client';

import { useRef } from 'react';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TodayAtTemple.module.css';
import PanchangaBar from '../common/PanchangaBar';

// Importing some existing images as placeholders
const imgKashi = '/assets/images/temple_kashi.png';
const imgTirupati = '/assets/images/temple_tirupati.png';
const imgMahakal = '/assets/images/temple_mahakal.png';
const imgSiddhivinayak = '/assets/images/temple_siddhivinayak.png';

const sevas = [
  {
    id: 1,
    name: 'Abhisheka',
    temple: 'Kashi Vishwanath Temple',
    time: '08:00 AM',
    image: imgKashi,
  },
  {
    id: 2,
    name: 'Archana',
    temple: 'Balaji & Padmavati, Maharashtra',
    time: '08:30 AM',
    image: imgTirupati,
  },
  {
    id: 3,
    name: 'Alankara',
    temple: 'Banashankari Temple Kanakapura',
    time: '11:00 AM',
    image: imgMahakal,
  },
  {
    id: 4,
    name: 'Naivedya & Aarti',
    temple: 'Kashi Vishwanath Temple',
    time: '12:00 AM',
    image: imgSiddhivinayak,
  },
  {
    id: 5,
    name: 'Kumkumarchana',
    temple: 'Siddhivinayak Temple',
    time: '09:00 AM',
    image: imgSiddhivinayak,
  }
];

export default function TodayAtTemple({ data = {} }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* <h2 className={styles.title}>Today at the Temple</h2> */}

        <div className={styles.panchangaWrapper}>
          <PanchangaBar serverData={data.panchangaData} />
        </div>

        {/* <div className={styles.navGroup}>
          <button className={styles.navBtn} onClick={() => scroll('left')} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <button className={styles.navBtn} onClick={() => scroll('right')} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.slider} ref={sliderRef}>
            {sevas.map((seva) => (
              <div key={seva.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={seva.image} alt={seva.name} className={styles.image} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.sevaName}>{seva.name}</h3>
                  <div className={styles.details}>
                    <div className={styles.detailItem}>
                      <MapPin size={16} className={styles.icon} />
                      <span>{seva.temple}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Clock size={16} className={styles.icon} />
                      <span>{seva.time}</span>
                    </div>
                  </div>
                  <button className={styles.btnBook}>BOOK POOJA</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.footerNote}>
          "Bookings are processed directly with the temple administration"
        </p> */}
      </div>
    </section>
  );
}
