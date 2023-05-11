// "use client"
import React from 'react'
// import { useEffect, useState } from "react";

const axios = require('axios');





export default async function Film() {

    

    const fetchMovieDetails = async () => {
        const url = 'http://localhost:3002/movie/645b778be2f6077db99809fb';
      
        try {
          const response = await axios.get(url);
          console.log(response);
          const results = response.data.movie
          return results;
        } catch (error) {
          console.error(error);
          
        }
      };

        const details = await fetchMovieDetails();

  

    return (

        <div className="hero min-h-screen bg-base-200">
            <div>
                <div className="flex items-center ">
                    <h1 className="text-5xl font-bold"> {details.title} </h1>
                    <div className="flex m-auto">
                        <div className= "mr-24">
                            <h1>Rating</h1>
                            <div className="flex items-center">
                                <img className="w-8 ..." src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" alt="star" />
                                <p>{details.vote_average}/10</p>
                            </div>
                        </div>
                        <div>
                            <h1>Your Rating</h1>
                            <div className="flex items-center">
                                <img className="w-8 ..." src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" alt="star" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <h2> {details.release_date} </h2> - <h2> 1h48</h2>
                </div>
                <div className="hero-content flex-col lg:flex-row">
                </div>
                <div className='flex'>
                    <img src={details.poster_path} className="max-w-sm rounded-lg shadow-2xl" />
                    <iframe width="1000" height="703" src={details.trailer} title="Under The Skin | Official Trailer HD | A24" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Synopsis</h1>
                    <p className="py-6">{details.description}</p>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Genre</h1>
                    {details.genres?.map((genre) => (
                        <p className="badge badge-outline" key={genre.id}>{genre}</p>
                    ))}
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Director</h1>
                    <p className="py-6">{details.director}</p>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Stars</h1>
                    {details.cast?.map(({ name, character, profile_path }) => (
                        <div key={name} className='flex items-center justify-evenly'>
                        <p className="py-6">{name}</p>
                        <p className="py-6">{character}</p>
                        <img  className="w-24 rounded-full"src={profile_path} alt="" />
                        </div>
                    ))};
                   
                </div>
            </div>
        </div>

    );

}