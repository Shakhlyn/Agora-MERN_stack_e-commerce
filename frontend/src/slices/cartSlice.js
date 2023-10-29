import { createSlice } from "@reduxjs/toolkit";

import { updateCart } from "../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

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
        (el) => el._id !== action.payload //since here, we use id, we have to pass item.id instead of item from calling function component, cartScreen.
      );
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

//original value is saved in "cartSlice.actions.addToCart". It is a destructured form
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
