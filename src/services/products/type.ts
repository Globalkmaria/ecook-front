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
