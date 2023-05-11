"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

const myProfile = () => {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const user = Cookies.get("userId");
        // console.log(user);
        setUserId(user);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/user/${userId}`)
                    const data = await response.data[0];
                    // console.log("User data", data);
                    setUserData(data)
                } catch (error) {
                    console.error("Fetch error", error);
                }
            }
        };

        fetchData();
    }, [userId]);


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Hi {userData?.username} !</h2>
                <div className="flex-col text-start mt-2">
                    <p><b>Email :</b> {userData?.email}</p>
                    <p><b>Number of favorite movies :</b> {userData?.favorites.length}</p>
                </div>
            <label htmlFor="my-modal-editprofile" className="btn btn-primary m-4">Edit profile</label>
            </div>
        </div>
    );
};
  
export default myProfile;