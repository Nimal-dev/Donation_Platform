


import React, { useEffect, useState } from 'react'
import LandNavbar from '../common/LandNavbar'
import LandFooter from '../common/LandFooter'

function FullDonationsSection() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/admin/ViewDonations')
      .then(response => response.json())
      .then(data => setDonations(data.slice(0, 3))) // Limit to first 3 products
      .catch(error => console.error('Error fetching donations:', error));
  }, []);
  return (
    <>
      <LandNavbar/>
     <div
      className="product-section"
      style={{ 
        // backgroundColor: "#FFF5E4",
         boxShadow: "initial 50px black" }}
    >
    <div className="container" >
    <div className="row">
    {donations.map(donation => (
            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={donation._id}>
              <div className="product-item">
                <img
                  src={`http://localhost:4000${donation.imageUrl}`}
                  className="img-fluid product-thumbnail"
                  alt={donation.donationName}
                  style={{ width: "290px", height: "200px", borderRadius: "10px 10px 3px 3px" }}
                />
                <h3 className="product-title">{donation.donationName}</h3>
                <p>{donation.description}</p>
                {/* Uncomment and fix the below line if needed */}
                {/* <p>Seller: <b>{donation.entrepreneurId.entrepreneurname}</b></p> */}
                <strong className="product-price">${donation.donationPrice.toFixed(2)}</strong>
                <span className="icon-cross">
                <button
                  //   onClick={() => addToCart(product._id)}
                  className="btn btn-secondary"
                >
                  <i className="fa fa-hands" aria-hidden="true">
                    
                    Donate
                  </i>
                </button>
                </span>
              </div>
            </div>
          ))}
          {/* <!-- End Column 3 --> */}
          </div>
          </div>
          </div>

    <LandFooter/>
    </>
  )
}

export default FullDonationsSection