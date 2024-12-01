import { getRecipe } from '@/service/recipes';
import ModalRecipes from './ModalRecipes';

interface Props {
  params: Promise<{ key: string }>;
}

async function RecipePage({ params }: Props) {
  const { key } = await params;
  if (!key) return null;

  const result = await getRecipe(key);
  if (!result.ok) return null;

  return <ModalRecipes recipe={result.data} />;
}

export default RecipePage;
