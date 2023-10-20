import React from "react";
import { useParams, Link } from "react-router-dom";

import products from "../products";
import Button from "../Utils/LinkButton";
import Card from "../Utils/Card";
import Ratings from "../components/Ratings";
import LinkButton from "../Utils/LinkButton";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);

  return (
    <>
      <Button to="/" button="Go back" />
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className=" mobile:col-span-8 mobile:col-start-3 md:col-span-4">
          <img
            src={product.image}
            alt={product.name}
            className=" rounded-md "
          />
        </div>
        <div className=" mobile:col-span-7 md:col-span-5 flex flex-col gap-4 ">
          <h3 className=" text-lg font-semibold ">{product.name}</h3>
          <hr />
          <Ratings rating={product.rating} ratingNumber={product.numReviews} />
          <hr />
          <p>Price: ${product.price}</p>
        </div>
        <div className="mobile:col-span-5 md:col-span-3">
          <Card>
            <div className="flex flex-col gap-3">
              <div className=" flex flex-row justify-between ">
                <p>Price: </p>
                <p>${product.price}</p>
              </div>
              <hr />

              <div className=" flex flex-row justify-between ">
                <p>Status: </p>
                <p>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
              </div>
              <hr />
              <LinkButton to="/cart" button="Add to Cart" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
