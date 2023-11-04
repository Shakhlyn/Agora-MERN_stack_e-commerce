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

export { getAllProducts, getProductById, createProduct };
