"use client";
const Card = ({ movie }) => {
  const { title, poster_path, release_date, genres } = movie;
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl m-5 h-110 hover:scale-105 transition duration-500">
        <figure>
          <img src={poster_path} alt={title} />
        </figure>
        <div className="card-body text-center h-40">
          <h2 className="card-title self-center">{title}</h2>
          <div className="card-actions justify-between">
            {genres.map((genre) => (
              <div key={genre} className="badge badge-outline">
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
