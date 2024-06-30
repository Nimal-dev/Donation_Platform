import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar';
import { useNavigate } from 'react-router-dom';

function AddDonation() {
    const [donationName, setDonationName] = useState("");
    const [donationDescription, setDonationDescription] = useState("");
    const [donationPrice, setDonationAmount] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    // const getSellerId = () => {
    //   const userdata = JSON.parse(localStorage.getItem("userdata"));
    //   console.log(userdata._id);
    //   return userdata ? userdata._id : null;
    // };
  
    const validateForm = () => {
      let formErrors = {};
      if (!donationName.trim()) {
        formErrors.donationName = "Donation Name is required";
      }
      if (!donationDescription.trim()) {
        formErrors.donationDescription = "Description is required";
      }
      if (!donationPrice.trim()) {
        formErrors.donationPrice = "Donation Amount is required";
      } else if (isNaN(donationPrice) || parseFloat(donationPrice) <= 0) {
        formErrors.donationPrice = "Donation Amount must be a valid positive number";
      }
      if (!image) {
        formErrors.image = "Image is required";
      }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      // const sellerId = getSellerId();
      // if (!sellerId) {
      //   setMessage("Failed to get seller information. Please log in again.");
      //   return;
      // }
  
      const formData = new FormData();
      formData.append("donationName", donationName);
      formData.append("donationDescription", donationDescription);
      formData.append("donationPrice", donationPrice);
      formData.append("image", image);
      // formData.append("sellerId", sellerId);
  
      try {
        const response = await fetch("http://localhost:4000/admin/AddDonation", {
          method: "post",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to add donation");
        }
  
        const result = await response.json();
        setMessage(result.message);
        // Clear form fields after successful submission
        setDonationName("");
        setDonationDescription("");
        setDonationAmount("");
        setImage(null);
        setTimeout(() => {
            window.location.reload(); // Replace with actual route
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        setMessage("Failed to add donation. Please try again.");
      }
    };
  
    return (
      <>
        <Sidebar />
        <div className="content">
          <div className="container-fluid">
            <div
              className="row h-100 align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <h3>Add Donation</h3>
                  </div>
                  {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                  {message && (
                    <div className="alert alert-success" role="alert">
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    {/*------------------------- Product Name Input ---------------------------------*/}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="donationNameInput"
                        placeholder="Donation Name"
                        name="donationName"
                        
                        onChange={(event) => setDonationName(event.target.value)}
                      />
                      <label htmlFor="donationNameInput">Donation Name</label>
                      {errors.donationName && <small className="text-danger">{errors.donationName}</small>}
                    </div>
  
                    {/*------------------------- Product Description Input ---------------------------------*/}
                    <div className="form-floating mb-3">
                      <textarea
                        type="textarea"
                        className="form-control"
                        id="productDescriptionInput"
                        placeholder="Product Description"
                        name="Productdescription"
                       
                        onChange={(event) => setDonationDescription(event.target.value)}
                      />
                      <label htmlFor="productDescriptionInput">Donation Description</label>
                      {errors.description && <small className="text-danger">{errors.donationDescription}</small>}
                    </div>
  
                    {/*------------------------- Product Price Input ---------------------------------*/}
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="productPriceInput"
                        placeholder="Donation Price"
                        name="donationPrice"
                        
                        onChange={(event) => setDonationAmount(event.target.value)}
                      />
                      <label htmlFor="donationPriceInput">Donation Price</label>
                      {errors.donationPrice && <small className="text-danger">{errors.donationPrice}</small>}
                    </div>
  
                    {/*------------------------- Image Input ---------------------------------*/}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="donationImageInput"
                        name="image"
                        onChange={(event) => setImage(event.target.files[0])}
                      />
                      {/* <label htmlFor="donationImageInput">Donation Image</label> */}
                      {errors.image && <small className="text-danger">{errors.image}</small>}
                    </div>
  
                    {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                    <button
                      type="submit"
                      className="btn btn-primary py-3 w-100 mb-4"
                    >
                      <strong>ADD DONATION </strong>
                      <i className="fa fa-plus"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default AddDonation
