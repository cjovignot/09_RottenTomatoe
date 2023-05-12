import React from "react";
import Favtoggle from "./favoritestoggle";
const axios = require("axios");

export default async function Film({ id }) {
  const fetchMovieDetails = async () => {
    const url = `http://localhost:3002/movie/${id}`;

    try {
      const response = await axios.get(url);
      console.log(response);
      const results = response.data.movie;
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  const details = await fetchMovieDetails();

  return (
    <div className="hero p-10 h-screen max-w-5xl bg-indigo-500">
      <div>
        <div className="flex">
          <h1 className="text-5xl font-bold"> {details.title} prout</h1>
          <Favtoggle movie={details} />
          <div className="flex ">
            <div className="w-auto mx-2">
              <h1 className="text-center text-2xl font-bold">Rating</h1>
              <div class="flex">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Rating star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p class="ml-2 mr-2 text-sm font-bold text-gray-900 dark:text-white">
                  {details.vote_average}
                </p>
                <p class="text-sm mr-2 w-max font-medium text-gray-900 dark:text-white">
                  {details.vote_count} reviews
                </p>
              </div>
            </div>
            <div className="w-auto">
              <h1 className="mr-3 text-center text-2xl font-bold w-max">
                Your Rating
              </h1>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Rating star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <h2> {details.release_date.slice(0, 4)} </h2> - <h2> 1h48</h2>
        </div>
        <div className="hero-content flex-col lg:flex-row"></div>
        <div className="flex m-auto">
          <img
            src={details.poster_path}
            className="w-1/6 h-1/6 rounded-lg shadow-2xl mr-4 ml-44"
          />
          <iframe
            width="450"
            height="253"
            src={details.trailer}
            title="Under The Skin | Official Trailer HD | A24"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-4">
          {details.genres?.map((genre) => (
            <p className="badge badge-outline mr-8" key={genre.id}>
              {genre}
            </p>
          ))}
        </div>
        <div>
          <p className="py-6">{details.description}</p>
        </div>
        <div className="flex items-center border-y-2 border-stone-400">
          <h3 className="text-2xl font-bold">Réalisation</h3>
          <p className="py-6 ml-12">{details.director}</p>
        </div>
        <div className="flex mt-8">
          <h1 className="text-2xl font-bold">Stars</h1>
          {details.cast?.map(({ name, character, profile_path }) => (
            <div key={name} className="items-center justify-evenly m-auto">
              <img className="w-24 rounded-full" src={profile_path} alt="" />
              <div className="flex">
                <p className="py-6">{name}</p>
              </div>
            </div>
          ))}
          ;
        </div>
      </div>
    </div>
  );
}
