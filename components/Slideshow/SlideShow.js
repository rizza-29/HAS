import React, { useState, useEffect } from 'react';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import prev from './previous.png';
import next from './next.png';
import './SlideShow.css';

function SlideShow({handleApptClick,handleLoginCLick}) {
  const slides = [
    <Slide1 handleApptClick={handleApptClick} />,
    <Slide2 handleLoginCLick={handleLoginCLick} />,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideTimer = setInterval(nextSlide, 3000); 
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div>
      <div className="slideshow-container">
        {slides[currentSlide]}
        <button onClick={prevSlide} className="slide-button prev">
          <img src={prev} alt="Previous" />
        </button>
        <button onClick={nextSlide} className="slide-button next">
          <img src={next} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default SlideShow;
