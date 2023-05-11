"use client";
import React from "react";
import Carousel from "./components/indexfavorites";
import Movielist from "./components/movie_list";

export default function Home({ Component, pageProps }) {
  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <Carousel />
      <Movielist />
    </>
  );
}
