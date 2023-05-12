"use client";
import React, { useEffect } from "react";
import axios from "axios";

const DeleteUserModal = ({
  userId,
  fetchData,
  setIsModalOpen,
  isModalOpen,
}) => {
  useEffect(() => {
    if (!isModalOpen) {
      setIsModalOpen(null);
    }
  }, [isModalOpen, setIsModalOpen]);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/user_delete/${userId}`);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex mt-5 justify-between">
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={handleDeleteUser}
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

export default DeleteUserModal;
