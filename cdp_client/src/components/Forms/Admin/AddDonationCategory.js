import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddDonationCategory() {
  const [categoryname, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const saveCategory = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    let params = {
      categoryname: categoryname,
    };
    fetch("http://localhost:4000/admin/AddCategory", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Category added successfully.");
        // Clear form fields after successful submission
        setCategoryName("");
      })
      .catch((error) => {
        console.error("Error adding Category:", error);
        // Show error message
        setMessage("Failed to add Category. Please try again.");
      });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <>
    
            <div className="col-12 col-sm-8 col-md-12 col-lg-12 col-xl-12">
              <div className="bg-secondary rounded p-3 p-sm-5 my-4 mx-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>ADD CATEGORY</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form>
                  {/*------------------------- Category Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="categoryNameInput"
                      placeholder="Package Name"
                      name="categoryname"
                      value={categoryname}
                      onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <label htmlFor="categoryNameInput">Category Name</label>
                  </div>
                  
                  

                 
                  
                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={saveCategory}
                  >
                    <strong>CREATE</strong>
                    <i className="fa fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          

    </>
  )
}

export default AddDonationCategory;
