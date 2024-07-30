import React from "react";
import { NavLink } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent.js";
import Layout from "../components/Layout/Layout/Layout.js";
import ProductCarousel from "../components/ProductCarousel.js";
import { useDispatch } from "react-redux";
import { GetAuctions } from "../features/apiCall.js";
import Frame from "../components/Frame.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Testimonials from "../components/Testimonial.jsx";
const HomePage = () => {
  const dispatch = useDispatch()
  return (
    <Layout>
      <div style={{ height: "65vh", overflowY: "hidden" }}>
        <CarouselComponent />
      </div>
      {/* <div className="caraousel"></div> Trying purpose*/}
      {/* See all cars */}
      <div id="cta-1">
        <div className="container">
          <div id="car-show-row" className="row">
            <div className="col-md-12">
              <div>

              </div>

              <div className="advanced-button" style={{ width: "190px" }}>
                <NavLink to="/SeeAll">
                  See all Vehicles
                  <i className="fa fa-car" />
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            <div id="home-car-carousel" style={{ marginTop: "10px" }}>
              <ProductCarousel />
            </div>
            {/* <div style={{ marginTop: "30px", textAlign: "left" }}> */}
            <div style={{ textAlign: "left" }}>
              {/* <h2 style={{ fontSize: "x-large", fontWeight: "600" }}>
                How It Works
              </h2> */}
              {/* <div
                style={{
                  minHeight: "200px",
                  width: "100%",
                  display: "flex",
                  padding: "30px",
                }}
              >
                <div className="circle"><img src="https://www.svgrepo.com/show/307707/car-dealership-car-sale-car-dealer-buy-car.svg"/></div>
                <div style={{width:"70%",marginLeft:"70px",textAlign:"right"}}>
                  <h3>Seller</h3>
                  <p style={{fontSize:"small"}}>
                    We will charge the seller %10 of the sales price for
                    providing the service. Seller will upload a vehicle and
                    create an Auction by their own. If seller disobey the rules
                    of this platform and didn’t confirm the sale which has
                    reached its asking price after auction done then seller will
                    be BAN from this platform for a period of time
                  </p>
                </div>
              </div>
              <div
                style={{
                  minHeight: "200px",
                  width: "100%",
                  display: "flex",
                  padding: "30px",
                }}
              >
                <div className="circle"><img src="https://www.svgrepo.com/show/307242/consider-buying-a-car-think-car-enthusiast-buying-a-car.svg" /></div>
                <div style={{width:"70%",marginLeft:"70px",textAlign:"right"}}>
                  <h3>Buyer</h3>
                  <p style={{fontSize:"small",textAlign:"right"}}>
                  We will charge the buyer $100 fixed rate for administration fee for any cars.
Once the buyer won any auction or holds the highest bid regardless of reaching the asked price of 
the seller then buyer has to wait for seller to confirm the Sales after Auction overs, or seller might 
not.
Buyer will be BAN from using the platform if fails to do the payment and disobey the platform 
rules
                  </p>
                </div>
              </div>
              <div
                style={{
                  minHeight: "200px",
                  width: "100%",
                  display: "flex",
                  padding: "30px",
                }}
              >
                <div className="circle"><img src="https://www.pikpng.com/pngl/b/179-1796614_hammer-judge-svg-png-hammer-judge-png-icon.png"/></div>
                <div style={{width:"70%",marginLeft:"70px",textAlign:"right"}}>
                  <h3>Us</h3>
                  <p style={{fontSize:"small"}}>
                  When Seller and Buyer done the payment then we will exchange the details of Seller & Buyer to 
get in touch with each other and complete their deal outside this platform
we work as a platform and we are not in contact for your deal so pls make sure to check your 
vehicle thoroughly how ever everything will be sold as is, which means its ( existing condition ) img
but we encourage the users to pay more attention.
All the payments are in AUD and will be done outside of this platform and its done by ( PayPal ) 
so we have no access to your Credit card details and your Bank Account.
                  </p>
                </div>
              </div> */}
              <section className="why-us how-it-works-section" style={{ background: "transparent" }}>
                {/* <div className="container" >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="left-content">

                        <div className="services d-flex flex-wrap">
                          <div className="col-md-12" style={{ marginBottom: "60px" }}>
                            <div  >

                              <div className="circle" style={{ float: "left", height: "100px", width: "100px", marginRight: "10px" }}><img src="https://www.svgrepo.com/show/307707/car-dealership-car-sale-car-dealer-buy-car.svg" /></div>
                              <div className="tittle">
                                <h2 style={{ textDecoration: "underline" }}>Seller</h2>

                              </div>
                              <p className="rulesp" style={{ margin: "0px", textAlign: "left", float: "none", fontSize: "medium" }}>
                                We will charge the seller %10 of the sales price for providing the service.
                                Seller will upload a vehicle and create an Auction by their own.
                                If seller disobey the rules of this platform and didn’t confirm the sale which has reached its asking
                                price after auction done then seller will be BAN from this platform for a period of time.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12" style={{ marginBottom: "60px" }} >
                            <div className="service-item" >
                              <div className="circle" style={{ float: "left", height: "100px", width: "100px", marginRight: "10px", marginBottom: "0px" }}><img src="https://www.svgrepo.com/show/307242/consider-buying-a-car-think-car-enthusiast-buying-a-car.svg" /></div>
                              <div className="tittle">
                                <h2 style={{ textDecoration: "underline" }}>Buyer</h2>


                              </div>
                              <p className="rulesp" style={{ margin: "0px", textAlign: "left", float: "none", fontSize: "medium" }}>
                                We will charge the buyer $100 fixed rate for administration fee for any cars.
                                Once the buyer won any auction or holds the highest bid regardless of reaching the asked price of
                                the seller then buyer has to wait for seller to confirm the Sales after Auction overs, or seller might
                                not.
                                Buyer will be BAN from using the platform if fails to do the payment and disobey the platform
                                rules
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12" style={{ marginBottom: "60px" }}>
                            <div className="service-item">
                              <div className="circle" style={{ float: "left", height: "100px", width: "100px", marginRight: "10px" }}><img src="https://www.svgrepo.com/show/307707/car-dealership-car-sale-car-dealer-buy-car.svg" /></div>
                              <div className="tittle">
                                <h2 style={{ textDecoration: "underline" }}>Us</h2>

                              </div>
                              <p className="rulesp" style={{ margin: "0px", textAlign: "left", float: "none", fontSize: "medium" }}>
                                When Seller and Buyer done the payment then we will exchange the details of Seller & Buyer to
                                get in touch with each other and complete their deal outside this platform
                                we work as a platform and we are not in contact for your deal so pls make sure to check your
                                vehicle thoroughly how ever everything will be sold as is, which means its ( existing condition )
                                but we encourage the users to pay more attention.
                                All the payments are in AUD and will be done outside of this platform and its done by ( PayPal )
                                so we have no access to your Credit card details and your Bank Account.
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div> */}
                <Frame />
              </section>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {/* why us */}
      <section className="why-us" style={{ padding: 0 }}>
        {/* <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="left-content">
                <div className="heading-section">
                  <h2>Why choose us?</h2>
                  <span>
                    Vivamus gravida magna massa in cursus mi vehicula at. Nunc
                    sem quam suscipit
                  </span>
                  <div className="line-dec" />
                </div>
                <div className="services d-flex flex-wrap">
                  <div className="col-md-6">
                    <div className="service-item">
                      <i className="fa fa-bar-chart" />
                      <div className="tittle">
                        <h2>Results of Drivers</h2>
                      </div>
                      <p>
                        Integer nec posuere metus, at feugiat. Sed sodales
                        venenat malesuada.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item">
                      <i className="fa fa-gears" />
                      <div className="tittle">
                        <h2>upgrades performance</h2>
                      </div>
                      <p>
                        Integer nec posuere metus, at feugiat. Sed sodales
                        venenat malesuada.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item second-row">
                      <i className="fa fa-pencil" />
                      <div className="tittle">
                        <h2>product sellers</h2>
                      </div>
                      <p>
                        Integer nec posuere metus, at feugiat. Sed sodales
                        venenat malesuada.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item second-row last-service">
                      <i className="fa fa-wrench" />
                      <div className="tittle">
                        <h2>Fast Service</h2>
                      </div>
                      <p>
                        Integer nec posuere metus, at feugiat. Sed sodales
                        venenat malesuada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="right-img">
                <img src="assets/images/car3.jpg" alt="Car" />
                <div className="img-bg" />
              </div>
            </div>
          </div>
        </div> */}
        <WhyChooseUs />
      </section>

      <section className="testimonials" style={{ padding: 0 }} >
        <Testimonials />
      </section>

    </Layout>
  );
};

export default HomePage;
