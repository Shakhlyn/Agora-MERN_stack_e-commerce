import express from "express";

import {
  getAllProducts,
  getProductById,
} from "../controller/productController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

export default router;
