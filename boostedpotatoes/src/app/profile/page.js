import React from "react";
import Profile from '../components/myProfile';
import EditProfile from '../components/editprofile';
import UserFavorites from '../components/userFavorites';
import Cookies from "js-cookie";

export default function Home() {


  return (
    <div>
      {/* <link href="/dist/output.css" rel="stylesheet" /> */}

        <div className="flex-col hero-content text-center">
          <div className="max-w-md">
            <Profile />
            <EditProfile />
          </div>
          <UserFavorites />
        </div>
    </div>
  );
}
