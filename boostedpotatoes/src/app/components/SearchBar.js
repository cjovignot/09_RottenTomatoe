'use client';

import { useRouter} from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
 const router = useRouter();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/?search=${searchTerm}`);
      setSearchTerm('');
    } else {
      toast.error('Please enter a search term');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='hidden' type="submit">Search</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default SearchBar;