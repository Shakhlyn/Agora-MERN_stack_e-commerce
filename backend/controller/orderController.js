import catchAsync from "../middleware/catchAsync.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = catchAsync(async (req, res) => {
  res.send("Items added to the order");
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = catchAsync(async (req, res) => {
  res.send("Got my order");
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = catchAsync(async (req, res) => {
  res.send("Order by ID");
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
  res.json("Got all the orders for admin");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToBePaid,
  updateOrderToBeDelivered,
  getOrders,
};
