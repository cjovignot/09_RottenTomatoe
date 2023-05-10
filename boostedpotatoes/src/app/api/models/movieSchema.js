const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: String,
  desciption: String,
  release_date: String,
  vote_average: Number,
  vote_count: Number,
  poster_path: String,
  trailer: String,
  director: String,
  genres: [String],
  cast: [
      {
        name: String,
        character: String,
        profile_path: String
      }
    ],
   comments: [
      {
        author: String,
        user_id: String,
        content: String
      }
    ],
});

module.exports = mongoose.model('Movie', MovieSchema);