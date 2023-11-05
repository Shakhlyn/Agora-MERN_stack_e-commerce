import Product from "../Models/productModel.js";
import catchAsync from "../middleware/catchAsync.js";

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Resource not found");
  } else {
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
});

const createProduct = catchAsync(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = catchAsync(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    // product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
    // res.json({
    //   status: "success",
    //   data: updatedProduct,
    // });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export { getAllProducts, getProductById, createProduct, updateProduct };
