const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

const regEx = /@[a-zA-Z]+.[a-zA-Z]+/gi;

const postSignup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    const ifExist = await Client.findOne({ email });
    if (ifExist) {
      return res.status(400).json("This email is in use");
    } else {
      await Client.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        phone,
      });
      return res.status(201).json("Successfuly created");
    }
  } catch (err) {
    res.status(400).json("грешка");
  }
};
module.exports = { postSignup };
