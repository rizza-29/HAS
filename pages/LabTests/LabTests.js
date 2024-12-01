import React from 'react'
import './LabTests.css'
import { useState } from 'react';
function LabTests({setIsAppointmentModalOpen,setModalOpen}) {
  
  const [selectedLabTest,setSelectedLabTest] = useState('');
  const handleAppointmentClick=(labTest)=>{
      setIsAppointmentModalOpen(true);
      setSelectedLabTest(labTest);
      setModalOpen('LabTest')
  }
  const CloseModal = () => {
      setIsAppointmentModalOpen(false);
  }
  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      image:"/images/cbc.webp",
      description: "Measures components of the blood such as red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
      price: 1500,
      preparation: "No special preparation is required.",
      sampleType: "Blood",
      processingTime: "24 hours",
    },
    {
      id: 2,
      name: "Lipid Profile",
      image:"/images/lipid-profile.jpg",
      description: "Assesses cholesterol levels, including HDL, LDL, and triglycerides to evaluate heart health.",
      price: 2000,
      preparation: "Fasting for 8-12 hours before the test is required.",
      sampleType: "Blood",
      processingTime: "12 hours",
    },
    {
      id: 3,
      name: "Liver Function Test (LFT)",
      image:"/images/liverfunctiontest.jpg",
      description: "Evaluates liver health by measuring enzymes, proteins, and bilirubin levels.",
      price: 1800,
      preparation: "No alcohol consumption 24 hours before the test.",
      sampleType: "Blood",
      processingTime: "6-8 hours",
    },
    {
      id: 4,
      name: "Thyroid Function Test (TFT)",
      image:"/images/thyroid_function.avif",
      description: "Measures T3, T4, and TSH levels to assess thyroid health.",
      price: 2500,
      preparation: "No specific preparation required, but consult your doctor if you're on thyroid medication.",
      sampleType: "Blood",
      processingTime: "24 hours",
    },
  ];
  return (
      <div className="labTests-container">
      <h1 className="page-title">Lab Tests</h1>
      <div className="labTests-grid">
        {labTests.map((labTest) => (
          <div key={labTest.id} className="labTests-card">
            <img src={labTest.image} alt={labTest.name} className="labTests-image" />
            <h3>{labTest.name}</h3>
            <h4>{labTest.price}</h4>
            <p>{labTest.description}</p>
            <button onClick={()=>handleAppointmentClick(labTest)} className="contact-link">
              Book Lab Test
            </button>
          </div>
        ))}
      </div>
      
      
    </div>
  )
}

export default LabTests
