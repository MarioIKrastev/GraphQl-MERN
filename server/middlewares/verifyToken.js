const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) return res.status(401).json("No token found");

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid Token");
    req.email = decoded.email;
  });
  next();
};
module.exports = verifyToken;
