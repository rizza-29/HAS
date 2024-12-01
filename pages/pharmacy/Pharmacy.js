import React from 'react'
import './Pharmacy.css'
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import PharmacyCard from '../../components/PharmacyCard/PharmacyCard';
function Pharmacy() {
    const medicines = [
        {
            name: 'Panadol',
            image: '/images/panadol.jpg',
            company: 'GSK',
            price: '300',
            stock: 0
        },
        {
            name: 'Arinac(tablet)',
            image: '/images/arinac.jpg',
            company: 'GSK',
            price: '300',
            stock: 0
        },
        {
            name: 'Rigix',
            image: '/images/rigix.jpg',
            company: 'GSK',
            price: '300',
            stock: 0
        },
    ];
  return (
    <div className='pharmacy-main'>
      <h1 className="page-title">Pharmacy</h1>
      <div className="pharmacy-grid">
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
        
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
        
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
        
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
        
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
        
        <PharmacyCard medicines={medicines} doctorName={"Dr.JohnSmith"} patientName={"Ali"}/>
      </div>
    </div>
  )
}

export default Pharmacy
