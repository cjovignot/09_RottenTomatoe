import React from "react";
import Carousel from "./components/indexfavorites";
import Movielist from "./components/movie_list";

export default function Home() {
  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <Carousel />
      <Movielist />
      <div>this is the home page lol</div>
    </>
  );
}
