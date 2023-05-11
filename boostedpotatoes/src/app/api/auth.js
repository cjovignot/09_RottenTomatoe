const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Cookies = require('js-cookie');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const User = require('./models/userSchema');

const router = express.Router();

const app = express();
const mongoUrl = process.env.MONGO_URL;
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

console.log(mongoUrl)

mongoose.connect(mongoUrl)
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas!');
  console.error(error);
});

// START LOGIN ROUTE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res
      .status(200)
      .json({
        userId: user._id,
        message: "User logged in successfully",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// END LOGIN ROUTE


module.exports = app;

app.listen(port, () => console.log(`Express app running on port ${port}!`));