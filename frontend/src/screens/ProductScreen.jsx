import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import products from "../products";
import LinkButton from "../Utils/LinkButton";
import Card from "../Utils/Card";
import Ratings from "../components/Ratings";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Message from "../components/message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const changeQtyHandler = (e) => {
    setQty(Number(e.target.value));
  };

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    const productWithQty = { ...product.data, qty };
    // console.log(productWithQty);
    dispatch(addToCart(productWithQty));
    navigate("/cart");
  };

  return (
    <>
      <LinkButton to="/" button="Go Home" />
      {isLoading && <Loader />}
      {isError && (
        <Message variant="success">
          <>{error?.data?.message || error.error} </>
        </Message>
      )}
      {isSuccess && (
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className=" mobile:col-span-8 mobile:col-start-3 md:col-span-4">
            <img
              src={product.data.image}
              alt={product.data.name}
              className=" rounded-md "
            />
          </div>
          <div className=" mobile:col-span-7 md:col-span-5 flex flex-col gap-4 ">
            <h3 className=" text-lg font-semibold ">{product.data.name}</h3>
            <hr />
            <Ratings
              rating={product.data.rating}
              ratingNumber={product.data.numReviews}
            />
            <hr />
            <p>Price: ${product.data.price}</p>
          </div>
          <div className="mobile:col-span-5 md:col-span-3">
            <Card>
              <div className="flex flex-col gap-3">
                <div className=" flex flex-row justify-between ">
                  <p>Price: </p>
                  <p>${product.data.price}</p>
                </div>
                <hr />

                <div className=" flex flex-row justify-between ">
                  <p>Status: </p>
                  <p>
                    {product.data.countInStock > 0
                      ? `In Stock: ${product.data.countInStock}`
                      : "Out of Stock"}
                  </p>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p>Quantity</p>
                  <select
                    name="qty"
                    id="qty"
                    value={qty}
                    onChange={changeQtyHandler}
                  >
                    {[...Array(product.data.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <hr />

                <button type="submit" onClick={addToCartHandler}>
                  <Button>Add to Cart</Button>
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
