import Card from "../Utils/Card";

const Product = ({ product }) => {
  return (
    <li key={product._id}>
      <Card>
        <div className="rounded-sm pb-8">
          <a href="/">
            <img
              src={product.image}
              alt="product picture"
              className="rounded-md"
            />
          </a>
        </div>
        <div>
          <div className="pb-2">
            <a href="/">
              <h2 className="text-sm text-left">{product.name}</h2>
            </a>
          </div>
          {/* {product._id} */}
          <p>{product.price}</p>
        </div>
      </Card>
    </li>
  );
};

export default Product;
