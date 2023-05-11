import React from 'react';

function editProfile () {

    return (
        <>
        <input type="checkbox" id="my-modal-editprofile" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form>
              {" "}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
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
              {/* {errorMessage && (
                <div className="text-error mt-2 text-sm">{errorMessage}</div>
              )} */}
              <div className="flex mt-5 justify-between">
                <label
                  htmlFor="my-modal-editprofile"
                  className="btn btn-outline btn-error"
                >Cancel</label>
                <button
                  type="submit"
                  // htmlFor="my-modal-editprofile"
                  className="btn btn-outline btn-success"
                >Save</button>
              </div>
            </form>
          </div>
        </div>
        </>
    );
}

export default editProfile;