import { createSlice } from "@reduxjs/toolkit";

import { updateCart } from "../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, tax: 0, totalPrice: 0 };

// const makeDacimal = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems?.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        // state.cartItems = state.cartItems?.map((item) =>
        state.cartItems = state.cartItems.map((item) =>
          // item._id === action.payload._id
          item._id === existingItem._id
            ? // ? { ...item, qty: item.qty + action.payload.qty }
              action.payload
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (el) => el._id !== action.payload //since here, we use item, we have to pass item instead of id from calling function.
      );
      return updateCart(state);
    },
  },
});

//original value is saved in "cartSlice.actions.addToCart". It is a destructured form
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
