import { getRecipe } from '@/service/recipes';
import Recipe from './Recipe';

interface Props {
  params: Promise<{ key: string }>;
}

async function Page({ params }: Props) {
  const { key } = await params;
  if (!key) return null;

  const result = await getRecipe(key);
  if (!result.ok) return null;

  return <Recipe recipe={result.data} />;
}

export default Page;
