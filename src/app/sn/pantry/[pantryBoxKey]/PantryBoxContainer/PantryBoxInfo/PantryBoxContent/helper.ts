export const getTotalQuantity = (items: { quantity: number }[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);
