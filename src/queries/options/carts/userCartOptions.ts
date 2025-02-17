import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/queries/helpers';

import { getUserCart } from '@/services/requests/carts';
import {
  FORBIDDEN_ERROR,
  isForbiddenResponse,
  isUnauthorizedResponse,
  UNAUTHORIZED_ERROR,
} from '@/services/utils';

interface Props {
  staleTime?: number;
  username: string;
  enabled: boolean;
}

export const userCartOptions = ({
  staleTime = 60000, // 1 mins , MS
  username,
  enabled,
}: Props) =>
  queryOptions({
    queryKey: queryKeys.carts.user.list(username),
    queryFn: async () => {
      const result = await getUserCart(username);

      if (result.ok) return result.data.items;

      if (isUnauthorizedResponse(result.res))
        throw new Error(UNAUTHORIZED_ERROR);

      if (isForbiddenResponse(result.res)) throw new Error(FORBIDDEN_ERROR);

      throw new Error('Failed to fetch cart');
    },
    staleTime,
    enabled,
  });
