import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import {
  productOptions,
  productRecommendOptions,
  productsOptions,
} from '@/queries/options';

import { PRODUCT_TYPES } from '@/services/requests/products';

import ProductContent from './ProductContent';

interface Props {
  productKey: string;
}

async function ProductPageContainer({ productKey }: Props) {
  if (!productKey) notFound();

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(productOptions({ key: productKey })),
    queryClient.prefetchQuery(productRecommendOptions({ key: productKey })),
    queryClient.prefetchQuery(
      productsOptions({
        type: PRODUCT_TYPES.PRODUCT_KEY,
        q: productKey,
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductContent />
    </HydrationBoundary>
  );
}

export default ProductPageContainer;
