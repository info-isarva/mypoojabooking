import SectionRenderer from "@/components/engine/SectionRenderer";
import { FilterProvider } from "@/context/FilterContext";
import { preload } from 'react-dom';
import AnalyticsTracker from "@/components/utils/AnalyticsTracker";
import { API_URL } from "@/utils/api";

// Data imports
import homeData from "@/data/pages/home.json";

function fixUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('localhost:8000/api')) {
    return url.replace('http://localhost:8000/api', API_URL);
  }
  return url;
}

function getHomeData() {
  const data = JSON.parse(JSON.stringify(homeData)); // Deep clone to avoid mutation
  
  if (data && data.sections) {
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

export async function generateMetadata() {
  const pageData = getHomeData();

  if (!pageData || !pageData.seo) return {};

  const brand = ' | MyPoojaBooking';
  const title = pageData.seo.metaTitle.includes('MyPoojaBooking') 
    ? pageData.seo.metaTitle 
    : `${pageData.seo.metaTitle}${brand}`;

  return {
    title,
    description: pageData.seo.description,
    alternates: {
      canonical: `https://mypoojabooking.com/`,
    }
  };
}

async function fetchServerData(pageData) {
  const updatedSections = await Promise.all(pageData.sections.map(async (section) => {
    if (section.type === 'PopularTemples' && section.props.apiUrl) {
      try {
        const res = await fetch(section.props.apiUrl, { next: { revalidate: 3600 } });
        if (res.ok) {
          const items = await res.json();
          return { ...section, props: { ...section.props, items } };
        }
      } catch (e) {
        console.error('Failed to fetch popular temples on server:', e);
      }
    }
    
    if (section.type === 'TodayAtTemple' || section.type === 'AboutTemple') {
      try {
        const res = await fetch(`${API_URL}/panchanga`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const panchangaData = await res.json();
          return { ...section, props: { ...section.props, panchangaData } };
        }
      } catch (e) {
        console.error('Failed to fetch panchanga on server:', e);
      }
    }

    return section;
  }));

  return { ...pageData, sections: updatedSections };
}

export default async function Page() {
  let pageData = getHomeData();

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
