'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateTagRecipeDetail(key: string) {
  revalidateTag(key);
}
