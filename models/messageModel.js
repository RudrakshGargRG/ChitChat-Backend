const mongoose = require('mongoose'); //used to interact with MONGODB server

const messageSchema = mongoose.Schema(
    {
      message: {
        text: { type: String, required: true },
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Messages", messageSchema); //export userSchema as User model