'use client';

import React from 'react';

const Admin = ({ setActiveComponent }) => {
  
  return <><div className='flex items-center justify-center pt-10'>
      <div className="stats shadow">

          <div className="stat">
              <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">25.6K</div>
          </div>

          <div className="stat">
              <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Total Movies</div>
              <div className="stat-value text-secondary">2.6M</div>

          </div>
      </div>


  </div><div className='flex items-center justify-center p-10'>
          <div className="btn-group btn-group-vertical lg:btn-group-horizontal m-5">
              <button className="btn bg-secondary " onClick={() => setActiveComponent('user')}>Users</button>
              <button className="btn bg-secondary" onClick={() => setActiveComponent('db')}>Movies</button>
              <button className="btn bg-secondary btn-active" onClick={() => setActiveComponent('library')}>Library</button>
          </div>

      </div></>;
}

export default Admin;