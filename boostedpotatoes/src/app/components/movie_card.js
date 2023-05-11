"use client";
import Favorite from "../components/favoritestoggle";
import Link from "next/link";

const Card = ({ movie }) => {
  const { title, poster_path, release_date, genres, _id } = movie;
  return (
    <>
      <div className="card w-64 bg-base-100 shadow-xl m-5 h-110 hover:scale-105 transition duration-500 relative">
        <div className="absolute bottom-100 right-0 m-2">
          <Favorite key={movie._id} movie={movie} />
        </div>
        <Link key={_id} href={`/movieunit/${_id}`}>
          <figure>
            <img
              src={poster_path}
              alt={title}
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body text-center h-40 p-2">
            <h2 className="card-title self-center">{title}</h2>

            <div className="card-actions justify-center">
              {genres.map((genre) => (
                <div key={genre} className="badge badge-outline">
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
