import { Link } from "react-router-dom";

import Card from "../Utils/Card";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <li>
      <Card>
        <div className="rounded-sm pb-4 flex justify-center ">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.image}
              alt="product picture"
              // className="rounded-md "
              className="min-w-full h-20 sm:h-30 md:h-30 lg:h-30 xl:h-44 object-cover rounded-md "
            />
          </Link>
        </div>
        <div>
          <div className="pb-4">
            <Link to={`/products/${product._id}`}>
              <h2 className="text-sm text-left overflow-hidden truncate whitespace-no-wrap">
                {product.name}
              </h2>
            </Link>
          </div>

          <Ratings rating={product.rating} ratingNumber={product.numReviews} />

          <p>${product.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default Product;
