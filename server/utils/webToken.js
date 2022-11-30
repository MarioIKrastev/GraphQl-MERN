const jwt = require("jsonwebtoken");

const token = (id) => {
  return jwt.sign({ id }, "world secret", {
    expiresIn: 86400,
  });
};
module.exports = { token };
