const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const webToken = require("../utils/webToken");
const jwt = require("jsonwebtoken");
const regEx = /@[a-zA-Z]+.[a-zA-Z]+/gi;

const postSignup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    if (await Client.findOne({ email }))
      return res.status(400).json("This email is in use");
    const user = await Client.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
    });
    const token = webToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json("грешка");
  }
};
module.exports = { postSignup };
