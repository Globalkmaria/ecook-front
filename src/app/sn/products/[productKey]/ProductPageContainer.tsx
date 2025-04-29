import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  queryOptions,
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

function ProductPageContainer({ productKey }: Props) {
  if (!productKey) notFound();

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(queryOptions(productOptions({ key: productKey })));
  queryClient.prefetchQuery(
    queryOptions(productRecommendOptions({ key: productKey })),
  );
  queryClient.prefetchQuery(
    queryOptions(
      productsOptions({
        type: PRODUCT_TYPES.PRODUCT_KEY,
        q: productKey,
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
