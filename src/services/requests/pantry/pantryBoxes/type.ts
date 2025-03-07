export type GetPantryBoxesRes = {
  key: string;
  img: string | null;
  buyDate: Date;
  expireDate: Date;
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
    buyDate: Date;
    expireDate: Date;
    quantity: number;
  }[];
}
