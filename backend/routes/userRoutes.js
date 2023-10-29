import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);

router.use(protect);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.use(admin);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
