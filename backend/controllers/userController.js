import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Auction } from "../models/auctionSchema.js"
import {v2 as cloudinary} from 'cloudinary';
import { generateToken } from "../utils/jwtToken.js";
// export const register = catchAsyncErrors( async (req, res, next) => {

//     if (!req.files || Object.keys(req.files).length === 0) {
//       return next(new ErrorHandler("Profile Image Required.", 400));
//     }
  
//     const { profileImage } = req.files;
  
//     const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//     if (!allowedFormats.includes(profileImage.mimetype)) {
//       return next(new ErrorHandler("File format not supported.", 400));
//     }
  
//     const {
//       userName,
//       email,
//       password,
//       phone,
//       address,
//       role,
//       bankAccountNumber,
//       bankAccountName,
//       bankName,
//       upiId,
//       paypalEmail,
//     } = req.body;
  
//     if (!userName || !email || !phone || !password || !address || !role) {
//       return next(new ErrorHandler("Please fill full form.", 400));
//     }
//     if (role === "Auctioneer") {
//       if (!bankAccountName || !bankAccountNumber || !bankName) {
//         return next(
//           new ErrorHandler("Please provide your full bank details.", 400)
//         );
//       }
//       if (!upiId) {
//         return next(
//           new ErrorHandler("Please provide your upi id.", 400)
//         );
//       }
//       if (!paypalEmail) {
//         return next(new ErrorHandler("Please provide your paypal email.", 400));
//       }
//     }
//     const isRegistered = await User.findOne({ email });
//     if (isRegistered) {
//       return next(new ErrorHandler("User already registered.", 400));
//     }
//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       profileImage.tempFilePath,
//       {
//         folder: "Mern_Auction_Platform/user_image",
//       }
//     );
//     if (!cloudinaryResponse || cloudinaryResponse.error) {
//       console.error(
//         "Cloudinary error:",
//         cloudinaryResponse.error || "Unknown cloudinary error."
//       );
//       return next(
//         new ErrorHandler("Failed to upload profile image to cloudinary.", 500)
//       );
//     }
    
//     const user = await User.create({
//       userName,
//       email,
//       password,
//       phone,
//       address,
//       role,
//       profileImage: {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.secure_url,
//       },
//       paymentMethods: {
//         bankTransfer: {
//           bankAccountNumber,
//           bankAccountName,
//           bankName,
//         },
//         upi: {
//           upiId,
//         },
//         paypal: {
//           paypalEmail,
//         },
//       },
//     });
//     generateToken(user, "User Registered.", 201, res);
//   });


//   export const login = catchAsyncErrors(async (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return next(new ErrorHandler("Please fill full form."));
//     }
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return next(new ErrorHandler("Invalid credentials.", 400));
//     }
//     const isPasswordMatch = await user.comparePassword(password);
//     if (!isPasswordMatch) {
//       return next(new ErrorHandler("Invalid credentials.", 400));
//     }
//     generateToken(user, "Login successfully.", 200, res);
//   });
  
//   export const getProfile = catchAsyncErrors(async (req, res, next) => {
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   });


  export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Profile Image Required.", 400));
    }
  
    const { profileImage } = req.files;
  
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(profileImage.mimetype)) {
      return next(new ErrorHandler("File format not supported.", 400));
    }
  
    const {
      userName,
      email,
      password,
      phone,
      address,
      role,
      bankAccountNumber,
      bankAccountName,
      bankName,
      upiId,
      paypalEmail,
    } = req.body;
  
    if (!userName || !email || !phone || !password || !address || !role) {
      return next(new ErrorHandler("Please fill full form.", 400));
    }
  
    if (role === "Auctioneer") {
      if (!bankAccountName || !bankAccountNumber || !bankName) {
        return next(new ErrorHandler("Please provide your full bank details.", 400));
      }
      if (!upiId) {
        return next(new ErrorHandler("Please provide your upi id.", 400));
      }
      if (!paypalEmail) {
        return next(new ErrorHandler("Please provide your paypal email.", 400));
      }
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User already registered.", 400));
    }
  
    const cloudinaryResponse = await cloudinary.uploader.upload(
      profileImage.tempFilePath,
      {
        folder: "Mern_Auction_Platform/user_image",
      }
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown cloudinary error."
      );
      return next(
        new ErrorHandler("Failed to upload profile image to cloudinary.", 500)
      );
    }
  
    const user = await User.create({
      userName,
      email,
      password,
      phone,
      address,
      role,
      profileImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      paymentMethods: {
        bankTransfer: {
          bankAccountNumber,
          bankAccountName,
          bankName,
        },
        upi: {
          upiId,
        },
        paypal: {
          paypalEmail,
        },
      },
    });
  
    // Pass `req` to generateToken
    generateToken(user, "User Registered.", 201, req, res);
  });
  
  export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please fill full form."));
    }
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid credentials.", 400));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid credentials.", 400));
    }
  
    generateToken(user, "Login successfully.", 200, req, res); // <-- pass `req`
  });
  export const logout = catchAsyncErrors(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logout Successfully.",
      });
  });
  
  export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ moneySpent: { $gt: 0 } });
    const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);
    res.status(200).json({
      success: true,
      leaderboard,
    });
  });




  export const editProfile = catchAsyncErrors(async (req, res, next) => {

    const userId = req.user._id;
    const user = await User.findById(userId);
  
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
  
    const {
      userName,
      phone,
      address,
      role,
      bankAccountNumber,
      bankAccountName,
      bankName,
      upiId,
      paypalEmail,
    } = req.body;

    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
  
    
    if (role && role !== user.role) {
      if (user.role === "Auctioneer" && role === "Bidder") {
      
        await Auction.deleteMany({ createdBy: userId });
  
        user.paymentMethods = {
          bankTransfer: {
            bankAccountName: "",
            bankAccountNumber: "",
            bankName: "",
          },
          upi: {
            upiId: "",
          },
          paypal: {
            paypalEmail: "",
          },
        };
      }
      user.role = role;
    }
  
  
    if (user.role === "Auctioneer") {
      if (bankAccountNumber) user.paymentMethods.bankTransfer.bankAccountNumber = bankAccountNumber;
      if (bankAccountName) user.paymentMethods.bankTransfer.bankAccountName = bankAccountName;
      if (bankName) user.paymentMethods.bankTransfer.bankName = bankName;
      if (upiId) user.paymentMethods.upi.upiId = upiId;
      if (paypalEmail) user.paymentMethods.paypal.paypalEmail = paypalEmail;
    }
  
  
    if (req.files && req.files.profileImage) {
      const profileImage = req.files.profileImage;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(profileImage.mimetype)) {
        return next(new ErrorHandler("File format not supported.", 400));
      }
  
      
      if (user.profileImage?.public_id) {
        await cloudinary.uploader.destroy(user.profileImage.public_id);
      }
  
      const result = await cloudinary.uploader.upload(profileImage.tempFilePath, {
        folder: "Mern_Auction_Platform/user_image",
      });
  
      user.profileImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  });



  export const getWonAuctions = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
  
    const wonAuctions = await Auction.find({ highestBidder: userId })
      .populate("highestBidder", "userName email profileImage")
      .populate("createdBy", "userName email") 
      .sort({ endTime: -1 }); 
  
    res.status(200).json({
      success: true,
      auctions: wonAuctions,
    });
  });
  
