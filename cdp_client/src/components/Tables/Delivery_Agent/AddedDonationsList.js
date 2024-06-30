import React, { useEffect, useState } from "react";

function AddedDonationsList() {
    const [donations, setDonations] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewDonations")
      .then((res) => res.json())
      .then((result) => {
        setDonations(result);
      })
      .catch((error) => {
        console.error("Error fetching Donations:", error);
      });
  }, [refresh]);
  return (
    <div className="col-sm-12 col-xl-12">
    <div className="bg-secondary rounded h-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-4">DONATIONS</h6>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Donation Name</th>
            <th scope="col">Donation Image</th>
            <th scope="col">Donation Description</th>
            <th scope="col">Donation Amount</th>
          </tr>
        </thead>
        <tbody>
          {donations.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Donations added.
              </td>
            </tr>
          ) : (
            donations.map((donation, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{donation.donationName}</td>
                <td>
                  <img
                    src={`http://localhost:4000${donation.imageUrl}`}
                    alt={donation.donationName}
                    style={{ width: "150px", height: "150px" }}
                  />
                </td>
                <td style={{maxWidth:"100px", textAlign:"justify"}}>{donation.donationDescription}</td>
                <td><b>₹</b>{donation.donationPrice}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default AddedDonationsList