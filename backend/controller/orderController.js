import Order from "../Models/orderModel.js";
import catchAsync from "../middleware/catchAsync.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = catchAsync(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    tax,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        // _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      tax,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToBePaid = catchAsync(async (req, res) => {
  res.send("Updated the order");
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToBeDelivered = catchAsync(async (req, res) => {
  res.send("updated order delivery info");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToBePaid,
  updateOrderToBeDelivered,
  getOrders,
};
