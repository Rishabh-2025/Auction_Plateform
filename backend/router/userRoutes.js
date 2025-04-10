import express from "express";
import {
  editProfile,
  fetchLeaderboard,
  getProfile,
  getWonAuctions,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);
router.put("/me/update", isAuthenticated, editProfile);
router.get("/my-won-auctions", isAuthenticated, isAuthorized("Bidder") , getWonAuctions);

export default router;