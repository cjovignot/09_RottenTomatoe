'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Filter = ({ sort, setSort, direction, setDirection }) => {

  const router = useRouter();

  const handleApplyFilter = () => {
    let params = new URLSearchParams();
    if (sort) params.append('sort', sort);
    if (order) params.append('order', order);
    router.push(`/?${params.toString()}`);
  }

  const orderOptions = ["asc", "desc"];
  const sortOptions = ["rating", "alphabetical", "release_date"];
  
  return (
    <div className='flex items-center justify-center '>
      <div className="form-control">
        <div className="input-group">
          <select className="select select-bordered" onChange={(e) => setOrder(e.target.value)}>
            <option selected>asc</option>
            {orderOptions.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <select className="select select-bordered" onChange={(e) => setSort(e.target.value)}>
            <option disabled selected>Sort By</option>
            {sortOptions.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <button className="btn" onClick={handleApplyFilter}>Go</button>
        </div>
      </div>
    </div>
  )
}

export default Filter;
