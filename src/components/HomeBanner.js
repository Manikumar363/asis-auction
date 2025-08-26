import React from 'react';

const HomeBanner = ({ handleExploreMore }) => {
  return (
    <div className="home-banner-section" style={{ background: 'transparent', margin: 0, padding: 0 }}>
      <div className="home-banner-container">
        <div className="home-banner-left">
          <h2 className="home-banner-title">
            Join the auction and drive{'\n'}home your dream vehicle.
          </h2>
          <button className="home-banner-btn" onClick={handleExploreMore}>
            Explore More
          </button>
          <div className="home-banner-decoration"></div>
        </div>
        <div className="home-banner-right">
          <img src="/assets/images/Banner_car.png" alt="Luxury Car" className="home-banner-image" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner; 