"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
const axios = require("axios");

const FavToggle = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userIdFromCookie = Cookies.get("userId");
      if (userIdFromCookie) {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/${userIdFromCookie}`
          );
          const favUser = response.data[0].favorites;
          console.log("MON ARRAY DE FAV => ", response.data[0].favorites);
          //   Check if movieID is in the favUser array
          const isMovieInFavorites = favUser.some(
            (favorite) => favorite._id === movie._id
          );
          console.log("CEST UN FAV OUPAS ?= >", isMovieInFavorites);
          setIsFav(isMovieInFavorites);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [movie]);

  const handleFavToggle = async () => {
    console.log("je toggle");
    const userIdFromCookie = Cookies.get("userId");
    if (userIdFromCookie) {
      try {
        const url = `http://localhost:3001/user/${userIdFromCookie}`;
        const urladd = `http://localhost:3001/addFavMovie/${userIdFromCookie}`;
        const urldelete = `http://localhost:3001/FavMovie_delete/${userIdFromCookie}`;
        // Extract the required movie attributes
        const movieAttributes = {
          _id: movie._id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          genres: movie.genres,
        };
        console.log("MY MOVIE TOGGLE =>", movieAttributes);

        if (isFav) {
          // Remove the movie from favorites
          await axios.delete(urldelete, { data: movieAttributes });
        } else {
          // Add the movie to favorites
          await axios.post(urladd, movieAttributes);
        }
        setIsFav(!isFav);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div onClick={handleFavToggle}>
      {isFav ? (
        <img src="red-heart.svg" style={{ width: 30 + "px" }}></img>
      ) : (
        <img src="white-heart.png" style={{ width: 30 + "px" }}></img>
      )}
    </div>
  );
};

export default FavToggle;
