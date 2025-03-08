import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { productsOptions } from '@/queries/options';

import { useClientStore } from '@/providers/client-store-provider';
import { PRODUCT_TYPES } from '@/services/requests/products';

import { UserPageParams } from '../page';
import NoContent from './NoContent';
import ProductCards from './ProductCards';

function ProductList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data, error } = useQuery(
    productsOptions({
      type: PRODUCT_TYPES.USERNAME,
      q: params.username || '',
      enabled: isUserProfile,
    }),
  );

  if (error) return notFound();
  if (data?.length === 0) return <NoContent />;

  return <ProductCards products={data ?? []} />;
}

export default ProductList;
