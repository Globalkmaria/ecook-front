export interface UpdatePantryItemReq {
  name: string;
  value: string | number;
}

export interface DeletePantryItem {
  pantryBoxDeleted: boolean;
}
