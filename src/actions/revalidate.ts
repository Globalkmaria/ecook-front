'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateRecipeDetailInformation(key: string) {
  revalidatePath(`/recipes/${key}`);
}

export async function revalidateUserPage(username: string) {
  revalidatePath(`/users/${username}`);
}
