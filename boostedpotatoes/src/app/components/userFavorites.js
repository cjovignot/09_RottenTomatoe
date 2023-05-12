"use client";
import React, { useEffect, useState, useContext } from "react";
import Card from "../components/movie_card";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { FavoriteContext } from "../context/FavoritesContext";

const UserFavorites = () => {
  const [movies, setMovies] = useState(null);
  const [userId, setUserId] = useState("");
  const { favoriteChanged, setFavoriteChanged } = useContext(FavoriteContext);

  useEffect(() => {
    const user = Cookies.get("userId");
    setUserId(user);
  }, []);

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}`
        );
        const movies = await response.data[0].favorites;
        console.log("UserFavs", movies);
        setMovies(movies);
      } catch (error) {
        console.error("Fetch error", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (favoriteChanged) {
      console.log("jai changé", favoriteChanged);
      fetchData();
      setFavoriteChanged(false);
    }
  }, [userId, favoriteChanged, setFavoriteChanged]);

  return (
    <>
      <div className="movie-list">
        {movies ? (
          movies.map((movie, i) => <Card key={i} movie={movie} />)
        ) : (
          <button className="btn loading text-center">loading</button>
        )}
      </div>
    </>
  );
};

export default UserFavorites;
