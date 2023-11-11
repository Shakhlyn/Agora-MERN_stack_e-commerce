import { useParams } from "react-router-dom";

import Product from "../components/Product";
import Paginate from "../components/Paginate";

import Loader from "../components/Loader.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Message from "../components/message.jsx";

const HomeScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery({
    pageNumber,
  });

  // In the backend, we'll extract pagenumber from query. thus, we have to pass query like: {pageNumber:pageNumber} or in a short way: {pageNumber}

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
          <section>
            <h1 className=" text-2xl font-bold ">Latest Products</h1>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-2 mobile:gap-6 sm:gap-4 ">
              {data.data.products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
            </ul>
          </section>
          <Paginate
            totalPages={data.data.totalPages}
            currentPage={data.data.currentPage}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
