"use client";

import React, { useState, useEffect } from "react";
import Card from "./movie_card";
import Link from "next/link";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //     page: 2,
  //     results: [
  //       {
  //         id: "QSDQFQTQZF",
  //         title: "titre",
  //         img: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
  //         trailer: "ljljpoqz",
  //         description:
  //           "Dolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magna",
  //         release_date: "25/02/2022",
  //         vote_average: 6.2,
  //         genre: ["action", "prout", "hello"],
  //         vote_count: 697,
  //         director_name: "directorname",
  //         cast: [
  //           { name: "prout", character: "personnage", picture: "url" },
  //           { name: "prout2", character: "personnage", picture: "url" },
  //           { name: "prout3", character: "personnage", picture: "url" },
  //         ],
  //         comments: [
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //         ],
  //       },
  //       {
  //         id: "QSDQFQTQZF",
  //         title: "titre",
  //         img: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
  //         trailer: "ljljpoqz",
  //         description:
  //           "Dolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magna",
  //         release_date: "25/02/2022",
  //         vote_average: 6.2,
  //         genre: ["action", "prout", "hello"],
  //         vote_count: 697,
  //         director_name: "directorname",
  //         cast: [
  //           { name: "prout", character: "personnage", picture: "url" },
  //           { name: "prout2", character: "personnage", picture: "url" },
  //           { name: "prout3", character: "personnage", picture: "url" },
  //         ],
  //         comments: [
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //         ],
  //       },
  //       {
  //         id: "QSDQFQTQZF",
  //         title: "titre",
  //         img: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
  //         trailer: "ljljpoqz",
  //         description:
  //           "Dolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magna",
  //         release_date: "25/02/2022",
  //         vote_average: 6.2,
  //         genre: ["action", "prout", "hello"],
  //         vote_count: 697,
  //         director_name: "directorname",
  //         cast: [
  //           { name: "prout", character: "personnage", picture: "url" },
  //           { name: "prout2", character: "personnage", picture: "url" },
  //           { name: "prout3", character: "personnage", picture: "url" },
  //         ],
  //         comments: [
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //         ],
  //       },
  //       {
  //         id: "QSDQFQTQZF",
  //         title: "titre",
  //         img: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
  //         trailer: "ljljpoqz",
  //         description:
  //           "Dolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magna",
  //         release_date: "25/02/2022",
  //         vote_average: 6.2,
  //         genre: ["action", "prout", "hello"],
  //         vote_count: 697,
  //         director_name: "directorname",
  //         cast: [
  //           { name: "prout", character: "personnage", picture: "url" },
  //           { name: "prout2", character: "personnage", picture: "url" },
  //           { name: "prout3", character: "personnage", picture: "url" },
  //         ],
  //         comments: [
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //           { userid: "prout", content: "c'est de la merde" },
  //         ],
  //       },
  //     ],

  return (
    <div className="movie-list">
      {movies && movies.results ? (
        movies.results.map((movie) => (
          <Link
            key={movie.id}
            href={`/unit_view/${movie.id}`}
            // as={`/unit_view/${movie.id}?movies=${encodeURIComponent(
            //   JSON.stringify(movies)
            // )}`}
          >
            <Card movie={movie} />
          </Link>
        ))
      ) : (
        <p>J'ai rien...</p>
      )}
    </div>
  );
};
export default MovieList;

// export async function getServerSideProps() {
//   return {
//     props: {
//       movies: moviessample,
//     },
//   };
// }
