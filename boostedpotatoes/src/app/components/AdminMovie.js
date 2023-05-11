import React from 'react';
import AddMovie from "../components/AddMovieBtn";

async function getAllMovies() {
  const res = await fetch('http://localhost:3002/api/all_movies/14', { cache: 'force-cache' });
  if (!res.ok) { 
    throw new Error('Failed to fetch movies');
  }
  const data = await res.json();
  return data.results;
}

const Table = ({ movies }) => {
  return (
    <div className="overflow-x-auto w-full">
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
          {movies.map(movie => (
            <tr>
              <th>
                <label>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie poster" />
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
              <td>{movie.genres.join(', ')}</td>
              <td>{movie.vote_average}</td>
              <td>{movie.release_date}</td>
              <th>
                 <AddMovie movie={movie} />
              </th>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
};

export default async function AdminMovie() {
  const movies = await getAllMovies();
  return <Table movies={movies} />;
};
