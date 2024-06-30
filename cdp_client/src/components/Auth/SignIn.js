import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../common/PopUp';


function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // Add popupType to manage success or error type
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(''); // Add redirectPath to store the path for redirection

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    let param = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/auth/signin", {
      method: "post",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log('data', data);
        if (data !== 'Invalid password' && data !== 'Invalid email' && data !== 'User not found') {
          localStorage.setItem("userdata", JSON.stringify(data));
          const userType = data.authid.usertype;

          let path;
          if (userType === 0) {  // Admin
            path = '/AdminHome';
          } else if (userType === 1) {  // Delivery Boy
            path = '/DeliveryHome';
          } else if (userType === 2) { // Recipient
            path = '/RecipientHome';
          } else if (userType === 3) {  // Donor 
            path = '/';
          } else {
            console.log("Unknown user type");
          }
          setRedirectPath(path);
          setPopupType('success');
          setPopupMessage('Login Successful!');
        } else {
          // Set the appropriate error messages based on the server response
          const newErrors = {};
          if (data === 'Invalid password') {
            newErrors.password = 'Invalid password';
          } else if (data === 'Invalid email' || data === 'User not found') {
            newErrors.email = 'Invalid email or user not found';
          }
          setErrors(newErrors);
          setPopupType('error');
          setPopupMessage('Login Failed!');
          console.log("Login failed: ", data);
        }
      });
    }).catch((error) => {
      console.error("Error during login:", error);
    });
  };

  const closePopup = () => {
    setPopupMessage('');
    if (popupType === 'success' && redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="background1">
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <a href="/admin" className="">
                  <h3 className="text-primarys">DONATION PLATFORM</h3>
                </a>
                <h3>Sign In</h3>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                  id="floatingInput" 
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-floating mb-4">
                <input 
                  type="password" 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                  id="floatingPassword" 
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* -----------Custom Button Start ------------- */}
              <button type="button" className="glow-on-hover w-100 mb-4" onClick={handleLogin}>
                Sign In <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
              {/* --------------------Custom Button End ------------------ */}
              
              {/* <button type="button" className="btn btn-primary py-3 w-100 mb-4" onClick={handleLogin}>Sign In</button> */}
              <p className="text-center mb-0">New User! <a href="/Signup">Sign Up</a></p><br />
              <p className="text-center mb-0">Become a Recipient <a href="/RecipientSignup">Sign Up</a></p><br />
              <p className="text-center mb-0">Become a <a href="/AgentSignup">Delivery Agent</a>!</p>
            </div>
          </div>
        </div>
      </div>
      {popupMessage && <Popup message={popupMessage} type={popupType} onClose={closePopup} />}
    </div>
  );
}

export default SigninPage;
