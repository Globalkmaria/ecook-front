import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getQueryClient } from '@/queries/get-query-client';
import {
  productOptions,
  productRecommendOptions,
  productsOptions,
} from '@/queries/options';

import { getProduct } from '@/services/requests/product';
import { PRODUCT_TYPES } from '@/services/requests/products';

import ProductContent from './ProductContent';

interface Props {
  productKey: string;
}

async function ProductPageContainer({ productKey }: Props) {
  if (!productKey) notFound();

  const result = await getProduct(productKey);

  if (!result.ok) notFound();

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    queryOptions(productOptions({ key: productKey, enabled: true })),
  );
  queryClient.prefetchQuery(
    queryOptions(productRecommendOptions({ key: productKey, enabled: true })),
  );
  queryClient.prefetchQuery(
    queryOptions(
      productsOptions({
        type: PRODUCT_TYPES.PRODUCT_KEY,
        q: productKey,
        staleTime: 86400000, // 24 hours , MS
      }),
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductContent />
    </HydrationBoundary>
  );
}

export default ProductPageContainer;
