"use client";

import React, { useState, useEffect } from "react";
import Card from "./movie_card";
import Filter from "./Filter";
import Link from "next/link";
import axios from "axios";
import { useSearchParams,} from 'next/navigation';

const MovieList = () => {
  
  const [pageNbr, setPageNbr] = useState(1);
  const [movies, setMovies] = useState(null);
  const [sort, setSort] = useState("");
  const [direction, setDirection] = useState("");
  const [genre, setGenre] = useState("");
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('search');

  const fetchData = async (pageNbr) => {
    console.log("Fetching movies for page", pageNbr);

    let url = `http://localhost:3002/movies/${pageNbr}?sort=${sort}&direction=${direction}&genres=${genre}`;
    if (searchWord) url += `&search=${searchWord}`, setPageNbr(1) ;

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

  const pageNumbers = [];
  for(let i = Math.max(1, pageNbr - 2); i <= Math.min(pageNbr + 2, movies?.totalPages); i++) {
    pageNumbers.push(i);
  }

  

 useEffect(() => {
  fetchData(pageNbr);
  window.scrollTo(0, 350);
}, [pageNbr,sort ,direction,searchWord, genre]);

  return (
    <>
    <div className="justify-center p-4 z-20" >
  <Filter
    sort={sort}
    setSort={setSort}
    direction={direction}
    setDirection={setDirection}
    genre={genre}
    setGenre={setGenre}
    pageNbr={pageNbr}
    setPageNbr={setPageNbr}
  />
</div>
      <div className="movie-list">
  {movies?.movies && movies.movies.length > 0 ? (
    movies.movies.map((movie) => <Card key={movie._id} movie={movie} />)
  ) : searchWord || genre ? (
    <div className="m-28">Sorry, found nothing.</div>
  ) : (
    <button className="btn loading text-center">loading</button>
  )}
</div>
     <div className="paginationindex flex items-center justify-center mb-20 p-10">
  <button
    className="btn m-2"
    onClick={previousPage}
    disabled={pageNbr === 1}
  >
    Prev
  </button>
  {pageNumbers.map(number => (
    <button
      key={number}
      className={`btn m-2 ${pageNbr === number ? 'bg-white text-black' : ''}`}
      onClick={() => setPageNbr(number)}
    >
      {number}
    </button>
  ))}
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
