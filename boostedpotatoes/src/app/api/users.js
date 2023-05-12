const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Cookies = require("js-cookie");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const User = require("./models/userSchema");

const router = express.Router();

const app = express();
const mongoUrl = process.env.MONGO_URL;
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(mongoUrl);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// START GET ALL USERS
app.get("/users", async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// END GET ALL USERS

// START GET ONE USER BY ID
app.get("/user/:user_id", async (req, res) => {
  User.find({ _id: req.params.user_id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// END GET ONE USER BY ID

// START USER CREATION ROUTE
app.post("/user", async (req, res) => {
  try {
    const { username, email, password, isAdmin, favorites } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      isAdmin,
      created_at: Date(),
      favorites,
    });

    await newUser
      .save()
      .then(() => {
        res.status(201).json({
          message: "User created successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// END USER CREATION ROUTE

// START USER DELETE ROUTE
app.delete("/user_delete/:user_id", async (req, res) => {
  console.log(req.params.user_id);
  User.deleteOne({
    _id: req.params.user_id,
  })
    .then((user) => {
      res.status(200).json({
        user,
        message: "User deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});
// END USER DELETE ROUTE

// START USER EDIT ROUTE
app.put("/user_update/:user_id", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const editUser = {
    username,
    email,
    password,
    isAdmin,
  };
  User.findOneAndUpdate({ _id: req.params.user_id }, editUser, { new: true })
    .then(() => {
      res.status(201).json({
        message: "User updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// END USER EDIT ROUTE

// START ADD FAVORITE MOVIE
app.post("/addFavMovie/:user_id", async (req, res) => {
  try {
    const newFav = req.body;
    const id = req.params.user_id;

    const user = await User.findById(id);

    favorites = user.favorites.push(newFav);

    const updatedUser = await user.save();
    res.json({
      updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// END ADD FAVORITE MOVIE

// START DELETE FAVORITE MOVIE
app.delete("/FavMovie_delete/:user_id", async (req, res) => {
  const movieToDelete = req.body;
  const id = req.params.user_id;

  const user = await User.findById(id);

  // Filter out the movie with the given movie id
  user.favorites = user.favorites.filter(
    (favMovie) => favMovie._id !== movieToDelete._id
  );

  const updatedUser = await user.save();
  res.json({
    updatedUser,
  });
});

// END DELETE FAVORITE MOVIE

module.exports = app;

app.listen(port, () => console.log(`Express app running on port ${port}!`));
