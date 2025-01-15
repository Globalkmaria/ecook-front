'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateRecipeDetailInformation(key: string) {
  revalidatePath(`/recipes/${key}`);
}
