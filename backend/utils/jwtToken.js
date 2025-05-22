// export const generateToken = (user, message, statusCode, res) => {
//     const token = user.generateJsonWebToken();
//     res
//     .status(statusCode)
//     .cookie("token", token, {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",  
//       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",  
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
  
//   };

export const generateToken = (user, message, statusCode, req, res) => {
  const token = user.generateJsonWebToken();

  // Store token and user ID in session
  req.session.token = token;
  req.session.userId = user._id;

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token, // optional: for frontend use
  });
};
