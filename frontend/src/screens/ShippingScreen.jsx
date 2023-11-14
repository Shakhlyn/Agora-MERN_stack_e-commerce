import { useState } from "react"; //useEffect wil see for userInfo in the localstorage. if userinfo is present, it will redirect to the specific page.
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LinkButton from "../Utils/LinkButton";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckOutSteps";
import Meta from "../components/Meta";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedAddress = address.trim();
    const trimmedCity = city.trim();
    const trimmedPostalCode = postalCode.trim();
    const trimmedCountry = country.trim();

    dispatch(
      saveShippingAddress({
        address: trimmedAddress,
        city: trimmedCity,
        postalCode: trimmedPostalCode,
        country: trimmedCountry,
      })
    );
    navigate("/payment");
  };

  return (
    <>
      <Meta title="shipping" />

      <FormContainer>
        <CheckoutSteps step1 step2 />

        <h1 className="text-3xl font-bold mb-8">Shipping</h1>

        <form onSubmit={submitHandler} className="space-y-4 text-sm">
          <div className="flex flex-col w-full ">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="city">City:</label>

            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="City"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Postal Code"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-between">
            <LinkButton to="/cart" button="Back to cart"></LinkButton>
            <button>
              <Button type="submit" onClick={submitHandler}>
                Continue Purchasing
              </Button>
            </button>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
