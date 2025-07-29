import Script from 'next/script';

import { baseUrl } from '@/const/baseUrl';

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'E-COOK',
    description: 'A recipe sharing platform for food enthusiasts worldwide.',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/img/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    sameAs: [],
    founder: {
      '@type': 'Person',
      name: 'Maria Kim',
    },
  };

  return (
    <Script
      id='organization-schema'
      type='application/ld+json'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
