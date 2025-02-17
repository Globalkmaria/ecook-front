export interface GetUserCartRes {
  items: {
    ingredient: { name: string; key: string; quantity?: number };
    products: {
      key: string;
      name: string;
      brand: string;
      purchasedFrom: string;
      img: string;
      quantity: number;
    }[];
  }[];
}

export interface CreateCartItemReq {
  username: string;
  ingredientKey: string;
  productKey?: string;
}
