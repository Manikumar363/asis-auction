import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent.js";
import Layout from "../components/Layout/Layout/Layout.js";
import ProductCarousel from "../components/ProductCarousel.js";
import { useDispatch } from "react-redux";
import { GetAuctions } from "../features/apiCall.js";
import Frame from "../components/Frame.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Testimonials from "../components/Testimonial.jsx";
import HomeBanner from "../components/HomeBanner.js";
import "../styles/HomeBanner.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/SeeAll');
  };

  return (
    <Layout>
      <div style={{ height: "75vh", overflowY: "hidden" }}>
        <CarouselComponent />
      </div>
      
      {/* Product Carousel and Frame - NO container, row, col wrappers */}
      <div id="home-car-carousel" style={{ marginTop: "8px" }}>
        <ProductCarousel />
      </div>
      <div style={{ textAlign: "left" }}>
        <section className="why-us how-it-works-section" style={{ background: "transparent", padding: 0, margin: 0 }}>
          <Frame />
        </section>
      </div>

      {/* why us */}
      <section className="why-us" style={{ padding: 0 }}>
        <WhyChooseUs />
      </section>

      <HomeBanner handleExploreMore={handleExploreMore} />

      <section className="testimonials" style={{ padding: 0 }} >
        <Testimonials />
      </section>
    </Layout>
  );
};

export default HomePage;