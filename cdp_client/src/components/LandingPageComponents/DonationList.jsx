import React, { useEffect, useState } from 'react';

function DonationList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/admin/ViewDonations')
      .then(response => response.json())
      .then(data => setDonations(data.slice(0, 3))) // Limit to first 3 products
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Every Donation Matters</h2>
            <p className="mb-4" style={{color:"black"}}>
              Your donations play a vital role in fueling our mission and
              enabling us to contribute to the cause, such as providing
              essential services, funding research, supporting communities, etc.
            </p>
            <p>
              <a href="/Donations" className="btn btn-secondary">
                View More
              </a>
            </p>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default DonationList;
