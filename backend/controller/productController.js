import Product from "../Models/productModel.js";
import catchAsync from "../middleware/catchAsync.js";

const getAllProducts = catchAsync(async (req, res) => {
  const productPerPage = process.env.PRODUCT_PER_PAGE;

  const currentPage = Number(req.query.pageNumber) || 1; //this 'pageNumber' is given from the 'HomeScreen.jsx' and  'productsApiSlice'

  const searchKeyword = req.query.searchKeyword
    ? { name: { $regex: req.query.searchKeyword, $options: "i" } }
    : {}; //'i' is for case-insensitve

  const totalDocs = await Product.countDocuments({ ...searchKeyword });
  const totalPages = Math.ceil(totalDocs / productPerPage);

  const products = await Product.find({ ...searchKeyword })
    .limit(productPerPage)
    .skip(productPerPage * (currentPage - 1));

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products, currentPage, totalPages },
  });
});

const getTopProducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

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
    product.image = image;
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

const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = catchAsync(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product.");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    product.reviews = [...product.reviews, review];

    product.numReviews = product.reviews.length;

    product.rating = parseFloat(
      (
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.numReviews
      ).toFixed(1)
    );

    await product.save();

    res.status(201).json({
      status: "success",
      message: "Review created",
      // data: review
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllProducts,
  getTopProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
