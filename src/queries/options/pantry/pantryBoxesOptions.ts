import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import { getPantryBoxes } from '@/services/requests/pantry/pantryBoxes';
import { isUnauthorizedResponse, UNAUTHORIZED_ERROR } from '@/services/utils';

const STALE_TIME = 60 * 60 * 1000; // 1 hour

interface Props {
  staleTime?: number;
}

export const pantryBoxesOptions = ({ staleTime = STALE_TIME }: Props) =>
  queryOptions({
    queryKey: queryKeys.pantry.boxes.list(),
    queryFn: async () => {
      const result = await getPantryBoxes();
      if (result.ok) {
        return result.data;
      }

      if (isUnauthorizedResponse(result.res))
        throw new Error(UNAUTHORIZED_ERROR);

      throw new Error('Failed to fetch pantry boxes');
    },
    staleTime,
  });
