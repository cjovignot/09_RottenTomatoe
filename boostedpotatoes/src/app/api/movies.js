const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Movie = require("./models/movieSchema");
const axios = require("axios");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sosmartnco:boosted@cluster0.rqgmtdr.mongodb.net/boosted?retryWrites=true&w=majority"
  )
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log(err));

const apiKey = "38b49d066271eaa73ac11ef24da1085e";

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

//TMDB API CALLS

async function GetAllMoviesApi(page) {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const params = {
      api_key: apiKey,
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: page,
      sort_by: "popularity.desc",
    };

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMovieTrailer(movieId) {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );
    const videoData = response.data;
    videoData.results = videoData.results.find(
      (video) => video.name == "Official Trailer"
    );
    if (videoData.results.key) {
      videoData.results.key = `https://www.youtube.com/embed/${videoData.results.key}`;
    }
    return videoData.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMoviesCredits(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );
    const creditsData = response.data;
    creditsData.cast = creditsData.cast
      .filter((castee) => castee.profile_path !== null)
      .map((castee) => {
        const {
          popularity,
          adult,
          original_name,
          known_for_department,
          profile_path,
          ...castMember
        } = castee;
        if (profile_path) {
          castMember.profile_path = `https://image.tmdb.org/t/p/original/${profile_path}`;
        }
        return castMember;
      })
      .slice(0, 5);

    const director = creditsData.crew.find(
      (crewMember) => crewMember.job === "Director"
    );

    if (director) {
      creditsData.director = director.name;
    }
    const { crew, ...casts } = creditsData;

    return casts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get all movies from api

app.get("/api/all_movies/:page", async (req, res) => {
  const page = req.params.page;
  const dataMain = await GetAllMoviesApi(page);

  if (dataMain) {
    try {
      const MovieEtCredits = dataMain.results.map(async (movie) => {
        const credit = await getMoviesCredits(movie.id);
        const trailer = await getMovieTrailer(movie.id);
        if (!trailer) {
          return null;
        }
        const {
          popularity,
          adult,
          backdrop_path,
          original_title,
          poster_path,
          genre_ids,
          ...movies
        } = movie;
        if (poster_path) {
          movies.poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
        }
        movies.genres = genre_ids.map((id) => genres[id]);
        return { ...movies, credit, trailer };
      });
      const FullMovieInfo = (await Promise.all(MovieEtCredits)).filter(
        (movie) => movie !== null
      );

      dataMain.results = FullMovieInfo;
      res.json(dataMain);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error setting up json");
    }
  } else {
    res.status(500).send("Error fetching movies");
  }
});

// get movies from db

app.get("/movies/:page", async (req, res) => {
  const page = req.params.page;
  const limit = 12;
  const skip = (page - 1) * limit;

  try {
    const movies = await Movie.find().skip(skip).limit(limit);
    const totalMovies = await Movie.countDocuments();

    const totalPages = Math.ceil(totalMovies / limit);

    res.json({
      movies,
      currentPage: page,
      totalPages,
      totalMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
});

// get movies from db by :id

app.get("/movie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);

    res.json({
      movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movie, id not found !");
  }
});

// create a new movie

app.post("/movie", async (req, res) => {
  const movieData = req.body;

  const exists = await Movie.findOne({ title: movieData.title });
  if (exists) {
    return res.status(400).json({ message: "Movie already exists" });
  }
  const movie = new Movie(movieData);

  try {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// delete a movie

app.delete("/movie/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie)
      return res.status(404).send("No movie with the given ID found.");

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// create a new comment

app.post('/comment/:movie_id', async (req, res) => {

  const newComment = req.body;
  const id = req.params.movie_id;

 try {
  const movie = await Movie.findById(id);

  movie.comments.push(newComment);

  const comments = movie.comments
  
  await movie.save();

  res.json({
    message: 'Comment added succesfully',
    comments,
  });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment ...");
  }

});


// delete a comment

app.delete('/comment/:movie_id/:comment_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const commentId = req.params.comment_id;
  try {
    const movie = await Movie.findById(movieId);
    const commentIndex = movie.comments.findIndex((comment) => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).send("No comment found.");
    }
    movie.comments.splice(commentIndex, 1);
    const commentsList = movie.comments;
    await movie.save();
    res.json({
      message: 'Comment deleted successfully',
      commentsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting comment ...");
  }
});

// update a comment 

app.put('/comment/:movie_id/:comment_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const commentId = req.params.comment_id;
  const updatedComment = req.body;

  try {
    const movie = await Movie.findById(movieId);
    const commentIndex = movie.comments.findIndex((comment) => comment._id.toString() === commentId);
    
    if (commentIndex === -1) {
      return res.status(404).send("No comment found.");
    }

    movie.comments[commentIndex] = updatedComment;

    await movie.save();

    res.json({
      message: 'Comment updated successfully',
      updatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating comment ...");
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`API User Started on port ${port}`);
});

module.exports = app;
