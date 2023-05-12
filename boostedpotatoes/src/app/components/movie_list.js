"use client";

import React, { useState, useEffect } from "react";
import Card from "./movie_card";
import Link from "next/link";
import axios from "axios";

const MovieList = () => {
  const [pageNbr, setPageNbr] = useState(1);
  const [movies, setMovies] = useState(null);

  const fetchData = async (pageNbr) => {
    console.log("Fetching movies for page", pageNbr);

    try {
      const response = await axios.get(
        "http://localhost:3002/movies/" + pageNbr,
        {
          cache: "no-cache",
        }
      );
      const data = await response.data;
      console.log("Fetched movies:", data);
      setMovies(data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const nextPage = () => {
    if (pageNbr < movies.totalPages) {
      setPageNbr(pageNbr + 1);
    }
  };

  const previousPage = () => {
    if (pageNbr > 1) {
      setPageNbr(pageNbr - 1);
    }
  };

  useEffect(() => {
    fetchData(pageNbr);
     window.scrollTo(0, 310);
  }, [pageNbr]);

  return (
    <>
      <div className="movie-list">
        {movies?.movies ? (
          movies.movies.map((movie) => <Card key={movie._id} movie={movie} />)
        ) : (
          <button className="btn loading text-center">loading</button>
        )}
      </div>
      <div className="paginationindex">
        <button
          className="btn m-2"
          onClick={previousPage}
          disabled={pageNbr === 1}
        >
          Prev
        </button>
        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
          <span className="text-3xl h-10">{movies?.currentPage}</span>
        </div>

        <button
          className="btn m-2"
          onClick={nextPage}
          disabled={pageNbr === movies?.totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MovieList;
