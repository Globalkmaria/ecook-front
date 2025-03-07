export type GetPantryBoxesRes = {
  key: string;
  img: string | null;
  buyDate: string;
  expireDate: string;
  ingredientName: string;
  productName: string | null;
  quantity: number;
}[];

export interface AddPantryBoxReq {
  pantryBox: {
    ingredientKey: string;
    productKey?: string;
  };
  pantryItem: {
    quantity: number;
    buyDate: string;
    expireDate: string;
  };
}

export interface AddPantryBoxRes {
  pantryBoxKey: string;
}

export interface GetPantryBoxRes {
  key: string;
  img: string | null;
  ingredientName: string;
  productName: string | null;

  items: {
    key: string;
    buyDate: string;
    expireDate: string;
    quantity: number;
  }[];
}
