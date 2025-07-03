import Script from 'next/script';

import { baseUrl } from '@/const/baseUrl';
import { RecipeSimple } from '@/services/requests/recipe/type';

export default function RecipeListSchema({ items }: { items: RecipeSimple[] }) {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}/recipes/${item.key}`,
    })),
  };

  return (
    <Script
      id='recipe-list-jsonld'
      type='application/ld+json'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
