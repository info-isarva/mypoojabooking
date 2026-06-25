import SectionRenderer from "@/components/engine/SectionRenderer";
import { FilterProvider } from "@/context/FilterContext";
import { notFound } from "next/navigation";
import { preload } from 'react-dom';
import AnalyticsTracker from "@/components/utils/AnalyticsTracker";
import { API_URL } from "@/utils/api";
import fs from 'fs';
import path from 'path';

function getTemplesData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'temples.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// Data imports
import homeData from "@/data/pages/home.json";
import dwarkadhishData from "@/data/pages/temples/dwarkadhish.json";
import bhajansStotrasData from "@/data/pages/bhajans-stotras.json";
import contactUsData from "@/data/pages/contact-us.json";
import templePartnerData from "@/data/pages/temple-partner.json";
import aboutUsData from "@/data/pages/about-us.json";
import faqData from "@/data/pages/faq.json";
import pricingData from "@/data/pages/pricing.json";
import policiesData from "@/data/pages/policies.json";
import templesData from "@/data/pages/temples.json";
import cookiePolicyData from "@/data/pages/cookie-policy.json";

const PAGE_REGISTRY = {
  "/": homeData,
  "/temples/dwarkadhish": dwarkadhishData,
  "/bhajans-stotras": bhajansStotrasData,
  "/contact": contactUsData,
  "/temple-login": templePartnerData,
  "/about": aboutUsData,
  "/faq": faqData,
  "/pricing": pricingData,
  "/policies": policiesData,
  "/temples": templesData,
  "/cookie-policy": cookiePolicyData,
};

export async function generateStaticParams() {
  const paths = Object.keys(PAGE_REGISTRY).filter(path => path !== '/');
  return paths.map(path => {
    const slug = path.replace(/^\//, '').split('/');
    return { slug };
  });
}

function fixUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('localhost:8000/api')) {
    return url.replace('http://localhost:8000/api', API_URL);
  }
  return url;
}

function getPageData(slugArray) {
  const path = slugArray ? `/${slugArray.join('/')}` : "/";
  const rawData = PAGE_REGISTRY[path];
  if (!rawData) return null;

  // Deep clone to avoid mutating the imported JSON module cache
  const data = JSON.parse(JSON.stringify(rawData));
  
  if (data && data.sections) {
    // Dynamically fix URLs in section props
    data.sections = data.sections.map(section => {
      if (section.props && section.props.apiUrl) {
        return {
          ...section,
          props: {
            ...section.props,
            apiUrl: fixUrl(section.props.apiUrl)
          }
        };
      }
      return section;
    });
  }
  
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData || !pageData.seo) return {};

  const brand = ' | MyPoojaBooking';
  const title = pageData.seo.metaTitle.includes('MyPoojaBooking') 
    ? pageData.seo.metaTitle 
    : `${pageData.seo.metaTitle}${brand}`;

  const canonicalUrl = `https://mypoojabooking.com${pageData.slug || ''}`;
  
  let image = 'https://mypoojabooking.com/assets/images/hero.webp';
  if (pageData.schema) {
    const schemas = Array.isArray(pageData.schema) ? pageData.schema : [pageData.schema];
    const imageSchema = schemas.find(s => s.image);
    if (imageSchema && typeof imageSchema.image === 'string') {
      image = imageSchema.image;
    }
  }
  const heroSection = pageData.sections?.find(s => s.type === 'HeroSection' || s.type === 'TempleListingHero');
  if (heroSection?.props?.banner && image === 'https://mypoojabooking.com/assets/images/hero.webp') {
    image = heroSection.props.banner.startsWith('http') 
      ? heroSection.props.banner 
      : `https://mypoojabooking.com${heroSection.props.banner}`;
  }

  return {
    title,
    description: pageData.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: pageData.seo.description,
      url: canonicalUrl,
      siteName: 'MyPoojaBooking',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pageData.seo.description,
      images: [image],
    }
  };
}

async function fetchServerData(pageData) {
  const updatedSections = await Promise.all(pageData.sections.map(async (section) => {
    if (section.type === 'TempleListingGrid') {
      try {
        const allTemples = getTemplesData();
        return { ...section, props: { ...section.props, initialTemples: allTemples } };
      } catch (e) {
        console.error('Failed to load local static temples:', e);
      }
    }

    if (section.type === 'PopularTemples') {
      try {
        const allTemples = getTemplesData();
        const popularTemples = allTemples.filter(t => t.popular === true);
        return { ...section, props: { ...section.props, items: popularTemples } };
      } catch (e) {
        console.error('Failed to load popular temples from static file:', e);
      }
    }
    
    if (section.type === 'TodayAtTemple' || section.type === 'AboutTemple') {
      try {
        const { getTodayPanchanga } = require('@/utils/panchanga');
        const panchangaData = getTodayPanchanga();
        if (panchangaData) {
          return { ...section, props: { ...section.props, panchangaData } };
        }
      } catch (e) {
        console.error('Failed to load panchanga locally on server:', e);
      }
    }

    return section;
  }));

  return { ...pageData, sections: updatedSections };
}

export default async function Page({ params }) {
  const { slug } = await params;
  let pageData = getPageData(slug);

  if (!pageData) {
    notFound();
  }

  // Fetch server-side data for GEO compliance
  pageData = await fetchServerData(pageData);

  // Preload hero image for performance (LCP)
  const heroBanner = pageData.sections.find(s => s.type === 'HeroSection')?.props?.banner;
  if (heroBanner) {
    preload(heroBanner, { as: 'image' });
  }

  return (
    <FilterProvider>
      <AnalyticsTracker pageData={pageData} />
      {pageData.schema && (
        Array.isArray(pageData.schema) ? (
          pageData.schema.map((s, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
            />
          ))
        ) : (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData.schema) }}
          />
        )
      )}
      <SectionRenderer sections={pageData.sections} />
    </FilterProvider>
  );
}

