export interface ServerIngredient {
  id: string;
  name: string;
  products: IngredientProduct[];
}

export interface IngredientProduct {
  id: string;
  ingredientId: string;
  name: string;
  img?: string;
  brand?: string;
  purchasedFrom?: string;
  link?: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  ingredientProductId?: string;
  quantity: string;
}

export const RECIPE_INGREDIENTS: { [key: string]: RecipeIngredient } = {
  1: {
    id: '1',
    name: 'TomatoTomato Tomato TomatoTomato',
    quantity: '1',
    ingredientProductId: '1',
  },
  2: {
    id: '2',
    name: 'Onion',
    quantity: '1',
    ingredientProductId: '2',
  },
  3: {
    id: '3',
    name: 'Garlic',
    quantity: '1',
  },
};

export const RECIPE_INGREDIENTS_ARRAY = Object.values(RECIPE_INGREDIENTS);

export const INGREDIENTS: { [key: string]: ServerIngredient } = {
  1: {
    id: '1',
    name: 'Tomato',
    products: [
      {
        id: '1',
        ingredientId: '1',
        name: 'Tomato',
        img: '/ingredient/tomato.png',
        brand: 'Organic',
        purchasedFrom: 'Walmart',
      },
      {
        id: '2',
        ingredientId: '1',
        name: 'Tomato',
        img: '/ingredient/tomato.png',
        brand: 'Organic',
        purchasedFrom: 'Whole Foods',
      },
      {
        id: '3',
        ingredientId: '1',
        name: 'Tomato',
        img: '/ingredient/tomato.png',
        brand: 'Organic',
        purchasedFrom: "Trader Joe's",
      },
    ],
  },
  2: {
    id: '2',
    name: 'Onion',
    products: [
      {
        id: '4',
        ingredientId: '2',
        name: 'Onion',
        img: '/ingredient/onion.png',
        brand: 'Organic',
        purchasedFrom: 'Walmart',
      },
      {
        id: '5',
        ingredientId: '2',
        name: 'Onion',
        img: '/ingredient/onion.png',
        brand: 'Organic',
        purchasedFrom: 'Whole Foods',
      },
      {
        id: '6',
        ingredientId: '2',
        name: 'Onion',
        img: '/ingredient/onion.png',
        brand: 'Organic',
        purchasedFrom: "Trader Joe's",
      },
    ],
  },
  3: {
    id: '3',
    name: 'Mushroom',
    products: [
      {
        id: '7',
        ingredientId: '3',
        name: 'Mushroom',
        img: '/ingredient/mushroom.png',
        brand: 'Organic',
        purchasedFrom: 'Walmart',
      },
      {
        id: '8',
        ingredientId: '3',
        name: 'Mushroom',
        img: '/ingredient/mushroom.png',
        brand: 'Organic',
        purchasedFrom: 'Whole Foods',
      },
      {
        id: '9',
        ingredientId: '3',
        name: 'Mushroom',
        img: '/ingredient/mushroom.png',
        brand: 'Organic',
        purchasedFrom: "Trader Joe's",
      },
    ],
  },
};

export const INGREDIENTS_WITH_NAME_KEYS = Object.values(INGREDIENTS).reduce(
  (acc, ingredient) => {
    acc[ingredient.name] = ingredient;
    return acc;
  },
  {} as { [key: string]: ServerIngredient },
);

export const INGREDIENTS_NAME_KEYS_ARRAY = Object.keys(
  INGREDIENTS_WITH_NAME_KEYS,
);

export const PRODUCTS: { [key: string]: IngredientProduct } = Object.values(
  INGREDIENTS,
).reduce(
  (acc, ingredient) => {
    ingredient.products.forEach((product) => {
      acc[product.id] = product;
    });
    return acc;
  },
  {} as { [key: string]: IngredientProduct },
);
