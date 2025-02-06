import { pluralize } from '@/utils/text';

export const getCountText = (count: number) => {
  if (count === 0) return "You haven't saved any recipes yet.";

  return `${count} saved ${pluralize('recipe', count)}`;
};
