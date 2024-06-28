import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./components/SignIn";
import Signup from "./components/SignUp";
import AddState from "./components/Forms/Admin/AddState";
import EditState from "./components/Forms/Admin/EditState";
import AdminHome from "./components/HomePage/adminHome";
import StateHome from "./components/HomePage/stateHome";
import VolunteerHome from "./components/HomePage/deliveryHome";
import UserHome from "./components/HomePage/userHome";
import AddDonationCategory from "./components/Forms/Admin/AddDonationCategory";
import LandingPage from "./components/HomePage/LandingPage";
import FullDonationsSection from "./components/LandingPageComponents/FullDonationsSection";
import MyDonationsPage from "./components/LandingPageComponents/MyDonationsPage";
import AddDonation from "./components/Forms/AddDonation";

function App() {
  return (
    <BrowserRouter>
    <Routes>


{/* -----------------Auth Route Start------------------------ */}

      <Route path="/" element={<LandingPage/>}/>
      <Route path="/SignIn" element={<SigninPage/>}/>
      <Route path="/Signup" element={<Signup/>}/>

{/* -----------------Auth Route End------------------------ */}

      <Route path="/UserHome" element={<UserHome/>}/>


      <Route path="/AddState" element={<AddState/>}/>
      <Route path="/EditState" element={<EditState/>}/>


{/* -------------------------------------Home Page Routes----------------------------- */}

      <Route path="/AdminHome" element={<AdminHome/>}/>
      <Route path="/DonorHome" element={<StateHome/>}/>
      <Route path="/VolunteerHome" element={<VolunteerHome/>}/>
      <Route path="/UserHome" element={<UserHome/>}/>

{/* -------------------------------------Home Page Routes----------------------------- */}

    
      <Route path="/DonationCategories" element={<AddDonationCategory/>} />

      <Route path="/Donations" element={<FullDonationsSection/>} />
      <Route path="/MyDonations" element={<MyDonationsPage/>} />
      <Route path="/AddDonation" element={<AddDonation/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
