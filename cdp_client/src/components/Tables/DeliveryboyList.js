import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DeliveryboyList() {
  const [volunteer, setVolunteer] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewvolunteer")
      .then((res) => res.json())
      .then((result) => {
        console.log(result,"aserdtfgh");
        setVolunteer(result);
      })
      .catch((error) => {
        console.error("Error fetching volunteer:", error);
      });
  }, [refresh]);

  const deleteVolunteer = (id) => {
    fetch("http://localhost:4000/admin/deleteVolunteer", {
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
        console.error("Error deleting state:", error);
      });
  };
  return (
    <>
      <div class="col-sm-12 col-xl-6">
        <div class="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 class="mb-4">DELIVERY PERSON LIST</h6>
          <Link className="btn btn-primary" to="/AddVolunteer">ADD DELIVERY PERSON</Link>
          </div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {volunteer.map((volunteer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{volunteer.volunteername}</td>
                <td>{volunteer.authid.email}</td>
                <td>{volunteer.contact}</td>
                {/* <td>{volunteer.location}</td> */}
                <td>
                  <Link to="/EditVolunteer" state={{ id: volunteer._id }}>
                    <button className="btn btn-success" style={{padding:"5px 20px"}}>Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-1" style={{padding:"5px 20px"}}
                    onClick={() => deleteVolunteer(volunteer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
}

export default DeliveryboyList;
