// Segmented sitemaps as per MPB Technical Guidelines v3.0

export async function generateSitemaps() {
  return [
    { id: 'temples' },
    { id: 'poojas' },
    { id: 'festivals' },
    { id: 'static' },
  ]
}

export default async function sitemap({ id }) {
  const baseUrl = 'https://mypoojabooking.com';

  if (id === 'temples') {
    return [
      {
        url: `${baseUrl}/temples/dwarkadhish`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      // Add more temples here
    ];
  }

  if (id === 'poojas') {
    return [
      {
        url: `${baseUrl}/poojas/shringar-aarti`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      // Add more poojas here
    ];
  }

  if (id === 'festivals') {
    return [
      {
        url: `${baseUrl}/festivals/janmashtami-2026`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      // Add more festivals here
    ];
  }

  if (id === 'static') {
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
    ];
  }

  // Default sitemap index or fallback
  return [
    { url: `${baseUrl}/` }
  ];
}
