import React from 'react'
import Hero from '../../components/hero/Hero'
import BestDoctors from '../../components/BestDoctors/BestDoctors'
import Services from '../../components/services/Services'
import CustomerReview from '../../components/CustomerReview/CustomerReview'
function Home({handleApptClick,handleLoginClick}) {
  return (
    <div>
      <Hero handleApptClick={handleApptClick} handleLoginClick={handleLoginClick}/>
      <BestDoctors />
      <Services />
      <CustomerReview />
    </div>
  )
}

export default Home
