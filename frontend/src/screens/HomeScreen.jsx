// import products from "../products.js";
import Product from "../components/Product.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className=" text-2xl font-bold ">Latest Products</h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-2 mobile:gap-6 sm:gap-4 ">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </ul>
    </>
  );
};

export default HomeScreen;
