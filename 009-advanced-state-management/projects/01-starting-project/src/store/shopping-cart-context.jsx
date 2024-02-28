import { createContext } from "react";

// naming this variable with starting letter in uppercase is a best practice or widely known convention
// It's not mandatory but good to use
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
