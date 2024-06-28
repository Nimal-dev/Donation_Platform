import React from 'react'
import LandNavbar from '../common/LandNavbar'
import HeroSection from '../LandingPageComponents/HeroSection'
import DonationList from '../LandingPageComponents/DonationList'
import ChooseUs from '../LandingPageComponents/ChooseUs'
import LandFooter from '../common/LandFooter'

function LandingPage() {
  return (
    <>
    <LandNavbar/>
    <HeroSection/>
    <DonationList/>
    <ChooseUs/>
    <LandFooter/>
    
    </>
  )
}

export default LandingPage