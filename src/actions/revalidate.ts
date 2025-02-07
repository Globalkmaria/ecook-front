'use server';

import { revalidateTag } from 'next/cache';

export const revalidateTagRecipeDetail = async (key: string) =>
  revalidateTag(key);
