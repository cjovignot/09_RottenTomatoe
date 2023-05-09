import React from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import Cookies from "js-cookie";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Boosted Potato</a>
      </div>

      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        <label htmlFor="my-modal-login" className="btn btn-ghost">
          Login
        </label>
        <label htmlFor="my-modal-signup" className="btn btn-ghost">
          Signup
        </label>
        <Login />
        <Signup />
      </div>
    </div>
  );
};

export default Navbar;
