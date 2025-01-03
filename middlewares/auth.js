const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized, error",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized, Please login",
    });
  }
}

module.exports = userMiddleware;
