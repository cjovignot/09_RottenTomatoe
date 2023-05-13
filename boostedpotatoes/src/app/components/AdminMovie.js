'use client'

import React, { useState, useEffect } from 'react';
import AddMovie from "../components/AddMovieBtn";

async function getAllMovies(page) {
  const res = await fetch(`http://localhost:3002/api/all_movies/${page}`, { cache: 'no-cache' });
  if (!res.ok) { 
    throw new Error('Failed to fetch movies');
  }
  const data = await res.json();
  return data;
}


const Table = ({ movies, pageNbr, setPageNbr, totalPages }) => {

  const pageNumbers = [];
  for (let i = Math.max(1, pageNbr - 2); i <= Math.min(pageNbr + 2, totalPages); i++) {
    pageNumbers.push(i);
  }
 
  const previousPage = () => {
    setPageNbr((prevPageNbr) => prevPageNbr - 1);
  };

  const nextPage = () => {
    setPageNbr((prevPageNbr) => prevPageNbr + 1);
  };
  return (
    <><div className="btm-nav">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span className="btm-nav-label">Home</span>
      </button>
      <button className="active">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span className="btm-nav-label">Warnings</span>
      </button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        <span className="btm-nav-label">Statics</span>
      </button>
    </div><div className="overflow-x-auto w-auto">
        <div className="paginationindex flex items-center justify-center mb-20 p-10">
          <button
            className="btn m-2"
            onClick={previousPage}
            disabled={pageNbr === 1}
          >
            Prev
          </button>
          {pageNumbers.map( number => (
            <button
              key={number}
              className={`btn m-2 ${ pageNbr === number ? 'bg-white text-black' : '' }`}
              onClick={() => setPageNbr( number )}
            >
              {number}
            </button>
          ) )}
          <button
            className="btn m-2"
            onClick={nextPage}
            disabled={pageNbr === totalPages}
          >
            Next
          </button>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Release Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map( movie => (
              <tr>
                <th>
                  <label>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={`https://image.tmdb.org/t/p/original/${ movie.poster_path }`} alt="Movie poster" />
                        </div>
                      </div>
                    </div>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{movie.title}</div>
                      <div className="text-sm opacity-50">{movie.credit.director}</div>
                    </div>
                  </div>
                </td>
                <td>{movie.genres.join( ', ' )}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.release_date}</td>
                <th>
                  <AddMovie movie={movie} />
                </th>
              </tr>
            ) )}
          </tbody>
        </table>
        <div className="paginationindex flex items-center justify-center mb-20 p-10">
          <button
            className="btn m-2"
            onClick={previousPage}
            disabled={pageNbr === 1}
          >
            Prev
          </button>
          {pageNumbers.map( number => (
            <button
              key={number}
              className={`btn m-2 ${ pageNbr === number ? 'bg-white text-black' : '' }`}
              onClick={() => setPageNbr( number )}
            >
              {number}
            </button>
          ) )}
          <button
            className="btn m-2"
            onClick={nextPage}
            disabled={pageNbr === totalPages}
          >
            Next
          </button>
        </div>

      </div></>
  );
};

function AdminMovie() {
  const [movies, setMovies] = useState([]);
  const [pageNbr, setPageNbr] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getAllMovies(pageNbr);
      setMovies(data.results);
      setTotalPages(data.total_pages); 
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, [pageNbr]);

  return <Table movies={movies} pageNbr={pageNbr} setPageNbr={setPageNbr} totalPages={totalPages} />;
}

export default AdminMovie;