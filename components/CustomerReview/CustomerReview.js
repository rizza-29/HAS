import React from 'react'
import './CustomerReview.css'
import Card2 from '../Card_2/Card2'
function CustomerReview() {
  return (
    <section>
      <div className="review-container">
        <h1>REVIEWS</h1>
        <div className="review-card-container">
            <Card2 review={`"top notch doctors!"`}/>
            <Card2 review={`"excellent customer support!"`}/>
            <Card2 review={`"Use of Latest and up to date technology"`}/>
        </div>
      </div>
    </section>
  )
}

export default CustomerReview
