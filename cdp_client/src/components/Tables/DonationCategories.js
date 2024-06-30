import React from 'react'
import AddDonationCategory from '../Forms/Admin/AddDonationCategory'
import Sidebar from '../common/Sidebar'
import Navbar from '../common/Navbar'

function DonationCategories() {
  return (
    <>
    <Sidebar/>
    <div class="content">
      <Navbar/>
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
         <AddDonationCategory/>
        </div>
      </div>
    </div>
  </>
  )
}

export default DonationCategories