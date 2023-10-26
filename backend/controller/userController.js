import catchAsync from "../middleware/catchAsync.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isPasswordMatched = await user.matchPassword(password);

  if (user && isPasswordMatched) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "register user",
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "user profile",
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "user profile updated",
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "get users",
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "user deleted",
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Get user by ID",
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "user updated",
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
