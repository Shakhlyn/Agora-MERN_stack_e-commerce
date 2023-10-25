export const makeDacimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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

  return state;
};
