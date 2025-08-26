import React from "react";
import Layout from "../components/Layout/Layout/Layout";
import "../styles/ServicesCustom.css";
import { EfficiencyIcon, TimerIcon, CalendarIcon, SaleIcon, TickIcon } from "../components/icons";


const Services = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <div className="services-banner">
        <img src="/assets/images/service-car.png" alt="Car Banner" className="services-banner-img" />
        <div className="services-banner-title">Services</div>
      </div>
      <section className="services-why-section">
        <div className="services-why-header">
          <h2>
            Why <span className="services-why-highlight">choose</span> us?
          </h2>
          <p className="services-why-desc">
            Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam suscipit
          </p>
        </div>
        <div className="services-cards-grid">
          <div className="services-card services-card-highlight services-card-rotated">
            <span className="services-card-icon-bg">
              <TickIcon />
            </span>
            <div className="services-card-title">Honesty and Reliability</div>
            <div className="services-card-desc">
              Here you sell your car as its existing condition so seller knows what they selling and the buyer know what they buying so would be no false description you get what you
            </div>
          </div>
          <div className="services-card">
            <div className="services-card-icon">
              <TimerIcon />
            </div>
            <div className="services-card-title">Overnight Activity</div>
            <div className="services-card-desc">
              Your auction is active while you are sleep or your bids are active if you have used our Bidbot to bid on your behalf while you are away.
            </div>
          </div>
          <div className="services-card">
            <div className="services-card-icon">
              <CalendarIcon />
            </div>
            <div className="services-card-title">Advance Planning</div>
            <div className="services-card-desc">
              You can plan ahead and set your auction time and date days before starting.
            </div>
          </div>
          
          <div className="services-card">
            <div className="services-card-icon">
              <SaleIcon />
            </div>
            <div className="services-card-title">Same Day Sale Is Guaranteed</div>
            <div className="services-card-desc">
              You can create an auction to end same day, if no-one bids on your vehicle we will offer you to buy it if its in metro area on the same day. Time efficiency: Can set to sell your car in any time suits you.
            </div>
          </div>
          <div className="services-card">
            <div className="services-card-icon">
              <EfficiencyIcon />
            </div>
            <div className="services-card-title">Time efficiency</div>
            <div className="services-card-desc">
              You can set a time that works best for you to sell your car.
            </div>
          </div>
          
        </div>
      </section>
    </Layout>
  );
};

export default Services;
