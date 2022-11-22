const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    projects: {
        type: Array,
        required: function() {
            return this.projects.length > 0
        } 
    },
});
module.exports = mongoose.model("Client", ClientSchema);
