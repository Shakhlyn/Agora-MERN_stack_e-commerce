import React from "react";
import { useParams } from "react-router-dom";

// import products from "../products";
import Button from "../Utils/LinkButton";
import Card from "../Utils/Card";
import Ratings from "../components/Ratings";
import LinkButton from "../Utils/LinkButton";
import Loader from "../components/Loader";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Button to="/" button="Go back" />
      {isLoading && <Loader />}
      {isError && <div>{error?.data?.message || error.error} </div>}
      {isSuccess && (
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className=" mobile:col-span-8 mobile:col-start-3 md:col-span-4">
            <img
              src={product.data.image}
              alt={product.data.name}
              className=" rounded-md "
            />
            {/* <p>IMAGE</p> */}
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
                <LinkButton to="/cart" button="Add to Cart" />
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
