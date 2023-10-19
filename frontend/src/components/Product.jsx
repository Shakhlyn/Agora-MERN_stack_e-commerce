import { Link } from "react-router-dom";

import Card from "../Utils/Card";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <li>
      <Card>
        <div className="rounded-sm pb-8">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt="product picture"
              className="rounded-md"
            />
          </Link>
        </div>
        <div>
          <div className="pb-2">
            <Link to={`/product/${product._id}`}>
              <h2 className="text-sm text-left h-10 overflow-hidden truncate whitespace-no-wrap">
                {product.name}
              </h2>
            </Link>
          </div>

          <Ratings rating={4.5} ratingNumber={200} />

          <p>${product.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default Product;
