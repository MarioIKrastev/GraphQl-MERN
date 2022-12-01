const jwt = require("jsonwebtoken");

const tokenChecker = (id, name, email, phone) => {
  return jwt.sign({ id, name, email, phone }, "world secret", {
    expiresIn: 86400,
  });
};
module.exports = tokenChecker;
