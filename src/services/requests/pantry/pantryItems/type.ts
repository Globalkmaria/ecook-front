export interface AddPantryItemReq {
  pantryBoxKey: string;
  buyDate: string;
  expirationDate: string;
  quantity: number;
}

export interface AddPantryItemRes {
  pantryItemKey: string;
}

export interface UpdatePantryItemReq {
  name: string;
  value: string;
}
