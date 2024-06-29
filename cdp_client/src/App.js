import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./components/Auth/SignIn";
import Signup from "./components/Auth/SignUp";
import AdminHome from "./components/HomePage/adminHome";
import VolunteerHome from "./components/HomePage/deliveryHome";
import UserHome from "./components/HomePage/userHome";
import AddDonationCategory from "./components/Forms/Admin/AddDonationCategory";
import LandingPage from "./components/HomePage/LandingPage";
import FullDonationsSection from "./components/LandingPageComponents/FullDonationsSection";
import MyDonationsPage from "./components/LandingPageComponents/MyDonationsPage";
import AddDonation from "./components/Forms/AddDonation";
import RecipientHome from "./components/HomePage/RecipientHome";
import RecipientSignUp from "./components/Auth/RecipientSignUp";

function App() {
  return (
    <BrowserRouter>
    <Routes>


{/* -----------------Auth Route Start------------------------ */}

      <Route path="/" element={<LandingPage/>}/>
      <Route path="/SignIn" element={<SigninPage/>}/>
      <Route path="/RecipientSignup" element={<RecipientSignUp/>}/>
      <Route path="/AgentSignup" element={<SigninPage/>}/>
      <Route path="/Signup" element={<Signup/>}/>

{/* -----------------Auth Route End------------------------ */}


{/* -------------------------------------Home Page Routes----------------------------- */}

      <Route path="/AdminHome" element={<AdminHome/>}/>
      <Route path="/VolunteerHome" element={<VolunteerHome/>}/>
      <Route path="/UserHome" element={<UserHome/>}/>
      <Route path="/RecipientHome" element={<RecipientHome/>}/>

{/* -------------------------------------Admin Page Routes----------------------------- */}

    
      <Route path="/DonationCategories" element={<AddDonationCategory/>} />
      <Route path="/Donations" element={<FullDonationsSection/>} />
      <Route path="/MyDonations" element={<MyDonationsPage/>} />
      <Route path="/AddDonation" element={<AddDonation/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
