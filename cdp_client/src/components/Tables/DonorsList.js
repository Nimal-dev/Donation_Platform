import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DonorsList() {
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewstate")
      .then((res) => res.json())
      .then((result) => {
        setState(result);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, [refresh]);

  const deleteState = (id) => {
    fetch("http://localhost:4000/admin/deleteState", {
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
    <div className="col-sm-12 col-xl-6">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">DONORS LIST</h6>
          <Link className="btn btn-primary" to="/AddState">
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
            {state.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Donors are registered.
                </td>
              </tr>
            ) : (
              state.map((state, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{state.statename}</td>
                  <td>{state.contact}</td>
                  <td>{state.authid.email}</td>
                  <td>
                    <Link to="/EditState" state={{ id: state._id }}>
                      <button className="btn btn-success" style={{ padding: "5px 20px" }}>
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger ms-1" style={{ padding: "5px 20px" }}
                      onClick={() => deleteState(state._id)}
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
