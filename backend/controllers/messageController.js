import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose";

// Create a message
export const createMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      newMessage,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all messages
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const messages = await Message.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get a single message by ID
export const getMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid message ID format.", 400));
    }

    const message = await Message.findById(id);

    if (!message) {
      return next(new ErrorHandler("Message not found.", 404));
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete a message
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid message ID format.", 400));
    }

    const message = await Message.findById(id);

    if (!message) {
      return next(new ErrorHandler("Message not found.", 404));
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
