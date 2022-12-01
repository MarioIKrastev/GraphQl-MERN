const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const tokenChecker = require("../utils/webToken"); // jwt validator

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
    const user = await Client.findOne({ email });

    if (!user) return res.status(404).send({ message: "User Not Found" });

    const passwordValidation = bcrypt.compareSync(password, user.password);

    if (!passwordValidation) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    req.session.token = tokenChecker(user._id);

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.log(error);
  }
};
const postSignOut = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    this.next(err);
    console.log(error);
  }
};

module.exports = { postSignup, postSignIn, postSignOut };
