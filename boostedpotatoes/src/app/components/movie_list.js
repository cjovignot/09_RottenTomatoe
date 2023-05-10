// "use client";

// import React, { useState, useEffect } from "react";
import Card from "./movie_card";
import Link from "next/link";
import axios from "axios";

const fetchData = async () => {
  console.log("MovieList component je vais dans mon use_effect");

  try {
    console.log("Je vais dans mon try");
    const response = await fetch("http://localhost:3002/movies/1"); // cache: 'force-cache' is the default("");
    const movies = await response.json();
    console.log("MON FETCH", movies);
    return movies.movies;
  } catch (error) {
    console.error("fetch error", error);
  }
};

const MovieList = async () => {
  const movies = await fetchData();

  console.log("my movies", movies);

  return (
    <div className="movie-list">
      {movies ? (
        movies.map((movie) => (
          <Link key={movie._id} href={`/unit_view/${movie._id}`}>
            <Card movie={movie} />
          </Link>
        ))
      ) : (
        <p>fuck</p>
      )}
    </div>
  );
};

export default MovieList;
