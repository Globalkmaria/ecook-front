import { Metadata } from 'next';

import { capitalizeFirstLetter } from '@/utils/text';

import { getProduct } from '@/services/requests/product';

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

  const result = await getProduct(productKey, {
    cache: 'force-cache',
    next: {
      revalidate: 86400, // 24 hours ,
    },
  });

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

  return <ProductPageContainer productKey={productKey} />;
}

export default Page;
