import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function LandNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className="customer-navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
        <div className="container">
          <a className="navbar-brand" href="index.html">COMPASSION LINK</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="customer-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className={`nav-item ${currentPath === '/Donations' ? 'active' : ''}`}>
                <a className="nav-link" href="/Donations">Donations</a>
              </li>
              <li>
                <a className="nav-link" href="#ourmission">Our Mission</a>
              </li>
              
              <li className={`nav-item ${currentPath === '/MyDonations' ? 'active' : ''}`}>
						<a class="nav-link" href="/MyDonations">My Donations</a>
              </li>
            </ul>
            {isLoggedIn ? (
              <button className="btn btn-secondarys" onClick={handleLogout}><b>Log Out</b></button>
            ) : (
              <a className="btn btn-secondarys" href='/SignIn'><b>Log In</b></a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default LandNavbar;