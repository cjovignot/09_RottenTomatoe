"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const axios = require("axios");

const FavToggle = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);
  const { isLogged } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const userIdFromCookie = Cookies.get("userId");
      if (userIdFromCookie) {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/${userIdFromCookie}`
          );
          const favUser = response.data[0].favorites;
          //   console.log("MON ARRAY DE FAV => ", response.data[0].favorites);
          const isMovieInFavorites = favUser.some(
            (favorite) => favorite._id === movie._id
          );
          //   console.log("CEST UN FAV OUPAS ?= >", isMovieInFavorites);
          setIsFav(isMovieInFavorites);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    if (isLogged) {
      // Add this condition
      fetchData();
    } else {
      setIsFav(false); // Reset the isFav state if the user is not logged in
    }
  }, [movie, isLogged]);

  const handleFavToggle = async () => {
    console.log("je toggle");
    const userIdFromCookie = Cookies.get("userId");
    if (userIdFromCookie) {
      try {
        const url = `http://localhost:3001/user/${userIdFromCookie}`;
        const urladd = `http://localhost:3001/addFavMovie/${userIdFromCookie}`;
        const urldelete = `http://localhost:3001/FavMovie_delete/${userIdFromCookie}`;
        const movieAttributes = {
          _id: movie._id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          genres: movie.genres,
        };
        console.log("MY MOVIE TOGGLE =>", movieAttributes);

        if (isFav) {
          await axios.delete(urldelete, { data: movieAttributes });
        } else {
          await axios.post(urladd, movieAttributes);
        }
        setIsFav(!isFav);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {isLogged && (
        <div onClick={handleFavToggle}>
          {isFav ? (
            <img src="red-heart.svg" style={{ width: 30 + "px" }}></img>
          ) : (
            <img src="white-heart.png" style={{ width: 30 + "px" }}></img>
          )}
        </div>
      )}
    </>
  );
};

export default FavToggle;
