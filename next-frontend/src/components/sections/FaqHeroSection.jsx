import styles from './FaqHeroSection.module.css';
import { Search } from 'lucide-react';

export default function FaqHeroSection({ data = {} }) {
  const { tag, title, description, backgroundImage } = data;

  return (
    <section className={styles.section} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <span className={styles.tag}>{tag}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Describe your issue or ask a question..." 
              className={styles.input}
            />
          </div>
          <button className={styles.searchBtn}>Find Answers</button>
        </div>
      </div>
    </section>
  );
}
