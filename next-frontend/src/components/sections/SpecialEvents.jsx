'use client';

import { useRef } from 'react';
import { MapPin, Calendar, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './SpecialEvents.module.css';

const events = [
  {
    id: 1,
    poojaName: 'Navgrah Shanti Pooja',
    templeName: 'Kashi Vishwanath Temple',
    date: 'April 15, 2026',
    time: '08:00 AM',
    image: '/assets/images/special_pooja/navgraha_pooja.png',
  },
  {
    id: 2,
    poojaName: 'Ganesha Homa',
    templeName: 'Siddhivinayak Temple',
    date: 'April 18, 2026',
    time: '10:30 AM',
    image: '/assets/images/special_pooja/ganesha_homa.png',
  },
  {
    id: 3,
    poojaName: 'Lakshmi Pooja',
    templeName: 'Mahalakshmi Temple',
    date: 'April 20, 2026',
    time: '06:00 PM',
    image: '/assets/images/special_pooja/laxmi_pooja2.png',
  },
  {
    id: 4,
    poojaName: 'Annadanam Seva',
    templeName: 'Golden Temple, Vellore',
    date: 'May 10, 2026',
    time: '12:00 PM',
    image: '/assets/images/special_pooja/annadanam.png',
  },
  {
    id: 5,
    poojaName: 'Maha Shivratri Seva',
    templeName: 'Kedarnath Temple',
    date: 'March 08, 2027',
    time: '04:00 AM',
    image: '/assets/images/special_pooja/shivaratri.png',
  },
  {
    id: 6,
    poojaName: 'Rath Yatra Pooja',
    templeName: 'Jagannath Puri',
    date: 'July 07, 2026',
    time: '07:30 AM',
    image: '/assets/images/special_pooja/Ratha_ytra.png',
  }
];

import EmptyStateSection from './EmptyStateSection';

export default function SpecialEvents({ data = {} }) {
  const { title = 'Our Pooja on Special Events', items = events } = data;
  const sliderRef = useRef(null);

  if (!items || items.length === 0) {
    return (
      <EmptyStateSection 
        data={{ 
          sectionName: 'Special Events', 
          description: 'Sacred poojas for special occasions will be available soon. Please check back shortly for updates and bookings.'
        }} 
      />
    );
  }

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
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>
              Pre-book online puja for special events performed by our skilled for dosha removal, healing, 
              career, marriage, festival & peace.
            </p>
          </div>
          
          <div className={styles.navGroup}>
            <button
              className={styles.navBtn}
              onClick={() => scroll('left')}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={styles.navBtn}
              onClick={() => scroll('right')}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.slider} ref={sliderRef}>
            {items.map((event) => (
              <div key={event.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={event.image} alt={event.poojaName} className={styles.image} />
                  <div className={styles.badge}>Upcoming</div>
                </div>
                <div className={styles.content}>
                  <h3 className={styles.poojaName}>{event.poojaName}</h3>

                  <div className={styles.eventDetails}>
                    <div className={styles.detailItem}>
                      <MapPin size={16} className={styles.icon} />
                      <span>{event.templeName}</span>
                    </div>
                    <div className={styles.dateTimeRow}>
                      <div className={styles.detailItem}>
                        <Calendar size={16} className={styles.icon} />
                        <span>{event.date}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Clock size={16} className={styles.icon} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  <button className={styles.btnBookNow}>BOOK POOJA</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.footerNote}>
          *Bookings are processed directly with the temple administration*
        </p>
      </div>
    </section>
  );
}
