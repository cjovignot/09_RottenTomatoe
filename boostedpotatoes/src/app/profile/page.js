import React from "react";
import EditProfile from '../components/editprofile';

export default function Home() {



  return (
    <div>
      <link href="/dist/output.css" rel="stylesheet" />

      <div className="hero h-96 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">MY PROFILE</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            {/* <button className="btn btn-primary">Edit profile</button> */}
            <label htmlFor="my-modal-editprofile" className="btn btn-primary">Edit profile</label>
          </div>
        </div>

        <EditProfile />
      </div>
    </div>
  );
}
