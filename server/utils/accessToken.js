const jwt = require("jsonwebtoken");

const accessToken = (id, name, email, phone) => {
  return jwt.sign({ id, name, email, phone }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "15s",
  });
};
module.exports = accessToken;
