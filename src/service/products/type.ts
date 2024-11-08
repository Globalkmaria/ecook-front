export interface Product {
  id: string;
  ingredientId: string;
  userId: string;
  name: string;
  brand: string;
  purchasedFrom: string;
  link: string | null;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}
