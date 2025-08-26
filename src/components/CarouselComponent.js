import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/BannerFrame.css';

const slides = [
  {
    title: "Mountain car",
    description: "TAARZAN : THE WONDER CAR, OR SIMPLY CALLED TAARZAN, IS A 2004 INDIAN HINDI-LANGUAGE SUPERNATURAL ACTION THRILLER FILM DIRECTED BY ABBAS–MUSTAN. THE FILM STARS VATSAL SHETH , AYESHA TAKIA, AND AJAY DEVGN, WHILE FARIDA JALAL, PANKAJ DHEER, SADASHIV AMRAPURKAR, AMRISH PURI, SHAKTI KAPOOR, GULSHAN GROVER AND MUKESH TIWARI PLAY",
    image: "/assets/images/banner_1.png"
  },
  {
    title: "City Drive",
    description: "EXPERIENCE THE ULTIMATE CITY DRIVE WITH OUR LATEST MODELS. ENJOY COMFORT, STYLE, AND PERFORMANCE AS YOU NAVIGATE THROUGH THE URBAN LANDSCAPE.",
    image: "/assets/images/car1.jpg"
  },
  {
    title: "Adventure Awaits",
    description: "GEAR UP FOR YOUR NEXT ADVENTURE WITH OUR RANGE OF RUGGED AND RELIABLE VEHICLES. BUILT TO HANDLE ANY TERRAIN AND TAKE YOU WHEREVER YOU WANT TO GO.",
    image: "/assets/images/car2.jpg"
  }
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSelect = (selectedIndex) => setCurrentIndex(selectedIndex);

  return (
    <div className="banner-carousel-wrapper">
      <Carousel
        fade
        activeIndex={currentIndex}
        onSelect={handleSelect}
        pause={true}
        interval={8000}
        indicators={true}
        controls= {false}
        style={{ height: "75vh" }}
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              className="banner-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
                height: "75vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                width: "100%"
              }}
            >
              <div className="banner-overlay" />
              <div className="banner-content">
                <h1 className="banner-title">{slide.title}</h1>
                <p className="banner-desc">{slide.description}</p>
                <Link className="banner-btn" to="/SeeAll">Explore More</Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
