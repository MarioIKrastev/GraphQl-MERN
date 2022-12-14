const jwt = require("jsonwebtoken");

const accessToken = (data, req, res) => {
  return jwt.sign(
    { id: data.id, name: data.name, email: data.email, phone: data.phone },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "15s",
    },
    (err, token) => {
      if (err) {
        return res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.cookie("Bearer", token, { httpOnly: true });
        return res.status(200).json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
};
module.exports = accessToken;
