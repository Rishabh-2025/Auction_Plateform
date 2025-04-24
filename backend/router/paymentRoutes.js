import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  initiateBidderPayment,
  verifyBidderPayment,
  getBidderPayments,
  getAdminPendingPayouts,
  payAuctioneer,
  getAuctioneerReceipts
} from "../controllers/paymentController.js";

const router = express.Router();

// Bidder initiates payment to Super Admin
router.post(
  "/bidder/pay/:auctionId",
  isAuthenticated,
  isAuthorized("Bidder"),
  initiateBidderPayment
);

// Bidder verifies payment
router.post(
  "/bidder/verify/:auctionId",
  isAuthenticated,
  isAuthorized("Bidder"),
  verifyBidderPayment
);

// Super Admin gets list of all successful payments from Bidders
router.get(
  "/admin/bidder-payments",
  isAuthenticated,
  isAuthorized("Super Admin"),
  getBidderPayments
);

// Super Admin gets pending payments to Auctioneers
router.get(
  "/admin/payouts",
  isAuthenticated,
  isAuthorized("Super Admin"),
  getAdminPendingPayouts
);

// Super Admin pays auctioneer
router.post(
  "/admin/pay-auctioneer/:auctionId",
  isAuthenticated,
  isAuthorized("Super Admin"),
  payAuctioneer
);

// Auctioneer sees receipts
router.get(
  "/auctioneer/receipts",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  getAuctioneerReceipts
);

export default router;
