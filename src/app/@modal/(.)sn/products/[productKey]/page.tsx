import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { productOptions } from '@/queries/productOptions';

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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalProduct />
    </HydrationBoundary>
  );
}

export default ProductPage;
