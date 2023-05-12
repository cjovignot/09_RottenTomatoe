"use client";
import React, { useState } from "react";
import Profile from "../components/myProfile";
import EditProfile from "../components/editprofile";
import UserFavorites from "../components/userFavorites";
import Cookies from "js-cookie";
import { FavoriteContext } from "../context/FavoritesContext"; // Import FavoriteContext

export default function Home() {
  const [favoriteChanged, setFavoriteChanged] = useState(false);

  return (
    <div>
      {/* <link href="/dist/output.css" rel="stylesheet" /> */}

      <div className="flex-col hero-content text-center m-auto">
        <div className="m-auto">
          <Profile />
          <EditProfile />
        </div>
      </div>
        <FavoriteContext.Provider
          value={{ favoriteChanged, setFavoriteChanged }}
        >
          {" "}
          {/* Wrap UserFavorites with FavoriteContext.Provider */}
          <UserFavorites />
        </FavoriteContext.Provider>
    </div>
  );
}
