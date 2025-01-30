import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { productsOptions } from '@/queries/productsOptions';

import { useClientStore } from '@/providers/client-store-provider';

import { UserPageParams } from '../page';
import ProductCards from './ProductCards';
import NoContent from './NoContent';

function ProductList() {
  const params = useParams<UserPageParams>();
  const username = useClientStore((state) => state.user.username);
  const isUserProfile = params.username === username;

  const { data, error } = useQuery(
    productsOptions({
      type: 'username',
      q: params.username || '',
      staleTime: 180000, // 3 minutes
      enabled: isUserProfile,
    }),
  );

  if (error) return notFound();
  if (data?.length === 0) return <NoContent />;

  return <ProductCards products={data ?? []} />;
}

export default ProductList;
