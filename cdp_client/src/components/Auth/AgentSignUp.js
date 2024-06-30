import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgentSignUp() {
  const [agentname, setAgentName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    agentname: '',
    contact: '',
    address: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      agentname: '',
      contact: '',
      address: '',
      email: '',
      password: ''
    };

    // Validate Agent Name
    if (!agentname.trim()) {
      newErrors.agentname = 'Agent name is required';
      valid = false;
    }

    // Validate Contact
    if (!contact.trim()) {
      newErrors.contact = 'Contact number is required';
      valid = false;
    } else if (isNaN(contact) || contact.length !== 10) {
      newErrors.contact = 'Contact number should be a 10-digit number';
      valid = false;
    }

    // Validate Address
    if (!address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    // Validate Password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const registerAgent = () => {
    if (validateForm()) {
      let params = {
        agentname: agentname,
        contact: contact,
        address: address,
        email: email,
        password: password,
        usertype: 2
      };

      fetch('http://localhost:4000/auth/agentSignup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === 'success') {
            setMessage('Registered successfully');
            setTimeout(() => {
              navigate('/SignIn'); // Redirect to the home page after 2 seconds
            }, 2000);
          } else {
            setMessage('Registration failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="background2">
      <div class="container-fluid">
        <div class="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div class="glassmorphic rounded p-4 p-sm-5 my-4 mx-3">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" class="">
                  <h3 class="text-primary">DONATION PLATFORM</h3>
                </a>
                <h3>AGENT SIGN UP</h3>
              </div>
              {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class={`form-control ${errors.agentname ? 'is-invalid' : ''}`}
                  id="floatingText"
                  placeholder="Agent Name"
                  onChange={(e) => setAgentName(e.target.value)}
                />
                <label for="floatingText">Agent Name</label>
                <div className="invalid-feedback">{errors.agentname}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="number"
                  class={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                  id="floatingText"
                  placeholder="Phone Number"
                  onChange={(e) => setContact(e.target.value)}
                />
                <label for="floatingText">Contact</label>
                <div className="invalid-feedback">{errors.contact}</div>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  class={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="Enter Volunteer Address"
                  id="floatingTextarea"
                  name="address"
                  style={{ height: '100px' }}
                  onChange={(event) => setAddress(event.target.value)}
                ></textarea>
                <label for="floatingTextarea">Address</label>
                <div className="invalid-feedback">{errors.address}</div>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="email"
                  class={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email Id</label>
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div class="form-floating mb-4">
                <input
                  type="password"
                  class={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
                <div className="invalid-feedback">{errors.password}</div>
              </div>
              <button
                type="button"
                className="glow-on-hover w-100 mb-4"
                onClick={registerAgent}
              >
                Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
              </button>
              <p class="text-center mb-0">
                Already have an Account? <a href="/SignIn">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentSignUp;
