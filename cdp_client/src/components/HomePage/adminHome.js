// Updated AdminHome.js
import React from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import UsersList from '../Tables/UsersList';
import DonorsList from '../Tables/DonorsList';
import DeliveryboyList from '../Tables/Admin/DeliveryboyList';
import CategoriesList from '../Tables/Admin/CategoriesList';

function AdminHome() {
  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <DonorsList />
            <CategoriesList />
            <DeliveryboyList />
            <UsersList />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
