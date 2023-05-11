import React from "react";
import Link from "next/link";
import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3002/movies/1", {
      cache: "no-store",
    });
    const data = await response.data;
    console.log("Fetched movies carousel:", data);
    return data;
  } catch (error) {
    console.error("Fetch error", error);
  }
}

const Carousel = async () => {
  console.log("mon carousel");
  const data = await fetchData();
  return (
    <div className="carouselcontainer">
      <div className="carousel rounded-box m-5">
        {data?.movies ? (
          data.movies.map((movie) => (
            <div
              className="carousel-item mr-2 w-48 hover:scale-105 transition duration-500"
              key={movie._id}
            >
              <Link href={`/unit_view/${movie._id}`}>
                <img src={movie.poster_path} alt="Burger" />
              </Link>
            </div>
          ))
        ) : (
          <button className="btn loading text-center">loading</button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
