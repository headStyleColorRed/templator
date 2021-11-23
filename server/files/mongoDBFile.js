let mongoDBFile = `const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"]
	},
    DataTransfer: {
        type: Array
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
`

module.exports = {
    mongoDBFile
}