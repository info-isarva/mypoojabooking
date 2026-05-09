import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/common/PageLoader";
import GoogleAnalytics from "@/components/utils/GoogleAnalytics";

export const metadata = {
  title: "Online Pooja Booking at Authorised Temples | MyPoojaBooking",
  description: "Book sacred poojas and sevas at India's most revered temples. Official digital booking partner for temples across India. Authentic, secure, trusted.",
  metadataBase: new URL('https://mypoojabooking.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Online Pooja Booking at Authorised Temples | MyPoojaBooking",
    description: "Book sacred poojas and sevas at India's most revered temples.",
    url: 'https://mypoojabooking.com',
    siteName: 'MyPoojaBooking',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
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
      "https://www.facebook.com/mypoojabooking",
      "https://www.instagram.com/mypoojabooking",
      "https://www.youtube.com/mypoojabooking"
    ]
  };

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXXXX" />
        <PageLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
