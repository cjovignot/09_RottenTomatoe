"use client";

import React, { useState, useEffect } from "react";
import Card from "./movie_card";
import Filter from "./Filter";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from 'next/navigation';

const MovieList = () => {
  
  const [pageNbr, setPageNbr] = useState(1);
  const [movies, setMovies] = useState(null);
  const [sort, setSort] = useState("title");
  const [direction, setDirection] = useState("asc");
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('search');

  const fetchData = async (pageNbr) => {
    console.log("Fetching movies for page", pageNbr);

    let url = `http://localhost:3002/movies/${pageNbr}?sort=${sort}&direction=${direction}`;
    if (searchWord) url += `&search=${searchWord}`;

    try {
      const response = await axios.get(url, { cache: "no-cache" });
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
}, [pageNbr,sort, direction]);

  return (
    <>
    <div className="m-10 mb-20 justify-center p-4 z-20" >
  <Filter
    sort2={sort}
    setSort={setSort}
    direction={direction}
    setDirection={setDirection}
  />
</div>
      <div className="movie-list">
  {movies?.movies && movies.movies.length > 0 ? (
    movies.movies.map((movie) => <Card key={movie._id} movie={movie} />)
  ) : searchWord ? (
    <div className="m-28">Sorry, found nothing.</div>
  ) : (
    <button className="btn loading text-center">loading</button>
  )}
</div>
      <div className="paginationindex flex items-center justify-center">
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
