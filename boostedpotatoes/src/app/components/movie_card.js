const Card = ({ movie }) => {
  const { title, img, release_date, genre } = movie;
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl m-5">
        <figure>
          <img src={img} alt={title} />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{release_date}</div>
          </h2>
          <div className="card-actions justify-end">
            {genre.map((genre) => (
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
