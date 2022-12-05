const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const refreshToken = require("../utils/refreshToken");
const accessToken = require("../utils/accessToken");
const jwt = require("jsonwebtoken");

const postSignup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const ifExist = await Client.findOne({ email });

    if (ifExist) return res.status(400).json("This email is in use");
    if (!name || !email || !password || !phone) {
      return res.status(400).json("All fields should be fullfilled");
    }
    await Client.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
    });

    return res.status(201).json("Successfuly created");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const postSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Client.findOne({
      email,
    });
    const loginToken = accessToken(user._id, user.name, user.email, user.phone);
    const renewToken = refreshToken(
      user._id,
      user.name,
      user.email,
      user.phone
    );
    const passwordValidation = bcrypt.compareSync(password, user.password);

    if (!user)
      return res
        .status(404)
        .send({ message: "User Not Found. Please sign up." });

    if (!passwordValidation) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    await Client.updateOne({ email }, { refreshToken: renewToken });
    res
      .status(200)
      .cookie("Bearer", renewToken, { httpOnly: true })
      .json({ message: "Logged Successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Email Not Found!" });
    console.log(error);
  }
};
const postSignOut = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(prevToken, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie("Bearer");
    req.cookies["Bearer"] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

module.exports = { postSignup, postSignIn, postSignOut };
