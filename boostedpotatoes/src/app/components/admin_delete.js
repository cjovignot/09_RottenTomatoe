import React, { useState } from "react";
import axios from "axios";

const DeleteUserModal = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`);
      setIsModalOpen(false);
      window.location.reload(); // Refresh the page to reflect the changes
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id={`my-modal-deleteuser-${userId}`}
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-xl mb-4">Delete {userId}?</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex mt-5 justify-between">
            <label
              htmlFor={`my-modal-deleteuser-${userId}`}
              className="btn btn-outline btn-error"
            >
              Cancel
            </label>
            <button
              className="btn btn-outline btn-success"
              onClick={handleDeleteUser}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
