const recipesKeys = {
  all: () => ['recipes'],
  list: ({ query, type }: { query: string; type: string }) => [
    ...queryKeys.recipes.all(),
    { query, type },
  ],
  recipe: {
    all: (recipeKey: string) => ['recipe', recipeKey],
    detail: (recipeKey: string) => [
      ...queryKeys.recipes.recipe.all(recipeKey),
      'detail',
    ],
    recommend: (recipeKey: string) => [
      ...queryKeys.recipes.recipe.all(recipeKey),
      'recommend',
    ],
  },
};

const usersKeys = {
  all: () => ['users'],
  user: {
    all: (username: string) => [...queryKeys.users.all(), 'user', { username }],
    profile: (username: string) => [
      ...queryKeys.users.user.all(username),
      'profile',
    ],
    bookmarks: (username: string) => [
      ...queryKeys.users.user.all(username),
      'bookmarks',
    ],
  },
} as const;

const bookmarksKeys = {
  all: 'bookmarks',
  list: () => [queryKeys.bookmarks.all, 'list'],
  recipes: {
    all: () => [queryKeys.bookmarks.all, 'recipes'],
    list: () => [...queryKeys.bookmarks.recipes.all(), 'list'],
  },
} as const;

const productsKeys = {
  all: () => ['products'],
  list: ({ type, query }: { type: string; query: string }) => [
    ...queryKeys.products.all(),
    'list',
    { type, query },
  ],
  product: {
    all: () => [...queryKeys.products.all(), 'product'],
    detail: (productKey: string) => [
      ...queryKeys.products.product.all(),
      productKey,
    ],
    recommend: (productKey: string) => [
      ...queryKeys.products.product.all(),
      productKey,
      'recommend',
    ],
  },
} as const;

export const queryKeys = {
  recipes: recipesKeys,
  users: usersKeys,
  bookmarks: bookmarksKeys,
  products: productsKeys,
} as const;

export const mutationKeys = {
  recipes: {
    all: ['recipes'],
    create: () => [...queryKeys.recipes.all(), 'create'],
    recipe: {
      all: (recipeKey: string) => [
        ...queryKeys.recipes.all(),
        'recipe',
        recipeKey,
      ],
      update: (recipeKey: string) => [
        ...queryKeys.recipes.recipe.all(recipeKey),
        'update',
      ],
      delete: (recipeKey: string) => [
        ...queryKeys.recipes.recipe.all(recipeKey),
        'delete',
      ],
    },
  },
} as const;
