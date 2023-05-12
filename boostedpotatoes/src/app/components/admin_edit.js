"user client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile({ user, fetchData, isModalOpen, setIsModalOpen }) {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setUserId(user._id);
    setUsername(user.username);
    setEmail(user.email);
    setIsAdmin(user.isAdmin || false);
  }, [user]);

  const handleEditProfile = async (event) => {
    console.log("DATAINPUT", username);
    console.log("DATAINPUT", userId);
    console.log("DATAINPUT", email);
    console.log("DATAINPUT", newPassword);
    console.log("DATAINPUT", isAdmin);

    event.preventDefault();

    if (userId) {
      try {
        await axios.put(`http://localhost:3001/user_update/${userId}`, {
          username,
          email,
          newPassword,
          isAdmin,
        });

        fetchData();
        setIsModalOpen(false);
        toast.success("Profile edited successfully");
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Profile edit failed");
      }
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={`my-modal-editprofile-${user.id}`}
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleEditProfile}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder={user.username}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder={user.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New Password"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control pt-4">
              <label className="cursor-pointer label">
                <span className="label-text">Admin</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={isAdmin}
                  onChange={(event) => setIsAdmin(event.target.checked)}
                />
              </label>
            </div>
            <div className="flex mt-5 justify-between">
              <label
                htmlFor={`my-modal-editprofile-${user.id}`}
                className="btn btn-outline btn-error"
              >
                Cancel
              </label>
              <button type="submit" className="btn btn-outline btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
