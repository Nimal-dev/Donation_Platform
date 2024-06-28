import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import HelpRequest from "../Forms/User/HelpRequest";

function UserHome() {
 
  return (
    <>
    <Sidebar/>
    <div className="content">
        <Navbar/>
        <HelpRequest/>
        </div>
    </>
  );
}

export default UserHome;
