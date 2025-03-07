import { pantryBoxesOptions } from '@/queries/options/pantry/pantryBoxesOptions';
import { useQuery } from '@tanstack/react-query';
import PantryBoxes from '../PantryBox';

function LogInUserPantry() {
  const { data, isLoading, isError } = useQuery(pantryBoxesOptions({}));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ingredients</div>;
  if (!data || data.length === 0)
    return <div>Add some ingredients to your pantry to see them here</div>;

  return <PantryBoxes items={data} />;
}

export default LogInUserPantry;
