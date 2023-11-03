import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Button from "../components/Button";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        tax: cart.tax,
        totalPrice: cart.totalPrice,
      }).unwrap(); //It is an asynchronous process and will return 'Promise'. Thus, use 'unwrap' to handle this promise.
      // console.log(res);
      // console.log("clicked the res");
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (err) {
      console.log(err);
      // toast.error(err);
    }
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <div className="md:flex">
        <div className="md:w-8/12">
          <div className="p-1 mb-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h2 className="text-xl pb-4 font-semibold">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="p-1 mb-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h2 className="text-xl pb-4 font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <h2 className="text-xl pb-4 font-semibold">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="py-4 flex items-center space-x-4"
                    >
                      <div className="w-1/6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-1/2">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-500"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="w-2/6 text-right">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-4/12">
          <div className="p-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-semibold">Order Summary</h2>
              {/* <ul className="divide-y"> */}
              <ul className="divide-y divide-gray-200">
                <li className="py-2 flex justify-between">
                  <span>Items</span>
                  <span>${cart.itemsPrice}</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice}</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Tax</span>
                  <span>${cart.tax}</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Total</span>
                  <span>${cart.totalPrice}</span>
                </li>
                {error && (
                  <li className="py-2">
                    {/* <Message variant="error">{error.data.message}</Message> */}
                    <Message variant="error">{error.data.stack}</Message>
                  </li>
                )}
              </ul>
              {/* <li className="py-2"> */}
              <button
                className="mt-4 w-full"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                <Button type="submit">Place Order</Button>
              </button>
              {isLoading && <Loader />}
              {/* </li> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
