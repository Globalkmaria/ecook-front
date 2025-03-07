import { pantryBoxesOptions } from '@/queries/options/pantry/pantryBoxesOptions';
import { useQuery } from '@tanstack/react-query';
import PantryBoxes from '../PantryBox';
import useLogout from '@/hooks/useLogout';
import { isUnauthorizedError } from '@/services/utils';

function LogInUserPantry() {
  const logout = useLogout();
  const { data, isLoading, isError, error } = useQuery(pantryBoxesOptions({}));
  if (isLoading) return <div>Loading...</div>;
  if (isUnauthorizedError(error)) {
    logout();
    return null;
  }
  if (isError) return <div>Error fetching ingredients</div>;
  if (!data || data.length === 0)
    return <div>Add some ingredients to your pantry to see them here</div>;

  return <PantryBoxes items={data} />;
}

export default LogInUserPantry;
