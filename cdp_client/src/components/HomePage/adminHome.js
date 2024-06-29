import React, { useEffect, useState } from 'react'
import Widgets from '../common/Widgets';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import UsersList from '../Tables/UsersList';
import DonorsList from '../Tables/DonorsList';
import DeliveryboyList from '../Tables/DeliveryboyList';

function AdminHome() {
  const [usertype, setUsertype] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata && userdata.userid) {
      setUsertype(userdata.usertype); // Set the usertype from userdata
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div class="content">
        <Navbar />
        <Widgets />
        
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <DonorsList/>
            <DeliveryboyList />
            <UsersList />
            {/* <CategoriesList/> */}
          </div>
        </div>
      </div>
    </>

  )
}

export default AdminHome;
