import React from "react";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";

import LinkButton from "../Utils/LinkButton";
import Card from "../Utils/Card";
import Ratings from "../components/Ratings";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Message from "../components/message";
import Meta from "../components/Meta";

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const changeQtyHandler = (e) => {
    setQty(Number(e.target.value));
  };

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    const productWithQty = { ...product.data, qty };
    // console.log(productWithQty);
    dispatch(addToCart(productWithQty));
    navigate("/cart");
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ rating, comment, productId }).unwrap();
      refetch();
      toast.success("Review submitted.");
    } catch (err) {
      console.log(err.data.stack);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <LinkButton to="/" button="Go Home" />
      {isLoading && <Loader />}
      {isError && (
        <Message variant="success">
          {error?.data?.message || error.error}
        </Message>
      )}
      {isSuccess && (
        <>
          <Meta
            title={product.data.name}
            description={product.data.description}
          />

          <div className="grid grid-cols-12 gap-6 mt-8">
            <div className=" mobile:col-span-8 mobile:col-start-3 md:col-span-4 text-center ">
              <img
                src={product.data.image}
                alt={product.data.name}
                className=" h-40 w-auto rounded-md "
              />
            </div>
            <div className=" mobile:col-span-5 md:col-span-5 flex flex-col gap-4 ">
              <h3 className=" text-lg font-semibold ">{product.data.name}</h3>
              <hr />
              <Ratings
                rating={product.data.rating}
                numReviews={product.data.numReviews}
              />
              <hr />
              <p>Price: ${product.data.price}</p>
            </div>
            <div className="mobile:col-span-7 md:col-span-3">
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

                  {product.data.countInStock > 0 && (
                    <button type="submit" onClick={addToCartHandler}>
                      <Button>Add to Cart</Button>
                    </button>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Review section */}

          <div className="mt-8 mb-4">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:space-x-4 ">
              <div className=" mobile:w-9/12 mobile:mx-auto md:w-7/12">
                {product.data.reviews.length === 0 && (
                  <p className="text-gray-500">No Reviews</p>
                )}

                <div className="mt-2 space-y-2">
                  {product.data.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-gray-300 py-2"
                    >
                      <p className="font-semibold">{review.name}</p>

                      <div className="flex flex-row justify-between">
                        <Ratings rating={review.rating} />
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(review.createdAt),
                            "MMM d, yyyy h:mm a"
                          )}
                        </p>
                      </div>

                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" mobile:w-9/12 mobile:mx-auto md:w-5/12 mt-4 md:mt-0">
                <h2 className="text-lg font-bold">Write a Review</h2>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <form
                    onSubmit={reviewSubmitHandler}
                    className="mt-2 p-4 shadow-md rounded-md "
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="rating"
                        className="block font-semibold text-gray-600"
                      >
                        Rating
                      </label>
                      <select
                        id="rating"
                        className="w-full p-2 border rounded-md"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block font-semibold text-gray-600"
                      >
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      disabled={loadingProductReview}
                      type="submit"
                      // className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      <Button>
                        <span>Submit</span>
                      </Button>
                    </button>
                  </form>
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-700">
                      Please{" "}
                      <Link
                        to={`/login?redirect=/products/${productId}`}
                        className="text-blue-500"
                      >
                        log in
                      </Link>{" "}
                      to write a review
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
