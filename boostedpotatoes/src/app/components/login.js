"use client"
import React, { useState } from "react";
import Cookies from "js-cookie";

const cors = require('cors');
const axios = require('axios');

const Login = ({ isLogged, setIsLogged }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const user_id = response.data._id;
      Cookies.set("userId", user_id);

      setIsLogged(true);
      document.getElementById("my-modal-login").checked = false;
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-login" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form>
            {" "}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
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
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex mt-5 justify-between">
              <label
                htmlFor="my-modal-login"
                className="btn btn-outline btn-error"
              >
                Cancel
              </label>
              <button
                type="submit"
                htmlFor="my-modal-login"
                className="btn btn-outline btn-success"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
