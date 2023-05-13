'use client'
import React, { useState } from "react";
import MoviesLibrary from "../components/AdminMovie";
import MoviesDb from "../components/AdminMovieDb";
import UserDisplay from "../components/AdminUser";
import AdminHub from "../components/AdminHub";

export default function Admin() {
  const [activeComponent, setActiveComponent] = useState('library');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'library':
        return <MoviesLibrary />;
      case 'db':
        return <MoviesDb />;
      case 'user':
        return <UserDisplay />;
      default:
        return <MoviesLibrary />;
    }
  };

  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      
      <AdminHub setActiveComponent={setActiveComponent} />

      {renderComponent()}
    </>
  );
}
