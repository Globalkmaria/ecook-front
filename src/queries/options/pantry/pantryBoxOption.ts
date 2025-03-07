import { queryKeys } from '@/queries/helpers';
import { getPantryBox } from '@/services/requests/pantry/pantryBoxes';
import { isUnauthorizedResponse, UNAUTHORIZED_ERROR } from '@/services/utils';
import { queryOptions } from '@tanstack/react-query';

interface Props {
  staleTime?: number;
  pantryBoxKey: string;
}

export const pantryBoxOptions = ({
  pantryBoxKey,
  staleTime = STALE_TIME,
}: Props) =>
  queryOptions({
    queryKey: queryKeys.pantry.boxes.box.detail(pantryBoxKey),
    queryFn: async () => {
      const result = await getPantryBox(pantryBoxKey);
      if (result.ok) {
        return result.data;
      }

      if (isUnauthorizedResponse(result.res))
        throw new Error(UNAUTHORIZED_ERROR);

      throw new Error('Failed to fetch pantry box detail');
    },
    staleTime,
    enabled: !!pantryBoxKey,
  });

const STALE_TIME = 60 * 60 * 1000; // 1 hour
