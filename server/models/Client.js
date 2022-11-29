const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  projects: {
    type: Array,
  },
});
module.exports = mongoose.model("Client", ClientSchema);
