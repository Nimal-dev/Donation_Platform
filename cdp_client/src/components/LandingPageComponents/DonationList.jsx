import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DonationList() {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/admin/ViewDonations')
      .then(response => response.json())
      .then(data => setDonations(data.slice(0, 3))) // Limit to first 3 donations
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  const handleDonateClick = (donationId) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (!userdata || !userdata._id) {
      navigate('/SignIn');
    } else {
      // Logic to handle donation (e.g., add to cart or proceed to donation page)
      console.log(`Proceed to donate: ${donationId}`);
    }
  };

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Every Donation Matters</h2>
            <p className="mb-4" style={{color: "black"}}>
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
                <strong className="product-price">${donation.donationPrice.toFixed(2)}</strong>
                <span className="icon-cross">
                  <button
                    onClick={() => handleDonateClick(donation._id)}
                    className="btn btn-secondary"
                  >
                    <i className="fa fa-hands" aria-hidden="true"> Donate</i>
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
