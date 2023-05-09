const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const Cookies = require('js-cookie');

const PostIt = require('../models/userSchema');

require('dotenv').config();

const cors = require('cors');

const app = express();
const mongoUrl = process.env.MONGO_URL;
const port = 3001;

const axios = require('axios');
const router = express.Router();

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