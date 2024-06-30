import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SigninPage from "./components/Auth/SignIn";
import Signup from "./components/Auth/SignUp";
import AdminHome from "./components/HomePage/adminHome";
import UserHome from "./components/HomePage/userHome";
import DeliveryHome from "./components/HomePage/deliveryHome";

import LandingPage from "./components/HomePage/LandingPage";
import FullDonationsSection from "./components/LandingPageComponents/FullDonationsSection";
import MyDonationsPage from "./components/LandingPageComponents/MyDonationsPage";
import RecipientHome from "./components/HomePage/RecipientHome";
import RecipientSignUp from "./components/Auth/RecipientSignUp";
import DonationCategories from "./components/Tables/Admin/DonationCategories";
import AddDonor from "./components/Forms/Admin/AddRecipient";
import EditDonor from "./components/Forms/Admin/EditRecipient";
import DonationPage from "./components/Tables/Admin/DonationPage";
import Agents from "./components/Tables/Admin/Agents";
import AgentSignUp from "./components/Auth/AgentSignUp";
import EditAgent from "./components/Forms/Admin/EditAgent";
import AddRecipient from "./components/Forms/Admin/AddRecipient";
import EditRecipient from "./components/Forms/Admin/EditRecipient";

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
      <Route path="/DeliveryHome" element={<DeliveryHome/>}/>
      <Route path="/UserHome" element={<UserHome/>}/>
      <Route path="/RecipientHome" element={<RecipientHome/>}/>

{/* -------------------------------------Admin Page Routes----------------------------- */}

    
      <Route path="/DonationCategories" element={<DonationCategories/>} />
      <Route path="/Donations" element={<FullDonationsSection/>} />
      <Route path="/MyDonations" element={<MyDonationsPage/>} />
      <Route path="/Donation" element={<DonationPage/>} />
      <Route path="/AddRecipient" element={<AddRecipient/>} />
      <Route path="/EditRecipient" element={<EditRecipient/>} />
      <Route path="/EditAgent" element={<EditAgent/>} />
      <Route path="/Agents" element={<Agents/>} />

{/* -------------------------------------Delivery Page Routes----------------------------- */}



    </Routes>
    </BrowserRouter>
  );
}

export default App;
