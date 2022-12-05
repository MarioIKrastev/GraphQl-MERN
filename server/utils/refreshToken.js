const jwt = require("jsonwebtoken");

const refreshToken = (id, name, email, phone) => {
  return jwt.sign({ id, name, email, phone }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: 86400,
  });
};
module.exports = refreshToken;
