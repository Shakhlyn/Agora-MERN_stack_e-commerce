import products from "../products.js";
import Product from "../components/Product.jsx";

const HomeScreen = () => {
  return (
    <div className=" w-11/12 m-auto ">
      <h1 className=" text-2xl font-bold ">Latest Products</h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-2 mobile:gap-6 sm:gap-4 ">
        {products.map((product) => {
          return <Product product={product} />;
        })}
      </ul>
    </div>
  );
};

export default HomeScreen;
