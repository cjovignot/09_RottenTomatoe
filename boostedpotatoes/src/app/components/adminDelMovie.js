'use client'

import React, { useEffect } from "react";
import axios from "axios";

const DeleteMovieModal = ({
  movieId,
  fetchData,
  setIsModalOpen,
  isModalOpen,
}) => {
  useEffect(() => {
    if (!isModalOpen) {
      setIsModalOpen(null);
    }
  }, [isModalOpen, setIsModalOpen]);

  const handleDeleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3002/movie/${movieId}`);
      setIsModalOpen(null);
      fetchData();

    } catch (error) {
      console.error("Delete movie failed:", error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <p>Are you sure you want to delete this movie?</p>
            <div className="flex mt-5 justify-between">
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setIsModalOpen(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={handleDeleteMovie}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteMovieModal;
