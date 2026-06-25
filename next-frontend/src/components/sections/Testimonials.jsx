'use client';

import { useRef, useState } from 'react';
import styles from './Testimonials.module.css';
import { Star, ChevronLeft, ChevronRight, User, X } from 'lucide-react';

const testimonials = [
  {
    name: 'Nagaraj Kamat',
    quote: 'It is a wonderful platform to select and book Pooja and Seva in the identified temples. It is smooth and convenient. Best part is we get the receipt instantly. Great experience',
    rating: 5
  },
  {
    name: 'Ganesh Krishna Kamath',
    quote: 'Very user friendly. Easy to book pooja at the temple. Also environment friendly as you get the receipt and confirmation through Whatsapp the moment the booking is done.',
    rating: 5
  },
  {
    name: 'Ashok Pai',
    quote: 'This portal is really seamlessly integrated with payment gateway and easy to navigate through all the occasions of pooja booking. Great job Pai maam and his team. Hari Guru Blessings.',
    rating: 5
  },
  {
    name: 'Ma Pai',
    quote: 'It is really awesome and online booking has removed all asymmetrical problems. Most important is for common persons like me I can instantly book the Seva be it is night or otherwise. It helps all people as on line transactions are very handy. We need to give good traction sooner to make it popular.',
    rating: 5
  },
  {
    name: 'KSA Kamath (Suniel Kamath)',
    quote: 'I was the 2nd user (most probably) of this portal / website at Prayagraj Kashi Math. Initially it seemed to be rigid operationally but as days progressed we found it to be very user friendly and whatever changes or suggestions given were taken into consideration. Kudos to the entire team at MPB, who are always there for any support required.',
    rating: 5
  },
  {
    name: 'Harish Baliga',
    quote: 'This APP is 1 of the best APP for me. So easy to use. Frankly I don\'t use any apps like uber & ola. My wife gets shocked when I say our seva booked within a minute after she tells me to perform any Seva. Kudos to the team of developers. Harish Baliga Mumbai',
    rating: 5
  },
  {
    name: 'Deepak Kulkarni',
    quote: 'A Divine Experience Made Effortless! I can\'t express how grateful I am for this Pooja booking app! From start to finish, the experience was seamless, intuitive, and deeply satisfying. The interface is beautifully designed and easy to navigate, making it simple to book the exact Pooja I needed—whether at home or in a temple',
    rating: 4
  },
  {
    name: 'Shivanand Shenoy',
    quote: 'We have been using My Pooja Booking portal for Walkeshwar, Varanasi, Prayag and Kalpi Maths since July 2024. Portal has provided customised menu driven options of generating receipts, payments, journal vouchers and multiple reports providing desired information on day today basis. Dashboard itself gives details of cash, bank balances as on date, during the month and current financial year. Apart from this other information such as cheques on hand, cheques deposited but not cleared, sevas count including regular and shaswat, tithi and nakshatra as per Hindu calendar all these information readily available on dashboard. Also we can download ledgers, trial balance and multiple reports. In short this platform is user friendly for accounting of our religious institution. Initially we had some teething issues which generally happens but got resolved immediately. Even today if we face any problem in the system the same is resolved by supporting team on priority. Most important to mention about providing platform for online booking of sevas which has reduced tremendous work load of seva booking staff. It helped not only reducing work load but helped in increasing seva counts. It also provides up-to-date reconciliation of online seva booking.',
    rating: 5
  },
  {
    name: 'Mamta Nayak',
    quote: 'It is very convenient to book on this platform and hassle free.',
    rating: 4
  },
  {
    name: 'Narendra Bhat',
    quote: 'Great inititative',
    rating: 5
  }
];

const CHARACTER_LIMIT = 180;

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getDisplayedQuote = (quote) => {
    if (quote.length <= CHARACTER_LIMIT) return `"${quote}"`;
    return `"${quote.substring(0, CHARACTER_LIMIT)}..."`;
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
            {testimonials.map((testimonial, index) => {
              const isLong = testimonial.quote.length > CHARACTER_LIMIT;
              return (
                <div key={index} className={styles.card}>
                  <div className={styles.userTop}>
                    <div className={styles.avatarWrapper}>
                      <User className={styles.avatarIcon} size={32} />
                    </div>
                    <p className={styles.quote}>
                      {getDisplayedQuote(testimonial.quote)}
                      {isLong && (
                        <button 
                          className={styles.readMoreBtn} 
                          onClick={() => setSelectedTestimonial(testimonial)}
                        >
                          Read More
                        </button>
                      )}
                    </p>
                  </div>
                  
                  <div className={styles.userInfo}>
                    <h4 className={styles.userName}>{testimonial.name}</h4>
                    {testimonial.location && <p className={styles.userLocation}>{testimonial.location}</p>}
                  </div>

                  <div className={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#E25E14" stroke="#E25E14" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedTestimonial && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTestimonial(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedTestimonial(null)} aria-label="Close modal">
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.avatarWrapper}>
                <User className={styles.avatarIcon} size={40} />
              </div>
              <h3 className={styles.modalName}>{selectedTestimonial.name}</h3>
              <div className={styles.modalRating}>
                {[...Array(selectedTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#E25E14" stroke="#E25E14" />
                ))}
              </div>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalQuote}>"{selectedTestimonial.quote}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
