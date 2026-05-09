'use client';

import { useState } from 'react';
import styles from './FaqContentSection.module.css';
import * as Icons from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqContentSection({ data = {} }) {
  const { categories = [], faqData = {}, helpCard = {} } = data;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const [openQuestion, setOpenQuestion] = useState(0);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const activeCategoryLabel = categories.find(c => c.id === activeCategory)?.label;
  const questions = faqData[activeCategory] || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Categories</h3>
          <nav className={styles.categoryList}>
            {categories.map((cat) => {
              const Icon = Icons[cat.icon] || Icons.HelpCircle;
              return (
                <button
                  key={cat.id}
                  className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenQuestion(0);
                  }}
                >
                  <Icon size={18} className={styles.categoryIcon} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          <div className={styles.helpCard}>
            <div className={styles.helpContent}>
              <h4 className={styles.helpTitle}>{helpCard.title}</h4>
              <p className={styles.helpDesc}>{helpCard.description}</p>
              <button className={styles.contactBtn}>{helpCard.buttonText}</button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <h2 className={styles.categoryHeading}>{activeCategoryLabel}</h2>
            <span className={styles.resultsCount}>Showing {questions.length} results</span>
          </div>

          <div className={styles.accordion}>
            {questions.map((item, index) => (
              <div key={index} className={`${styles.accordionItem} ${openQuestion === index ? styles.open : ''}`}>
                <button 
                  className={styles.questionBtn}
                  onClick={() => toggleQuestion(index)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  {openQuestion === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openQuestion === index && (
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
