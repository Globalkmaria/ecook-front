import { pantryBoxesOptions } from '@/queries/options/pantry/pantryBoxesOptions';
import { useQuery } from '@tanstack/react-query';
import PantryBoxes from '../PantryBox';
import useLogout from '@/hooks/useLogout';
import { isUnauthorizedError } from '@/services/utils';
import { useEffect } from 'react';

function LogInUserPantry() {
  const logout = useLogout();

  const { data, isLoading, isError, error } = useQuery(pantryBoxesOptions({}));

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      logout();
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!data || data.length === 0)
    return <div>Add some ingredients to your pantry to see them here</div>;

  return <PantryBoxes items={data} />;
}

export default LogInUserPantry;
