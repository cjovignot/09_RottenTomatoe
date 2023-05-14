'use client';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Admin = ({ setActiveComponent }) => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [activeComponent, setActiveState] = useState('library');
  const isAdmin = Cookies.get('isAdmin');
  const router = useRouter();
  const Change = (component) => {
    setActiveComponent(component);
    setActiveState(component);
  }
  
  const GetStats = async () => {
       const res = await fetch(`http://localhost:3002/movies/1`, { next: { revalidate: 20 } });
       ;
      
      const data = await res.json();

      setTotalMovies(data.totalMovies);
    };
  useEffect(() => {
    GetStats();
  }, []);

   if (!isAdmin) {
    router.push('/'); 
    return null;
  }
  return <><div className='flex items-center justify-center pt-10'>
      <div className="stats shadow">

          <div className="stat">
              <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Total Movies</div>
              <div className="stat-value text-secondary">{totalMovies}</div>
          </div>
      </div>


  </div><div className='flex items-center justify-center p-10'>
        <div className="btn-group btn-group-vertical lg:btn-group-horizontal m-5">
          <button
            className={`btn bg-secondary ${activeComponent === 'user' ? 'btn-active' : ''}`}
            onClick={() => Change('user')}
          >
            Users
          </button>
          <button
            className={`btn bg-secondary ${activeComponent === 'db' ? 'btn-active' : ''}`}
            onClick={() => Change('db')}
          >
            Movies
          </button>
          <button
            className={`btn bg-secondary ${activeComponent === 'library' ? 'btn-active' : ''}`}
            onClick={() => Change('library')}
          >
            Library
          </button>
        </div>
      </div></>;
}

export default Admin;