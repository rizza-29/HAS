import React from "react";
import "./Hero.css";
import SlideShow from "../Slideshow/SlideShow";
function Hero({handleApptClick,handleLoginClick}) {
  return (
    <div>
      <section className="hero-section">
       <SlideShow handleApptClick={handleApptClick} handleLoginCLick={handleLoginClick} />
      </section>
    </div>
  );
}

export default Hero;
