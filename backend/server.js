// server.js

import dotenv from "dotenv";  // Import dotenv
dotenv.config({ path: "./config/config.env" });  // Load environment variables

import app from "./app.js";
import Razorpay from "razorpay"; // Now Razorpay can access the variables
import cloudinary from "cloudinary";

// Cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
