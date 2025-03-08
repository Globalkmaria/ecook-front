import { GetIngredientsWithProductsReq } from '@/services/requests/ingredients/type';

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

const ingredientsKeys = {
  all: () => ['ingredients'],
  products: (items: GetIngredientsWithProductsReq['items']) => [
    ...ingredientsKeys.all(),
    'products',
    items,
  ],
} as const;

const cartsKeys = {
  all: () => ['carts'],
  user: {
    all: (username: string) => [...cartsKeys.all(), 'user', username],
    list: (username: string) => [...cartsKeys.user.all(username), 'list'],
  },
} as const;

const pantryKeys = {
  all: () => ['pantry'],
  boxes: {
    all: () => [...pantryKeys.all(), 'boxes'],
    list: () => [...pantryKeys.boxes.all(), 'list'],
    box: {
      all: (boxKey: string) => [...pantryKeys.all(), 'box', boxKey],
      detail: (boxKey: string) => [
        ...pantryKeys.boxes.box.all(boxKey),
        'detail',
      ],
    },
  },
} as const;

const recommendKeys = {
  all: () => ['recommend'],
  pantry: {
    all: () => [...recommendKeys.all(), 'pantry'],
    boxes: {
      all: () => [...recommendKeys.pantry.all(), 'boxes'],
      detail: (pantryBoxKey: string) => [
        ...recommendKeys.pantry.boxes.all(),
        pantryBoxKey,
      ],
    },
  },
} as const;

export const queryKeys = {
  recipes: recipesKeys,
  users: usersKeys,
  bookmarks: bookmarksKeys,
  products: productsKeys,
  ingredients: ingredientsKeys,
  carts: cartsKeys,
  pantry: pantryKeys,
  recommend: recommendKeys,
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
