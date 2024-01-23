import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import Button from "../components/Button";

import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import Meta from "../components/Meta";

const PaymentMethodScreen = () => {
  // const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <Meta />

      <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1 className="text-xl font-semibold mb-4">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <div className="block text-sm font-medium text-gray-700">
              Select Method
            </div>
            <div className="mt-2 space-y-4">
              {/* Just working on paypal payment */}

              {/* <div className="flex items-center">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value={paymentMethod}
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 border-indigo-600"
                />
                <label htmlFor="PayPal" className="ml-2 text-sm text-gray-700">
                  PayPal or Credit Card
                </label>
              </div> */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value={paymentMethod}
                  checked={paymentMethod === "cash-on-delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 border-indigo-600"
                />
                <label htmlFor="PayPal" className="ml-2 text-md text-gray-700">
                  Cash-on Delivery
                </label>
              </div>
              {/* More payment methods can be added here if needed */}
            </div>
          </div>
          <button className="mt-4">
            <Button type="submit">Continue</Button>
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentMethodScreen;
