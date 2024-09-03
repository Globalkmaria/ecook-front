import Recipe from './Recipe';

interface Props {
  params: { recipeId: string };
}

function RecipePage({ params }: Props) {
  return <Recipe recipeId={params.recipeId} />;
}

export default RecipePage;
