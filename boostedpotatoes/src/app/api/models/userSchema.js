const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  favorites: [
    {
      _id: String,
      title: String,
      poster_path: String,
      release_date: String,
      genres: [String],
    }
  ],
});

module.exports = mongoose.model("Users", UserSchema);
