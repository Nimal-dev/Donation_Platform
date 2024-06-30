import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDonation from '../../Forms/Admin/AddDonation';
import Sidebar from '../../common/Sidebar';
import Navbar from '../../common/Navbar';

function DonationPage() {
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

  const deleteDonation = (id) => {
    fetch("http://localhost:4000/admin/deleteDonation", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        
          if (result.message) {
            toast.success(result.message, {
              position: "top-right",
              autoClose: 1000,
            });
          } else {
            toast.error("Failed to delete donation", {
              position: "top-right",
              autoClose: 1000,
            });
          }
          setTimeout(() => {
          window.location.reload(); // Trigger a refresh
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting donation:", error);
        setTimeout(() => {
          toast.error("An error occurred while deleting the donation", {
            position: "top-right",
            autoClose: 2000,
          });
        }, 2000);
      });
  };
  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <AddDonation />
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
                      <th scope="col">Actions</th>
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
                          <td>
                            <button
                              className="btn btn-danger ms-1"
                              style={{ padding: "5px 20px" }}
                              onClick={() => deleteDonation(donation._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DonationPage;
