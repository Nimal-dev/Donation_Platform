import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDonation() {
  const [donationName, setDonationName] = useState("");
  const [donationDescription, setDonationDescription] = useState("");
  const [donationPrice, setDonationAmount] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

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

    const formData = new FormData();
    formData.append("donationName", donationName);
    formData.append("donationDescription", donationDescription);
    formData.append("donationPrice", donationPrice);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:4000/admin/AddDonation", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add donation");
      }

      const result = await response.json();
      toast.success(result.message, {
        position: "top-right",
        autoClose: 2000,
      });

      // Clear form fields after successful submission
      setDonationName("");
      setDonationDescription("");
      setDonationAmount("");
      setImage(null);
      setTimeout(() => {
        window.location.reload(); // Replace with actual route if needed
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add donation. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Donation</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="donationNameInput"
                      placeholder="Donation Name"
                      name="donationName"
                      value={donationName}
                      onChange={(event) => setDonationName(event.target.value)}
                    />
                    <label htmlFor="donationNameInput">Donation Name</label>
                    {errors.donationName && <small className="text-danger">{errors.donationName}</small>}
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                    style={{height:"100px"}}
                      className="form-control"
                      id="donationDescriptionInput"
                      placeholder="Donation Description"
                      name="donationDescription"
                      value={donationDescription}
                      onChange={(event) => setDonationDescription(event.target.value)}
                    />
                    <label htmlFor="donationDescriptionInput">Donation Description</label>
                    {errors.donationDescription && <small className="text-danger">{errors.donationDescription}</small>}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="donationPriceInput"
                      placeholder="Donation Price"
                      name="donationPrice"
                      value={donationPrice}
                      onChange={(event) => setDonationAmount(event.target.value)}
                    />
                    <label htmlFor="donationPriceInput">Donation Price</label>
                    {errors.donationPrice && <small className="text-danger">{errors.donationPrice}</small>}
                  </div>
                  <div className="mb-3">
                    <input
                    style={{padding:"15px"}}
                      type="file"
                      className="form-control"
                      id="imageInput"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    {errors.image && <small className="text-danger">{errors.image}</small>}
                  </div>
                  <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                    Add Donation
                  </button>
                </form>
              </div>
            </div>
      <ToastContainer />
    </>
  );
}

export default AddDonation;
