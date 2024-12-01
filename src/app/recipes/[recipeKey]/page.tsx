import { getRecipe } from '@/service/recipes';
import Recipe from './Recipe';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ recipeKey: string }>;
}

async function Page({ params }: Props) {
  const { recipeKey } = await params;
  if (!recipeKey) {
    redirect('/');
  }

  const result = await getRecipe(recipeKey);
  if (!result.ok) {
    redirect('/');
  }

  return <Recipe recipe={result.data} />;
}

export default Page;
