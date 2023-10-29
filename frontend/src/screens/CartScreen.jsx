import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LinkButton from "../Utils/LinkButton";
import Button from "../components/Button";
import Card from "../Utils/Card";
import Message from "../components/message";

import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  // We can get state from 'localStorage'
  // const cartItems = JSON.parse(localStorage.getItem("cart"));

  // Or from store
  const cart = useSelector((state) => {
    return state.cart;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className=" grid grid-cols-12 gap-10 ">
      {/* <div className=" bg-slate-600 text-stone-50 min-h-screen "> */}
      <div className="col-span-8">
        <div>
          <h1 className=" mb-5 text-2xl font-bold ">Shopping Cart</h1>
          {cart.cartItems.length === 0 ? (
            <Message>
              <div className="flex flex-row justify-between">
                <p>Your Cart is empty</p>
                <LinkButton button="Go Back" to="/" />
              </div>
            </Message>
          ) : (
            <div className="">
              {cart.cartItems.map((item) => (
                <div
                  key={item._id}
                  className=" grid grid-cols-12 gap-4 shadow-md rounded-sm border-slate-600 my-2 items-center"
                >
                  <div className=" col-span-2 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className=" rounded-sm "
                    />
                  </div>
                  <div className=" col-span-6 ">
                    <Link to={`/products/${item._id}`}> {item.name} </Link>
                  </div>
                  <div className=" col-span-2 text-center ">${item.price}</div>
                  <div className=" col-span-1 text-center">
                    <select
                      className=" border shadow-sm "
                      name="qty"
                      id={item._id}
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" col-span-1 ">
                    <button onClick={() => removeCartHandler(item._id)}>
                      <FaTrash className="fill-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-4">
        <Card>
          <h2 className=" text-lg font-semibold mb-4 ">
            {" "}
            Subtotal: ({totalItems}) items{" "}
          </h2>
          <p className="">
            {totalItems > 1 ? "items'" : "item's"} Price: ${cart.itemsPrice}
          </p>

          <hr className="my-8 " />

          {totalItems > 0 ? (
            <button type="submit" onClick={checkoutHandler}>
              <Button>Proceed to Checkout</Button>
            </button>
          ) : (
            <p className=" text-center ">Proceed to Checkout</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CartScreen;
