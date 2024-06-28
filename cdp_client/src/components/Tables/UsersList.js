import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function UsersList() {
    const [recipients, setRecipients] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:4000/admin/viewRecipient")
        .then((res) => res.json())
        .then((result) => {
          console.log(result,"aserdtfgh");
          setRecipients(result);
        })
        .catch((error) => {
          console.error("Error fetching recipients:", error);
        });
    }, [refresh]);
  return (
    <div class="col-12">
    <div class="bg-secondary rounded h-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">RECIPIENT LIST</h6>
             
            </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        
                    </tr>
                </thead>
                <tbody>
                {recipients.map((recipient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{recipient.firstname}{recipient.lastname}</td>
                <td>{recipient.authid.email}</td>
                <td>{recipient.contact}</td>
                <td>{recipient.address}</td>
                
                
              </tr>
            ))}
        
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default UsersList