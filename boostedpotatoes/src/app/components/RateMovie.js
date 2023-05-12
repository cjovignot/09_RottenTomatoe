"use client"
import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Rating = ({ id }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [rated, setRated] = useState(false);
  


  const handleRatingClick = async (rating) => {
    try {
      const response = await axios.put(`http://localhost:3002/rate/${id}/${rating}`);
      console.log(rating);
      console.log(response);
      setRated(true);
      setTimeout(() => {
        setRated(false); // Reset the rated state after 3 seconds
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Rate the movie:</h2>
      <div>
        {[2, 4, 6, 8, 10].map((rating) => (
          <span
            key={rating}
            className={`star ${selectedRating === rating ? 'selected' : ''}`}
            onClick={() => handleRatingClick(rating)}
            onMouseEnter={() => setSelectedRating(rating)}
            onMouseLeave={() => setSelectedRating(0)}
            style={{
              color: selectedRating >= rating ? 'orange' : 'grey',
              cursor: 'pointer',
            }}
          >

            &#9733;
          </span>
        ))}
      </div>
      {rated && <p>Thank you !</p>}
    </div>
  );
};

export default Rating;

// export function RateMovie() {

//     const [rating, setRating] = useState(0)
  
//     // Catch Rating value
//     const handleRating = (rate) => {
//       setRating(rate)
  
//       // other logic
//     }
//     // Optinal callback functions
//     const onPointerEnter = () => console.log('Enter')
//     const onPointerLeave = () => console.log('Leave')
//     const onPointerMove = (value, index) => console.log(value, index)
  
//     return (
//       <div className='App'>
//         <Rating
//           onClick={handleRating}
//           onPointerEnter={onPointerEnter}
//           onPointerLeave={onPointerLeave}
//           onPointerMove={onPointerMove}
//           /* Available Props */
//         />
//       </div>
//     )
//   }