import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Message from "../components/message.jsx";

const HomeScreen = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery();

  return (
    <>
      {isLoading && <Loader />}

      {isError && (
        <Message variant="error">
          {error?.data?.message || error.error}{" "}
        </Message>
      )}

      {isSuccess && (
        <>
          <h1 className=" text-2xl font-bold ">Latest Products</h1>
          <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-2 mobile:gap-6 sm:gap-4 ">
            {data.data.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default HomeScreen;
