"use client";
import { useState, useEffect, useContext } from "react";
import * as React from 'react';
import Login from "../components/login";
import Signup from "../components/signup";
import SearchBar from "../components/SearchBar";
import Cookies from "js-cookie";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    const userId = Cookies.get("userId");
    setIsLogged(!!userId);
  }, []);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setIsLogged(true);
      setIsLoading(false);
    } else if (!userId) {
      setIsLogged(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("isAdmin");
    setIsLogged(false);
    setIsLoading(false);
    toast.success("Logout successful");
  
  };

  if (isLoading) {
    return (
      <>
        <div id="navbar" className={...navbarVisible ? 'visible' : 'hidden'}>
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost normal-case text-xl font-sans"
            >
              <img className="w-12 h-12 mr-3" src="/Rotten.png" />
              Boosted Potato
            </Link>
          </div>

          <div className="flex items-center gap-2">
           <SearchBar/>
            <button className="btn loading text-center btn btn-ghost btn-circle avatar"></button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div id="navbar" className={...navbarVisible ? 'visible' : 'hidden'}>
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl font-sans">
          <img className="w-12 h-12 mr-3" src="/Rotten.png" />
          Boosted Potato
        </a>
      </div>

      <div className="flex items-center gap-2">
        <SearchBar/>

        {isLogged ? (
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
                <Link href="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/settings">Admin</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <label htmlFor="my-modal-login" className="btn ml-3">
              Login
            </label>
            <Login isLogged={isLogged} setIsLogged={setIsLogged} />

            <label htmlFor="my-modal-signup" className="btn">
              Sign up
            </label>
            <Signup />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;