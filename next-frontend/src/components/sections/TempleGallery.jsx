'use client';
 
import { useState, useRef, useEffect } from 'react';
import styles from './TempleGallery.module.css';

export default function TempleGallery({ data = {} }) {
  const { title = 'Temple Gallery', images = [] } = data;
  const [activeImage, setActiveImage] = useState(null);
  const dialogRef = useRef(null);

  const openLightbox = (image) => {
    setActiveImage(image);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeLightbox = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setActiveImage(null);
  };

  // Handle Escape key manually just in case, though showModal handles it
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={styles.imageBox}
              onClick={() => openLightbox(image)}
            >
              <img src={image.url} alt={image.alt || `Gallery image ${index + 1}`} loading="lazy" />
              <div className={styles.overlay}>
                <span>Enlarge</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal using native <dialog> */}
      <dialog 
        ref={dialogRef}
        className={styles.lightbox} 
        onClick={closeLightbox}
        aria-labelledby="gallery-title"
        aria-modal="true"
      >
        <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
          <h2 id="gallery-title" className="sr-only">{title} - Photo Gallery</h2>
          <button 
            className={styles.closeBtn} 
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            &times;
          </button>
          {activeImage && (
            <>
              <img 
                src={activeImage.url} 
                alt={activeImage.alt} 
                className={styles.lightboxImg} 
              />
              {activeImage.alt && <p className={styles.caption}>{activeImage.alt}</p>}
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
