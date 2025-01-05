import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("Generated Token:", token);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // HTTPS ke liye
        sameSite: "None", // Cross-origin requests ke liye
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message,
        user,
      });
  } catch (error) {
    console.error("Token Generation Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
