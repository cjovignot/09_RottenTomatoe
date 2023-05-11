'use client';

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMovie = ({ movie }) => {
  const addMovieToDb = async () => {
    const movieData = {
      title: movie.title,
      description: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      poster_path: movie.poster_path,
      trailer: movie.trailer.key,
      director: movie.credit.director,
      genres: movie.genres,
      cast: movie.credit.cast.map(({ name, character, profile_path }) => ({ name, character, profile_path })),
      comments: [],
    };

    const res = await fetch('http://localhost:3002/movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    });

    if (!res.ok) { 
         return toast.warning('Movie allready added')
    }
     return toast.success('Movie '+ movie.title +' added')
  };

  return <button className='btn' onClick={addMovieToDb}>+</button>;
}

export default AddMovie;