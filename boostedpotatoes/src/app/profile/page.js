"use client";
import React, { useState, useEffect } from "react";
import Profile from "../components/myProfile";
import EditProfile from "../components/editprofile";
import UserFavorites from "../components/userFavorites";
import axios from 'axios';
import Cookies from "js-cookie";
import { FavoriteContext } from "../context/FavoritesContext"; // Import FavoriteContext

export default function Home() {
  const [favoriteChanged, setFavoriteChanged] = useState(false);

  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
      const user = Cookies.get("userId");
      // console.log(user);
      setUserId(user);
  }, []);

      async function fetchData() {
          if (userId) {
              try {
                  const response = await axios.get(`http://localhost:3001/user/${userId}`)
                  const data = await response.data[0];
                  console.log("User data", data);
                  setUserData(data)
              } catch (error) {
                  console.error("Fetch error", error);
              }
          }
      };
  useEffect(() => {
      fetchData();
  }, [userId]);



  return (
    <div>
      {/* <link href="/dist/output.css" rel="stylesheet" /> */}

      <div className="flex-col hero-content text-center m-auto">
        <div className="m-auto">
          <Profile userData={userData} />
          <EditProfile userData={userData} onUserDataUpdate={fetchData} />
        </div>
      </div>
        <FavoriteContext.Provider value={{ favoriteChanged, setFavoriteChanged }}>
          {" "}
          {/* Wrap UserFavorites with FavoriteContext.Provider */}
          <UserFavorites />
        </FavoriteContext.Provider>
    </div>
  );
}
