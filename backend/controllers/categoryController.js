import  {Category}  from  "../models/categorySchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";


export const createCategory = catchAsyncErrors(async (req, res, next) => {
  // Check if image file is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Category Image is required.", 400));
  }

  const { categoryImage } = req.files;

  // Validate file format
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(categoryImage.mimetype)) {
    return next(new ErrorHandler("File format not supported.", 400));
  }

  // Extract category details
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Category title and description are required.", 400));
  }

  // Check if category already exists
  const existingCategory = await Category.findOne({ title });
  if (existingCategory) {
    return next(new ErrorHandler("Category with this title already exists.", 400));
  }

  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    categoryImage.tempFilePath,
    {
      folder: "Mern_Auction_Platform/category_images",
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error.");
    return next(new ErrorHandler("Failed to upload category image to Cloudinary.", 500));
  }

  const category = await Category.create({
    user: req.user._id,
    title,
    description,
    categoryImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully.",
    category,
  });
});


// Get all categories
export const getAllCategory = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find().populate("user").sort("-createdAt");

    res.status(200).json({
        success: true,
        categories,
    });
});

// Get a single category by ID
export const getCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid category ID format.", 400));
    }

    const category = await Category.findById(id).populate("user");

    if (!category) {
        return next(new ErrorHandler("Category not found.", 404));
    }

    res.status(200).json({
        success: true,
        category,
    });
});

// Update a category
export const updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid category ID format.", 400));
    }

    if (!title) {
        return next(new ErrorHandler("Category title is required.", 400));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { title },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        return next(new ErrorHandler("Category not found.", 404));
    }

    res.status(200).json({
        success: true,
        message: "Category updated successfully.",
        updatedCategory,
    });
});

// Delete a category
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid category ID format.", 400));
    }

    const category = await Category.findById(id);

    if (!category) {
        return next(new ErrorHandler("Category not found.", 404));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted successfully.",
    });
});
