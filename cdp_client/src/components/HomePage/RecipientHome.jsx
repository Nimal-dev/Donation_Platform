import React from 'react'
import Sidebar from '../common/Sidebar'
import Navbar from '../common/Navbar'


function RecipientHome() {
  return (
    <>
    <Sidebar/>
    <div class="content">
      <Navbar />
      
      {/* {usertype === 0 ? <Widgets /> : null} Conditionally render Widgets based on usertype  */}
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          
          {/* <CategoriesList/> */}
        </div>
      </div>
    </div>
  </>
  )
}

export default RecipientHome