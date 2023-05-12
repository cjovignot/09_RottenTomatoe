"use client";
import React, { useState } from "react";
import Carousel from "./components/indexfavorites";
import Movielist from "./components/movie_list";
import { FavoriteContext } from "./context/FavoritesContext"; // Add this import

export default function Home({ Component, pageProps }) {
  const [favoriteChanged, setFavoriteChanged] = useState(false);

  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <FavoriteContext.Provider value={{ favoriteChanged, setFavoriteChanged }}>
        <Carousel />
        <Movielist />
      </FavoriteContext.Provider>
    </>
  );
}
