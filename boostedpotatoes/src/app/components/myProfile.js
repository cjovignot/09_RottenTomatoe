"use client"
import React, { useEffect, useState } from "react";

const myProfile = ({userData}) => {

    console.log({userData})


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Hi {userData?.username} !</h2>
                <div className="flex-col text-start mt-2">
                    <p><b>Email :</b> {userData?.email}</p>
                    {userData?.favorites && (
                        <p><b>Number of favorite movies:</b> {userData?.favorites.length}</p>
                    )}
                </div>
            <label htmlFor="my-modal-editprofile" className="btn btn-primary m-4">Edit profile</label>
            </div>
        </div>
    );
};
  
export default myProfile;