import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./components/Auth/SignIn";
import Signup from "./components/Auth/SignUp";
import AdminHome from "./components/HomePage/adminHome";
import VolunteerHome from "./components/HomePage/deliveryHome";
import UserHome from "./components/HomePage/userHome";

import LandingPage from "./components/HomePage/LandingPage";
import FullDonationsSection from "./components/LandingPageComponents/FullDonationsSection";
import MyDonationsPage from "./components/LandingPageComponents/MyDonationsPage";
import RecipientHome from "./components/HomePage/RecipientHome";
import RecipientSignUp from "./components/Auth/RecipientSignUp";
import DonationCategories from "./components/Tables/Admin/DonationCategories";
import AddDonor from "./components/Forms/Admin/AddDonor";
import EditDonor from "./components/Forms/Admin/EditDonor";
import DonationPage from "./components/Tables/Admin/DonationPage";
import Agents from "./components/Tables/Admin/Agents";
import AgentSignUp from "./components/Auth/AgentSignUp";
import EditAgent from "./components/Forms/Admin/EditAgent";

function App() {
  return (
    <BrowserRouter>
    <Routes>


{/* -----------------Auth Route Start------------------------ */}

      <Route path="/" element={<LandingPage/>}/>
      <Route path="/SignIn" element={<SigninPage/>}/>
      <Route path="/RecipientSignup" element={<RecipientSignUp/>}/>
      <Route path="/AgentSignup" element={<AgentSignUp/>}/>
      <Route path="/Signup" element={<Signup/>}/>

{/* -----------------Auth Route End------------------------ */}


{/* -------------------------------------Home Page Routes----------------------------- */}

      <Route path="/AdminHome" element={<AdminHome/>}/>
      <Route path="/VolunteerHome" element={<VolunteerHome/>}/>
      <Route path="/UserHome" element={<UserHome/>}/>
      <Route path="/RecipientHome" element={<RecipientHome/>}/>

{/* -------------------------------------Admin Page Routes----------------------------- */}

    
      <Route path="/DonationCategories" element={<DonationCategories/>} />
      <Route path="/Donations" element={<FullDonationsSection/>} />
      <Route path="/MyDonations" element={<MyDonationsPage/>} />
      <Route path="/Donation" element={<DonationPage/>} />
      <Route path="/AddDonor" element={<AddDonor/>} />
      <Route path="/EditDonor" element={<EditDonor/>} />
      <Route path="/EditAgent" element={<EditAgent/>} />
      <Route path="/Agents" element={<Agents/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
