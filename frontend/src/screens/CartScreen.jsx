import React from "react";

const cartitems = JSON.parse(localStorage.getItem("cart"));

const CartScreen = () => {
  return (
    <>
      <div>
        <p>hi</p>
        {cartitems && (
          <>
            <div> {`Total Price: ${cartitems.itemsPrice}`} </div>
            <div> {`Shipping Price: ${cartitems.shippingPrice}`} </div>
            <div> {`Tax: ${cartitems.tax}`} </div>
            <div> {`Total Price: ${cartitems.totalPrice}`} </div>
            {cartitems.cartItems.map((item) => (
              <div key={item._id}>
                <span>{item.name}</span> <span> - </span>
                <span>{item.rating}</span> <span> - </span>
                <span>{item.qty}</span> <span> - </span>
                <span>{item.price}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
