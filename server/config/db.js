const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB accessed ${connection.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDb;
