import React, { useState } from "react";
import axios from "axios";

function EditProfile({ user, fetchData, isModalOpen, setIsModalOpen }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(null);

  const handleEditProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/user_update/${user.id}`,
        {
          username,
          email,
          newPassword,
          IsAdmin,
        }
      );
      console.log(response);
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Fetch error", error);
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
