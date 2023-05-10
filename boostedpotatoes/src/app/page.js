"use client"
import React from "react";
import Carousel from "./components/indexfavorites";


export default function Home({ Component, pageProps }) {
  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <Carousel />
      <div>this is the home page lol</div>
    </>
  );
}
