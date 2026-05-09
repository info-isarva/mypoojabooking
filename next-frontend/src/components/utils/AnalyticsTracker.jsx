'use client';

import { useEffect } from 'react';
import { trackEvent } from './GoogleAnalytics';

export default function AnalyticsTracker({ pageData }) {
  useEffect(() => {
    if (!pageData) return;

    // Track temple page view as per MPB guidelines
    if (pageData.slug && pageData.slug.startsWith('/temples/')) {
      trackEvent('view_temple_page', {
        temple_name: pageData.title,
        temple_slug: pageData.slug
      });
    }
  }, [pageData]);

  return null;
}
