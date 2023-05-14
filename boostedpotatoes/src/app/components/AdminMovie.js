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
    <><div className="overflow-x-auto w-auto px-20">
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
                          <img src={`${ movie.poster_path }`} alt="Movie poster" />
                        </div>
                      </div>
                    </div>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{movie.title}</div>
                      {movie.director && <div className="text-sm opacity-50">{movie.director}
                      </div>}
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
              className={`btn m-2 ${ pageNbr === number ? 'btn-active' : '' }`}
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