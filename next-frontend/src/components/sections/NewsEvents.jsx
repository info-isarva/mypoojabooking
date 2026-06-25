'use client';

import { useState } from 'react';
import styles from './NewsEvents.module.css';
import { X, Calendar, Search } from 'lucide-react';
import festivalsData from '../../data/festivals.json';

const news = [
  {
    category: 'SPIRITUAL EVENTS',
    title: 'Kashi Math Chaturmas 2026 to be Observed at Kashi Moola Math, Varanasi',
    excerpt: 'Shri Kashi Math Samsthan is one of the Dharma Peethas of the Goud Saraswath Brahmins, a religious institution with glorious traditions and a hoary past. The Moola Math at Varanasi, the Headquarters of Shri Kashi Math Samsthan is steeped in history and spirituality. Its origin is lost in the mists of time. Shrimat Vijayeendra Tirtha Swamiji initiated Shrimat Yadavendra Tirtha Swamiji into sanyasa at Varanasi on the banks of the sacred Ganga and founded Shri Kashi Math Samsthan in 1542 A.D......',
    date: 'Jan 12, 2026',
    image: '/assets/images/kashimath-chaturmasa-vratha-2026-01.jpg',
    readMoreLink: 'https://www.kashimath.org/parabhava-nama-samvatsara-chaturmasa-vratha-2026/'
  }
];

export default function NewsEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use the current local date of the user to determine upcoming events
  const todayStr = '2026-06-19';
  const todayDate = new Date(todayStr);

  // Programmatically generate occurrences for all festivals (both 2026 and 2027)
  const allOccurrences = [];
  festivalsData.forEach((f) => {
    const tithiParts = f.tithi.split('-');
    const masa = tithiParts[0] || '';
    const paksha = tithiParts[1] || '';
    const tithiName = tithiParts[2] || '';

    // Add 2026 occurrence if exists
    if (f.date2026) {
      allOccurrences.push({
        festival: f.festival,
        tithi: f.tithi,
        masa,
        paksha,
        tithiName,
        dateStr: f.date2026,
        year: 2026
      });
    }

    // Add 2027 occurrence if exists
    if (f.date2027) {
      allOccurrences.push({
        festival: f.festival,
        tithi: f.tithi,
        masa,
        paksha,
        tithiName,
        dateStr: f.date2027,
        year: 2027
      });
    }
  });

  // Sort ALL occurrences chronologically
  const sortedAllOccurrences = [...allOccurrences].sort(
    (a, b) => new Date(a.dateStr) - new Date(b.dateStr)
  );

  // Filter only upcoming ones for the side list (next 5 upcoming events starting from June 19, 2026)
  const upcomingEvents = sortedAllOccurrences
    .filter((o) => new Date(o.dateStr) >= todayDate)
    .slice(0, 5);

  // Filter sorted occurrences inside modal based on search input
  const filteredOccurrences = sortedAllOccurrences.filter((o) =>
    o.festival.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date helper: returns { day: "29", month: "JUL" }
  function getEventDateParts(dateStr) {
    if (!dateStr) return { day: '--', month: '---' };
    const d = new Date(dateStr);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: String(d.getDate()).padStart(2, '0'),
      month: months[d.getMonth()]
    };
  }

  // Helper to format raw table date for rendering
  function formatTableDate(rawDate) {
    if (!rawDate) return '-';
    const parts = rawDate.split('-');
    if (parts.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIdx = parseInt(parts[1], 10) - 1;
      return `${parts[2]} ${months[monthIdx]} ${parts[0]}`;
    }
    return rawDate;
  }

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
                    <div className={styles.newsFooter}>
                      {item.readMoreLink && (
                        <a
                          href={item.readMoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.readMoreLink}
                        >
                          Read More →
                        </a>
                      )}
                    </div>
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
                {upcomingEvents.map((event, index) => {
                  const { day, month } = getEventDateParts(event.dateStr);
                  return (
                    <div key={index} className={styles.eventItem}>
                      <div className={styles.dateBlock}>
                        <span className={styles.month}>{month}</span>
                        <span className={styles.day}>{day}</span>
                      </div>
                      <div className={styles.eventInfo}>
                        <h4 className={styles.eventTitle}>{event.festival}</h4>
                        <p className={styles.eventSubtitle}>{event.tithi}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.cardFooter}>
                <button onClick={() => { setIsModalOpen(true); setSearchQuery(''); }} className={styles.calendarLinkBtn}>
                  <Calendar size={16} className={styles.calendarIcon} />
                  See Full Festival Calendar
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Festival Calendar Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Festival Calendar</h2>
              <p className={styles.modalSubtitle}>Comprehensive list of all festivals sorted chronologically</p>
              
              {/* Search Bar only (Year Switcher is removed per user request) */}
              <div className={styles.modalActions}>
                <div className={styles.searchWrapper}>
                  <Search size={18} className={styles.searchIcon} />
                  <input 
                    type="text" 
                    className={styles.searchInput} 
                    placeholder="Search festival name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.tableWrapper}>
                {filteredOccurrences.length > 0 ? (
                  <table className={styles.calendarTable}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Festival</th>
                        <th>Masa</th>
                        <th>Paksha</th>
                        <th>Tithi</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOccurrences.map((o, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td className={styles.festName}>{o.festival}</td>
                          <td>{o.masa}</td>
                          <td>
                            <span className={o.paksha === 'Shukla' ? styles.shuklaTag : styles.krishnaTag}>
                              {o.paksha}
                            </span>
                          </td>
                          <td>{o.tithiName}</td>
                          <td className={styles.dateCell}>{formatTableDate(o.dateStr)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.noResults}>
                    No festivals found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
