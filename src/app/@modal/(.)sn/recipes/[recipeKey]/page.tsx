import ModalRecipe from './ModalRecipe';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function RecipePage({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) return null;

  return <ModalRecipe recipeKey={recipeKey} />;
}

export default RecipePage;
