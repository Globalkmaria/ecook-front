import { useParams } from 'next/navigation';

import { productsOptions } from '@/queries/options';

import { SuspenseQuery } from '@/app/components/common/SuspenseQuery';

import { useClientStore } from '@/providers/client-store-provider';
import { PRODUCT_TYPES } from '@/services/requests/products';

import { UserPageParams } from '../page';
import NoContent from './NoContent';
import ProductCards, {
  ProductCardsProps,
  ProductCardsSkeleton,
} from './ProductCards';

function ProductList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  return (
    <SuspenseQuery
      {...productsOptions({
        type: PRODUCT_TYPES.USERNAME,
        q: params.username || '',
        enabled: isUserProfile,
        staleTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
        gcTime: isUserProfile ? 0 : 1000 * 60 * 60, // 1 hour
      })}
      errorFallback={() => <p>Failed to get products.</p>}
      fallback={<ProductCardsSkeleton />}
    >
      {(data) => <ProductListBody data={data} />}
    </SuspenseQuery>
  );
}

export default ProductList;

function ProductListBody({ data }: { data: ProductCardsProps['products'] }) {
  if (!data?.length) return <NoContent />;

  return <ProductCards products={data} />;
}
