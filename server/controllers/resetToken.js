const Client = require("../models/Client");
const jwt = require("jsonwebtoken");
const accessToken = require("../utils/accessToken");

const resetToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevCookie = cookies.split("=")[1];
  if (!prevCookie) return res.status(401).json("No token found.");

  jwt.verify(prevCookie, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Authentication failed.");
    res.clearCookie("Bearer");
    req.cookies["Bearer"] = "";
    const token = accessToken(user._id, user.name, user.email, user.phone);
    res.cookie("Bearer", token, {
      httpOnly: true,
    });
    req._id = decoded._id;
    next();
  });
};

module.exports = resetToken;
