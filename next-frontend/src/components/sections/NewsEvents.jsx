import styles from './NewsEvents.module.css';

const news = [
  {
    category: 'HERITAGE',
    title: 'The Ancient Origins of Ganga Aarti in Varanasi',
    excerpt: 'Discover why millions gather every evening at the ghats for this mesmerizing ritual of fire and faith...',
    date: 'Jan 12, 2026',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop'
  },
  {
    category: 'RITUALS',
    title: 'Understanding the Science Behind Vedic Mantras',
    excerpt: 'How sonic vibrations impact the human mind and spirit according to ancient Ayurvedic texts...',
    date: 'Jan 08, 2026',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=600&auto=format&fit=crop'
  }
];

const upcoming = [
  {
    day: '17',
    month: 'AUG',
    title: 'Nag Panchami',
    subtitle: 'Traditional Snake Deity Worship',
    theme: 'green'
  },
  {
    day: '28',
    month: 'AUG',
    title: 'Varalakshmi Vrat',
    subtitle: 'Vrata for Goddess Lakshmi blessings',
    theme: 'orange'
  },
  {
    day: '04',
    month: 'SEP',
    title: 'Krishna Janmashtami',
    subtitle: 'Divine Birthday Celebrations',
    theme: 'green'
  },
  {
    day: '14',
    month: 'SEP',
    title: 'Ganesh Chaturthi',
    subtitle: 'Grand Ganesha Welcoming Rituals',
    theme: 'orange'
  }
];

export default function NewsEvents() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* News Section */}
          <div className={styles.newsColumn}>
            <h2 className={styles.title}>News & Events</h2>
            <div className={styles.newsList}>
              {news.map((item, index) => (
                <div key={index} className={styles.newsItem}>
                  <div className={styles.newsImageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.newsImage} />
                  </div>
                  <div className={styles.newsContent}>
                    <span className={styles.category}>{item.category}</span>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <span className={styles.newsFooter}>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Events Section */}
          <div className={styles.upcomingColumn}>
            <h2 className={styles.title}>Upcoming Events</h2>
            <div className={styles.eventsCard}>
              <div className={styles.eventList}>
                {upcoming.map((event, index) => (
                  <div key={index} className={styles.eventItem}>
                    <div className={styles.dateBlock}>
                      <span className={styles.month}>{event.month}</span>
                      <span className={styles.day}>{event.day}</span>
                    </div>
                    <div className={styles.eventInfo}>
                      <h4 className={styles.eventTitle}>{event.title}</h4>
                      <p className={styles.eventSubtitle}>{event.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.cardFooter}>
                <a href="/festivals" className={styles.calendarLink}>
                  See Full Festival Calendar
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
