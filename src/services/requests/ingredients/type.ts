export interface GetIngredientsWithProductsReq {
  items: {
    [ingredientKey: string]: {
      productKey?: string[];
    };
  };
}

export type IngredientWithProduct = {
  ingredient: {
    name: string;
    key: string;
  };
  products: {
    [productKey: string]: {
      name: string;
      brand: string;
      purchasedFrom: string;
      img: string;
      key: string;
    };
  };
};

export interface GetIngredientsWithProductsRes {
  [ingredientKey: string]: IngredientWithProduct;
}
