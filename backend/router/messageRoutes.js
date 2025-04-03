import express from "express";
import {
  createMessage,
  getAllMessages,
  getMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();


router.post("/create-message", createMessage);


router.get("/", isAuthenticated, isAuthorized("Super Admin"), getAllMessages);


router.get("/:id", isAuthenticated, isAuthorized("Super Admin"), getMessage);


router.delete("/:id", isAuthenticated, isAuthorized("Super Admin"), deleteMessage);

export default router;
