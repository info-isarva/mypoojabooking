'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Phone, ChevronDown, User, Search, Grid2X2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import BookPoojaModal from '../common/BookPoojaModal';
import TempleLoginModal from '../common/TempleLoginModal';

const logo = '/assets/images/logo.png';

const CustomSearchIcon = ({ size = 26 }) => (
  <img
    src="/assets/images/icons/general/search-2.svg"
    alt="Search"
    style={{ width: size, height: size, display: 'block' }}
  />
);

const CustomBurgerIcon = ({ size = 22 }) => (
  <img
    src="/assets/images/icons/general/burger-menu.svg"
    alt="Menu"
    style={{ width: size, height: size, display: 'block' }}
  />
);

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookPoojaOpen, setIsBookPoojaOpen] = useState(false);
  const [isTempleLoginOpen, setIsTempleLoginOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path) => pathname === path ? styles.navLinkActive : '';
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`${styles.headerWrapper} ${isSticky ? styles.wrapperSticky : ''}`}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.contactInfo}>
            <a href="mailto:contact@mypoojabooking.com" className={styles.contactItem}>
              <Mail size={18} />
              <span className={styles.hideOnMobileText}>contact@mypoojabooking.com</span>
            </a>
            <span className={styles.topDivider}>|</span>
            <a href="tel:+917411575060" className={styles.contactItem}>
              <Phone size={18} />
              <span className={styles.hideOnMobileText}>+91 7411575060</span>
            </a>
          </div>
          <div className={styles.topActions}>

            <div className={styles.desktopOnly}>
              <div className={styles.searchIcon} aria-label="Search">
                <CustomSearchIcon size={36} />
              </div>
              {/* Book Pooja button moved to left nav (pill menu) on desktop */}
              {/* <button className={styles.btnBookNow} onClick={() => setIsBookPoojaOpen(true)}>
                <span className={styles.btnTextLong}>BOOK </span>POOJA
              </button> */}
              {/* Temple Login button moved to right nav (pill menu) on desktop */}
              {/* <button onClick={() => setIsTempleLoginOpen(true)} className={styles.btnLogin} aria-label="Temple Login">
                TEMPLE LOGIN
              </button> */}
            </div>
            <div
              className={styles.languageSwitcher}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-label="Select language - currently English"
            >
              <span>ENG</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Pill-shaped Navigation Menu */}
      <div className={`${styles.pillMenuContainer} ${isSticky ? styles.stickyMenu : ''}`}>
        <div className={styles.pillMenu}>

          <nav className={styles.navLeft}>
            {/* Desktop Links */}
            <div className={styles.desktopOnlyNav}>
              <Link href="/" className={`${styles.navLink} ${isActive('/')}`} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
              <Link href="/temples" className={`${styles.navLink} ${isActive('/temples')}`} aria-current={pathname === '/temples' ? 'page' : undefined}>Temples</Link>
              {/* <Link href="/poojas" className={`${styles.navLink} ${isActive('/poojas')}`} aria-current={pathname === '/poojas' ? 'page' : undefined}>Poojas</Link> */}
              {/* <Link href="/festivals" className={`${styles.navLink} ${isActive('/festivals')}`} aria-current={pathname === '/festivals' ? 'page' : undefined}>Festivals</Link> */}
              {/* Book Pooja button moved here from top bar desktopOnly section */}
              <button className={styles.btnBookNow} onClick={() => setIsBookPoojaOpen(true)}>
                <span className={styles.btnTextLong}>BOOK </span>POOJA
              </button>
            </div>

            {/* Mobile Actions (Left) - Book Pooja */}
            <div className={styles.mobileOnlyActions}>
              <button className={styles.btnBookNow} onClick={() => setIsBookPoojaOpen(true)}>
                <span className={styles.btnTextLong}>BOOK </span>POOJA
              </button>
            </div>
          </nav>

          {/* Centered Circular Logo */}
          <div className={styles.logoCircleWrapper}>
            <Link href="/" className={styles.logoCircle}>
              <img src={logo} alt="My Pooja Booking" className={styles.logoImg} />
            </Link>
          </div>

          <nav className={styles.navRight}>
            {/* Desktop Links */}
            <div className={styles.desktopOnlyNav}>
              {/* <Link href="/bhajans-stotras" className={`${styles.navLink} ${isActive('/bhajans-stotras')}`} aria-current={pathname === '/bhajans-stotras' ? 'page' : undefined}>Bhajans & Stotras</Link>
              <Link href="/devotion" className={`${styles.navLink} ${isActive('/devotion')}`} aria-current={pathname === '/devotion' ? 'page' : undefined}>My Devotion</Link> */}
              <Link href="/about" className={`${styles.navLink} ${isActive('/about')}`} aria-current={pathname === '/about' ? 'page' : undefined}>About Us</Link>
              <Link href="/contact" className={`${styles.navLink} ${isActive('/contact')}`} aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</Link>
              {/* Temple Login button moved here from top bar desktopOnly section */}
              <button onClick={() => setIsTempleLoginOpen(true)} className={styles.btnLogin} aria-label="Temple Login">
                TEMPLE LOGIN
              </button>
            </div>

            {/* Mobile Actions (Right) - Search and Burger */}
            <div className={styles.mobileOnlyActions}>
              <div className={styles.searchIcon} aria-label="Search">
                <CustomSearchIcon size={32} />
              </div>
              <button
                className={styles.menuToggle}
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                <CustomBurgerIcon size={28} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-nav-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.mobileMenuLogo}>
            <img src={logo} alt="Logo" />
          </Link>
          <button onClick={() => setIsTempleLoginOpen(true)} className={styles.mobileHeaderLoginBtn}>
            TEMPLE LOGIN
          </button>
          <button className={styles.mobileMenuClose} onClick={toggleMenu} aria-label="Close navigation menu">
            <X size={32} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <Link href="/" className={`${styles.mobileNavLink} ${isActive('/')}`}>Home</Link>
          <Link href="/temples" className={`${styles.mobileNavLink} ${isActive('/temples')}`}>Temples</Link>
          <Link href="/poojas" className={`${styles.mobileNavLink} ${isActive('/poojas')}`}>Poojas</Link>
          <Link href="/festivals" className={`${styles.mobileNavLink} ${isActive('/festivals')}`}>Festivals</Link>
          <Link href="/bhajans-stotras" className={`${styles.mobileNavLink} ${isActive('/bhajans-stotras')}`}>Bhajans & Stotras</Link>
          <Link href="/devotion" className={`${styles.mobileNavLink} ${isActive('/devotion')}`}>My Devotion</Link>
          <Link href="/about" className={`${styles.mobileNavLink} ${isActive('/about')}`}>About Us</Link>
          <Link href="/contact" className={`${styles.mobileNavLink} ${isActive('/contact')}`}>Contact Us</Link>
        </nav>

        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileContactInfo}>
            <a href="tel:+917411575060" className={styles.mobileContactItem}>
              <Phone size={20} />
              <span>+91 7411575060</span>
            </a>
            <a href="mailto:contact@mypoojabooking.com" className={styles.mobileContactItem}>
              <Mail size={20} />
              <span>contact@mypoojabooking.com</span>
            </a>
          </div>
        </div>
      </div>
      <BookPoojaModal isOpen={isBookPoojaOpen} onClose={() => setIsBookPoojaOpen(false)} />
      <TempleLoginModal isOpen={isTempleLoginOpen} onClose={() => setIsTempleLoginOpen(false)} />
    </div>
  );
}
