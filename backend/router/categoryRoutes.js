import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();


router.post("/create-category", isAuthenticated, isAuthorized("Super Admin"), createCategory);


router.get("/", getAllCategory);


router.get("/:id", isAuthenticated, isAuthorized("Super Admin"), getCategory);


router.put("/:id", isAuthenticated, isAuthorized("Super Admin"), updateCategory);


router.delete("/:id", isAuthenticated, isAuthorized("Super Admin"), deleteCategory);

export default router;
