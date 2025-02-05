import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { PRODUCT_TYPES } from '@/services/products';

import { productsOptions } from '@/queries/productsOptions';
import { productOptions } from '@/queries/productOptions';
import { productRecommendOptions } from '@/queries/productRecommendOptions';

import { ProductPageParams } from '@/app/sn/products/[productKey]/page';

import ModalProduct from './ModalProduct';

interface Props {
  params: Promise<ProductPageParams>;
}

async function ProductPage({ params }: Props) {
  const { productKey } = await params;
  if (!productKey) return null;

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
      <ModalProduct />
    </HydrationBoundary>
  );
}

export default ProductPage;
