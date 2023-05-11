import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // New state variable

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user", {
        username,
        email,
        password,
      });
      console.log(response);
      toast.success('SignUp successful, please LogIn')
      setErrorMessage("");
      setIsModalOpen(false); // Close modal on successful response
    } catch (error) {
      toast.error('SignUp Failed')
      console.error("Signup failed:", error);
      setErrorMessage("Signup failed. Email and Username must be unique");
    }
  };

  return (
    <div>
      <input type="checkbox"
        id="my-modal-signup"
        className="modal-toggle"
        checked={isModalOpen} // Update the "checked" property
        onChange={() => setIsModalOpen(!isModalOpen)} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSignup}>
            {" "}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="text-error mt-2 text-sm">{errorMessage}</div>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                name="confpassword"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex mt-5 justify-between">
              <label
                htmlFor="my-modal-signup"
                className="btn btn-outline btn-error"
              >
                Cancel
              </label>
              <button
                type="submit"
                htmlFor="my-modal-signup"
                className="btn btn-outline btn-success"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
