import  {Category}  from  "../models/categorySchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";



export const createCategory = catchAsyncErrors(async (req, res, next) => {
  // 1. Validate that an image file was sent
  if (!req.files || !req.files.categoryImage) {
    return next(new ErrorHandler("Category image is required.", 400));
  }
  const { categoryImage } = req.files;

  // 2. Validate file format
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(categoryImage.mimetype)) {
    return next(new ErrorHandler("File format not supported.", 400));
  }

  // 3. Extract and validate text fields
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new ErrorHandler("Category title and description are required.", 400));
  }

  // 4. Prevent duplicates
  const existing = await Category.findOne({ title });
  if (existing) {
    return next(new ErrorHandler("Category with this title already exists.", 400));
  }

  try {
    // 5. Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      categoryImage.tempFilePath,
      { folder: "MERN_AUCTION_PLATFORM/category_images" }
    );
    if (!uploadResult || uploadResult.error) {
      console.error("Cloudinary error:", uploadResult.error || "Unknown error");
      return next(
        new ErrorHandler("Failed to upload category image to Cloudinary.", 500)
      );
    }

    // 6. Create the category document
    const category = await Category.create({
      user: req.user._id,
      title,
      description,
      categoryImage: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    // 7. Success response
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return next(
      new ErrorHandler(error.message || "Failed to create category.", 500)
    );
  }
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
    const { title,description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid category ID format.", 400));
    }

    if (!title || !description) {
        return next(new ErrorHandler("Category title is required.", 400));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { title,description },
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
