import { Link } from "react-router-dom";

import Card from "../Utils/Card";

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
              <h2 className="text-sm text-left">{product.name}</h2>
            </Link>
          </div>
          {/* {product._id} */}
          <p>{product.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default Product;
