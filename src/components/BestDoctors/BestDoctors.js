import React from 'react'
import Card from '../cards/Card'
import doctor1 from './doctor1.jfif'
import doctor2 from './doctor2.jfif'
import doctor3 from './doctor3.jfif'
import './BestDoctors.css'
function BestDoctors() {
  return (
    <section>
      <div className="bst-doc-container">
      <h1 className='best-heading'>OUR BEST DOCTORS</h1>
      <div className="card-container">
        <Card image={doctor1} name={'Dr.Rabia'} description={'Cadiologist'} type={'doctor'}/>
        <Card image={doctor2} name={'Dr.Ankit Sharma'} description={'Pulmonlogist'} type={'doctor'}/>
        <Card image={doctor3} name={'Dr.Katherine'} description={'Dermatologist'} type={'doctor'}/>
      </div>
      <div className="btn-container">
        <button><a href="/doctors">View All Doctors</a></button>
      </div>
      </div>
    </section>
  )
}

export default BestDoctors
