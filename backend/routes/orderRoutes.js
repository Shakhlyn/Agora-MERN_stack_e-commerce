import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToBePaid,
  updateOrderIsDelivered,
  getOrders,
} from "../controller/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorder").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToBePaid);
router.route("/:id/deliver").put(protect, admin, updateOrderIsDelivered);

export default router;
