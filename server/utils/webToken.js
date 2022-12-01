const jwt = require("jsonwebtoken");

const tokenChecker = (id) => {
  return jwt.sign({ id }, "world secret", {
    expiresIn: 86400,
  });
};
module.exports = tokenChecker;
