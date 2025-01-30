import { capitalizeFirstLetter } from '@/utils/text';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageContainer from './ProductPageContainer';
import { getProduct } from '@/services/product';
import { productOptions } from '@/queries/productOptions';

export const revalidate = 86400; // 1 day

export type RecipePageParams = {
  productKey: string;
};

interface Props {
  params: Promise<RecipePageParams>;
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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageContainer />
    </HydrationBoundary>
  );
}

export default Page;
