import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DonorsList() {
  const [donor, setDonor] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewdonor")
      .then((res) => res.json())
      .then((result) => {
        setDonor(result);
      })
      .catch((error) => {
        console.error("Error fetching donor:", error);
      });
  }, [refresh]);

  const deleteDonor = (id) => {
    fetch("http://localhost:4000/admin/deleteDonor", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1); // Trigger a refresh
      })
      .catch((error) => {
        console.error("Error deleting Donor:", error);
      });
  };

  return (
    <div className="col-sm-12 col-xl-6">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">DONORS LIST</h6>
          <Link className="btn btn-primary" to="/AddDonor">
            ADD DONORS
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              {/* <th scope="col">Location</th> */}
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donor.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Donors are registered.
                </td>
              </tr>
            ) : (
              donor.map((donor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{donor.donorname}</td>
                  <td>{donor.contact}</td>
                  <td>{donor.authid.email}</td>
                  <td>
                    <Link to="/EditDonor" state={{ id: donor._id }}>
                      <button className="btn btn-success" style={{ padding: "5px 20px" }}>
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger ms-1" style={{ padding: "5px 20px" }}
                      onClick={() => deleteDonor(donor._id)}
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
  );
}

export default DonorsList;
