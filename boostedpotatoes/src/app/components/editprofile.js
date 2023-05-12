"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

function editProfile () {

  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const user = Cookies.get("userId");
    // console.log(user);
    setUserId(user);
}, []);

useEffect(() => {
  const fetchData = async () => {
    if (userId) {
      try {
          const user = Cookies.get("userId");
          const response = await axios.get(`http://localhost:3001/user/${userId}`)
          const data = await response.data[0];
          // console.log("User data", data);
          setUserData(data);
          setUsername(data?.username);
          setEmail(data?.email);
      } catch (error) {
          console.error("Fetch error", error);
      }
    }
  };

  fetchData();
}, [userId]);


const handleEditProfile = async (event) => {
  event.preventDefault();
  if (userId) {
    try {
        const response = await axios.put(`http://localhost:3001/user_update/${userId}`, {
            username,
            email,
            newPassword,
        });
        setUserData(response.data);
        setModalOpen(false);
    } catch (error) {
        console.error("Fetch error", error);
    }
  }
}



  return (
      <>
      <input type="checkbox" id="my-modal-editprofile" className="modal-toggle" checked={modalOpen} onChange={() => setModalOpen(!modalOpen)} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleEditProfile}
            >
            {" "}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder={userData?.username}
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
                placeholder={userData?.email}
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
            {Cookies.get("isAdmin") && (
              <div className="form-control pt-4">
                <label className="cursor-pointer label">
                  <span className="label-text">Admin</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    checked='true'
                    onChange={(event) => setIsAdmin(event.target.checked)}
                  />
                </label>
              </div>
            )}
            {/* {errorMessage && (
              <div className="text-error mt-2 text-sm">{errorMessage}</div>
            )} */}
            <div className="flex mt-5 justify-between">
              <label
                htmlFor="my-modal-editprofile"
                className="btn btn-outline btn-error"
              >Cancel</label>
              <button
                type="submit"
                // htmlFor="my-modal-editprofile"
                className="btn btn-outline btn-success"
              >Save</button>
            </div>
          </form>
        </div>
      </div>
      </>
  );
}

export default editProfile;