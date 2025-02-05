import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getProduct } from '@/services/product';
import { PRODUCT_TYPES } from '@/services/products';

import { productsOptions } from '@/queries/productsOptions';
import { productOptions } from '@/queries/productOptions';
import { productRecommendOptions } from '@/queries/productRecommendOptions';

import { capitalizeFirstLetter } from '@/utils/text';

import ProductPageContainer from './ProductPageContainer';

export const revalidate = 86400; // 1 day

export type ProductPageParams = {
  productKey: string;
};

interface Props {
  params: Promise<ProductPageParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productKey = (await params).productKey;

  const result = await getProduct(productKey);

  if (!result.ok) return {};

  const product = result.data;
  return {
    title: `${capitalizeFirstLetter(product.name)} - E-COOK`,
    description: `Discover ${product.name} product.`,
    openGraph: {
      images: [
        {
          url: product.img,
          width: 600,
          height: 400,
        },
      ],
    },
  };
}

async function Page({ params }: Props) {
  const { productKey } = await params;
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
      <ProductPageContainer />
    </HydrationBoundary>
  );
}

export default Page;
