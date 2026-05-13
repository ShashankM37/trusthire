const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    // CHECK TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });

    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      "trusthire-secret-key"
    );

    // SAVE USER DATA
    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};

module.exports = authMiddleware;