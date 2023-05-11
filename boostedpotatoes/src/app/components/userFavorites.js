"use client"
import React, { useEffect, useState } from "react";
import Card from '../components/movie_card';
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const UserFavorites = () => {

    const [movies, setMovies] = useState(null);
    const [userId, setUserId] = useState('');
  
    useEffect(() => {
        const user = Cookies.get("userId");
        // console.log(user);
        setUserId(user);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/user/${userId}`)
                    const movies = await response.data[0].favorites;
                    console.log("UserFavs", movies);
                    setMovies(movies)
                } catch (error) {
                    console.error("Fetch error", error);
                }
            }
        };
  
        fetchData();
    }, [userId]);

  return (
    <>
      <div className="movie-list">
        {movies ? (
          movies.map((movie, i) => (
            <Link key={i} href={`/movieunit/${movie._id}`}>
              <Card movie={movie} />
            </Link>
          ))
        ) : (
          <button className="btn loading text-center">loading</button>
        )}
      </div>
    </>
  );
};

export default UserFavorites;
