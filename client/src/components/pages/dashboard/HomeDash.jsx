import React from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet

export default function HomeDash() {
  return (
    <div className='min-h-screen'>
      <h1>HomeDash</h1>
      {/* This will render the nested routes */}
      {/* <Outlet /> */}
    </div>
  );
}
