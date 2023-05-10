import React from "react";

const Login = () => {
  return (
    <div>
      <input type="checkbox" id="my-modal-login" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="POST" action="/api/login">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
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
