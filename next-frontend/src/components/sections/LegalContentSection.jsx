'use client';

import { useState, useEffect } from 'react';
import styles from './LegalContentSection.module.css';
import { Shield, FileText, RefreshCcw, Mail, MapPin } from 'lucide-react';

const ICONS = { Shield, FileText, RefreshCcw, Mail, MapPin };

function LegalContent({ data }) {
  const { sidebarTitle, sidebarSubtitle, navItems = [], sections = [], contactBox = {} } = data;

  const [activeSection, setActiveSection] = useState(navItems[0]?.id);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      if (sectionParam && navItems.some(item => item.id === sectionParam)) {
        setActiveSection(sectionParam);
      }
    }
  }, [navItems]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const renderContent = (content) => {
    return content.map((block, idx) => {
      switch (block.type) {
        case 'infoBoxes':
          return (
            <div key={idx} className={styles.infoBoxesSection}>
              <h3 className={styles.sectionHeading}>{block.title}</h3>
              <p className={styles.sectionDesc}>{block.description}</p>
              <div className={styles.infoBoxes}>
                {block.boxes.map((box, bIdx) => (
                  <div key={bIdx} className={styles.infoBox}>
                    <span className={styles.boxLabel}>{box.label}</span>
                    <ul className={styles.boxList}>
                      {box.items.map((item, iIdx) => <li key={iIdx}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'textGrid':
          return (
            <div key={idx} className={styles.textGrid}>
              {block.items.map((item, iIdx) => (
                <div key={iIdx} className={styles.textItem}>
                  <h3 className={styles.sectionHeading}>{item.title}</h3>
                  <p className={styles.text}>{item.text}</p>
                </div>
              ))}
            </div>
          );
        case 'highlightBox':
          return (
            <div key={idx} className={styles.highlightBox}>
              <h3 className={styles.sectionHeading}>{block.title}</h3>
              <p className={styles.text}>{block.text}</p>
            </div>
          );
        case 'textBlock':
          return (
            <div key={idx} className={styles.textBlock}>
              <h3 className={styles.sectionHeading}>{block.title}</h3>
              <p className={styles.text}>{block.text}</p>
            </div>
          );
        case 'numberedList':
          return (
            <div key={idx} className={styles.numberedList}>
              {block.items.map((item, iIdx) => (
                <div key={iIdx} className={styles.listItem}>
                  <span className={styles.number}>0{iIdx + 1}</span>
                  <div className={styles.listContent}>
                    <h4 className={styles.listTitle}>{item.title}</h4>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'iconBoxes':
          return (
            <div key={idx} className={styles.iconBoxes}>
              {block.items.map((item, iIdx) => {
                const Icon = ICONS[item.icon] || FileText;
                return (
                  <div key={iIdx} className={styles.iconBox}>
                    <div className={styles.iconBoxHeader}>
                      <Icon size={20} className={styles.boxIcon} />
                      <h3 className={styles.boxTitle}>{item.title}</h3>
                    </div>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          );
        case 'refundTable':
          return (
            <div key={idx} className={styles.refundTableSection}>
              <h3 className={styles.sectionHeading}>{block.title}</h3>
              <div className={styles.table}>
                {block.rows.map((row, rIdx) => (
                  <div key={rIdx} className={styles.tableRow}>
                    <span className={styles.tableCondition}>{row.condition}</span>
                    <span className={`${styles.tableRefund} ${row.variant ? styles[row.variant] : ''}`}>
                      {row.refund}
                    </span>
                  </div>
                ))}
              </div>
              <p className={styles.tableFooter}>{block.footer}</p>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{sidebarTitle}</h2>
          <span className={styles.sidebarSubtitle}>{sidebarSubtitle}</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = ICONS[item.icon] || Shield;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className={styles.contentArea}>
        {sections.map((sec) => (
          <div
            key={sec.id}
            style={{ display: activeSection === sec.id ? 'block' : 'none' }}
          >
            <h2 className={styles.mainHeading}>{sec.title}</h2>
            <div className={styles.contentBody}>
              {renderContent(sec.content)}
            </div>
          </div>
        ))}

        {contactBox && (
          <div className={styles.contactGrievance}>
            <div className={styles.grievanceHeader}>
              <h3 className={styles.grievanceTitle}>{contactBox.title}</h3>
              <p className={styles.grievanceDesc}>{contactBox.description}</p>
            </div>
            
            <div className={styles.grievanceFlex}>
              <div className={styles.officerInfo}>
                <span className={styles.officerLabel}>{contactBox.officer.label}</span>
                <h4 className={styles.officerName}>{contactBox.officer.name}</h4>
                <p className={styles.officerRole}>{contactBox.officer.role}</p>
              </div>
              
              <div className={styles.officerContact}>
                <div className={styles.contactItem}>
                  <Mail size={22} />
                  <a href={`mailto:${contactBox.officer.email}`}>{contactBox.officer.email}</a>
                </div>
                <div className={styles.contactItem}>
                  <MapPin size={22} />
                  <span>{contactBox.officer.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LegalContentSection({ data = {} }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <LegalContent data={data} />
      </div>
    </section>
  );
}
