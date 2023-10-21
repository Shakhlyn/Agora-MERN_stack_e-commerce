import Product from "../Models/productModel.js";
import catchAsync from "../middleware/catchAsync.js";

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  // throw new Error("All you got me!!!");

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

export { getAllProducts, getProductById };
