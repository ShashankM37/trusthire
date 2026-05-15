const jwt = require("jsonwebtoken");

const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    // GET TOKEN
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    // NO TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "No token provided",
      });

    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE USER ID
    req.userId = decoded.id;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
};

module.exports = authMiddleware;