'use client';

import { useRef } from 'react';
import styles from './Testimonials.module.css';
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const testimonials = [
  {
    name: 'Anand Sharma',
    location: 'LONDON, UK',
    image: '/assets/images/testimonials/anand.webp',
    quote: 'I live abroad, and my mother in India can no longer travel to temples. Through My Pooja Booking, I booked a Kashi Vishwanath puja for her. The experience was truly divine.',
    rating: 5,
    type: 'text'
  },
  {
    name: 'Priya Venkatesh',
    location: 'BANGALORE, INDIA',
    image: '/assets/images/testimonials/priya_video.webp',
    quote: '',
    rating: 5,
    type: 'video',
    thumbnail: '/assets/images/testimonials/priya_video.webp'
  },
  {
    name: 'Rajiv Malhotra',
    location: 'SAN JOSE, USA',
    image: '/assets/images/testimonials/rajiv.webp',
    quote: 'The prasad delivery was swift and blessed. Feeling connected to our roots even while living in the USA. A wonderful initiative for our community.',
    rating: 5,
    type: 'text'
  }
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
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
            <h2 className={styles.title}>Why Thousands Trust Us?</h2>
            <p className={styles.subtitle}>Discover the heartfelt experiences of devotees who found blessings through My Pooja Booking.</p>
          </div>
          
          <div className={styles.navGroup}>
            <button className={styles.navBtn} onClick={() => scroll('left')} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button className={styles.navBtn} onClick={() => scroll('right')} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className={styles.sliderWrapper}>
          <div className={styles.grid} ref={scrollRef}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.card}>
                {testimonial.type === 'video' ? (
                  <div className={styles.videoThumbnail}>
                    <img src={testimonial.thumbnail} alt={testimonial.name} className={styles.thumbImg} />
                    <div className={styles.playOverlay}>
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <div className={styles.userTop}>
                    <img src={testimonial.image} alt={testimonial.name} className={styles.avatar} />
                    <p className={styles.quote}>"{testimonial.quote}"</p>
                  </div>
                )}
                
                <div className={styles.userInfo}>
                  <h4 className={styles.userName}>{testimonial.name}</h4>
                  <p className={styles.userLocation}>{testimonial.location}</p>
                </div>

                <div className={styles.rating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#E25E14" stroke="#E25E14" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
