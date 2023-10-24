import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, tax: 0, totalPrice: 0 };

const makeDacimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems?.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        state.cartItems = state.cartItems?.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + action.payload.qty }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }

      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemsPrice = makeDacimal(itemsPrice);

      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      state.shippingPrice = makeDacimal(shippingPrice);

      const tax = itemsPrice * 0.15;
      state.tax = makeDacimal(tax);

      const totalPrice = itemsPrice + shippingPrice + tax;
      state.totalPrice = makeDacimal(totalPrice);

      localStorage.setItem("cart", JSON.stringify(state));
      // localStorage.setItem("cart", JSON.stringify({ name: "man" }));

      console.log(JSON.parse(localStorage.getItem("cart")));
    },
  },
});

//original value is saved in "cartSlice.actions.addToCart". It is a destructured form
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
