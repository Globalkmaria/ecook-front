import { queryKeys } from '@/queries/helpers';

import { getPantryBoxRecommendations } from '@/services/requests/recommend';

interface PantryBoxRecommendOptionsProps {
  staleTime?: number;
  pantryBoxKey: string;
  query: {
    ingredientKey?: string;
    productKey?: string;
  };
}

export const pantryBoxRecommendOptions = ({
  staleTime = STALE_TIME,
  pantryBoxKey,
  query,
}: PantryBoxRecommendOptionsProps) => ({
  queryKey: queryKeys.recommend.pantry.boxes.detail(pantryBoxKey),
  queryFn: async () => {
    const result = await getPantryBoxRecommendations({
      key: pantryBoxKey,
      options: { query },
    });

    if (result.ok) return result.data;

    throw new Error('Failed to fetch pantry box recommendations');
  },
  staleTime,
  enabled: !!pantryBoxKey,
});

const STALE_TIME = 60 * 60 * 1000; // 1 hour
