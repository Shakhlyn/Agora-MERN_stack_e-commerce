import { useParams } from "react-router-dom";

import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Message from "../components/message";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel.jsx";

import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const HomeScreen = () => {
  const { searchKeyword, pageNumber } = useParams();

  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery({
    searchKeyword,
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
          {!searchKeyword && !pageNumber && (
            <div className="mobile:h-48 md:h-60 lg:h-72  ">
              <ProductCarousel />
            </div>
          )}
          <section>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-2 mobile:gap-6 sm:gap-4 ">
              {data.data.products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
            </ul>
          </section>
          <Paginate
            totalPages={data.data.totalPages}
            currentPage={data.data.currentPage}
            searchKeyword={searchKeyword}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
