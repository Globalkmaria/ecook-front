import { PRODUCT_TYPES } from '.';

export interface Product {
  id: string;
  ingredient: { id: string; name: string };
  userId: string;
  name: string;
  brand: string;
  purchasedFrom: string;
  link: string | null;
  img: string;
  createdAt: Date;
  updatedAt: Date;
  key: string;
}

export interface GetProductsReq {
  type: ProductQueryTypes;
  q: string;
  options?: RequestInit;
}

export interface GetProductsRes {
  ingredientId: string | null;
  products: Product[];
}

export type ProductQueryTypes =
  (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
