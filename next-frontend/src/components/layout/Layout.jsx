import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MyPoojaBooking",
    "url": "https://mypoojabooking.com",
    "logo": "https://mypoojabooking.com/images/logo.png",
    "description": "India's trusted online pooja and seva booking platform",
    "email": "contact@mypoojabooking.com",
    "telephone": "+917411575060",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "D No. 1-1-2A Part Padav, Swasti Cashew Industries Compound",
      "addressLocality": "Mangaluru",
      "addressRegion": "Karnataka",
      "postalCode": "575008",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/Mypoojabooking",
      "https://www.instagram.com/mypoojabooking/",
      "https://www.linkedin.com/company/79085257/"
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
