import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import catchAsync from "./catchAsync.js";

// User must be authenticated
const protect = catchAsync(async (req, res, next) => {
  // let token;

  // Read JWT from the 'jwt' cookie
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedObject = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(`authmiddleware- decodedObject: ${decodedObject.id}`);
      // console.log(decodedObject);

      req.user = await User.findById(decodedObject.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
