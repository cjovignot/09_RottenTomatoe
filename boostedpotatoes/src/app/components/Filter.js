'use client'

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation'



const Filter = ({ sort, setSort, direction, setDirection, genre, setGenre, pageNbr, setPageNbr}) => {

  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const undo = () => {
      setSelectedSort("");
      setSelectedDirection("");
      setSelectedGenre("");
      setSort("")
      setDirection("")
      setGenre("")
      router.push('/')
      
  }

    const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setSort(e.target.value);
  }

  const handleDirectionChange = (e) => {
    setSelectedDirection(e.target.value);
    setDirection(e.target.value);
  }

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setGenre(e.target.value);
    setPageNbr(1);
  }

  const sortOptions = ["rating", "alphabetical", "release_date"];
  const genres = ["Action", "Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science","TV Movie","Thriller","War","Western"];
  
  return (
   <div className='flex items-center justify-center '>
      <div className="form-control">
        <div className="input-group">
             <select className="select select-bordered" value={selectedSort} onChange={handleSortChange}>
            <option disabled value="">Sort By</option>
            {sortOptions.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
           <select className="select select-bordered" value={selectedGenre} onChange={handleGenreChange}>
            <option disabled value="">Genre</option>
            {genres.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select className="select select-bordered" value={selectedDirection} onChange={handleDirectionChange}>
            <option disabled value="">Order</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
          <button className="btn" onClick={undo}>Undo</button>
        </div>
      </div>
    </div>
  )
}

export default Filter;