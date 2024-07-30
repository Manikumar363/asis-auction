import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";

const Auction = () => {
  return (
    <Layout>
      <div className="container Create-auction">
        <Row>
          <Col className="d-flex justify-content-center flex-column ">
            <h2>
              Sell your car at best price
              <br /> instantly from home
            </h2>
            <div>
              <div className="d-flex">
                <div>
                  <img
                    width="44px"
                    height="44px"
                    src="https://stimg.cardekho.com/pwa/img/gaadistore/BsetPrice.svg"
                    alt="Best Price"
                  />
                  <span>Best Price</span>
                </div>
                <div>
                  <img
                    width="44px"
                    height="44px"
                    src="https://stimg.cardekho.com/pwa/img/gaadistore/Instant.svg"
                    alt="Instant Payment"
                  />
                  <span>Instant Payment</span>
                </div>
                <div>
                  <img
                    width="44px"
                    height="44px"
                    src="https://stimg.cardekho.com/pwa/img/gaadistore/BsetPrice.svg"
                    alt="Best Price"
                  />
                  <span>Choose the Best</span>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <img width="300px" src="assets/images/car_ill.jpg" />
          </Col>
        </Row>
      </div>
      <section className="HowWeWork">
        <Container>
          {/* <div className="start-now">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ante
            neque. Donec fermentum erat ac arcu porttitor pretium. Suspendisse
            sed dolor vitae turpis congue ultricies ut eu ipsum. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Aenean pharetra varius erat, a lacinia nisl commodo sed. Cras
            convallis accumsan ante, ac mollis urna venenatis in. Quisque
            tincidunt ligula sit amet bibendum accumsan. Nam sagittis turpis at
            porttitor sollicitudin. Maecenas vel erat metus.s
          </div> */}
          <h2>How we Work?</h2>

          <div className="container ">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="card"
                  style={{ backgroundColor: "transparent", border: 0 }}
                >
                  <div className="card-body">
                    <div id="content">
                      <ul className="timeline">
                        <li className="event">
                          <h3>Upload Vehicle Detail</h3>
                          <div>
                            <p>
                              Get here on time, it's first come first serve. Be
                              late, get turned away.
                            </p>
                            <button className="advanced-button">
                              <NavLink to="/dashboard/user/upload-product">
                                Upload You Car
                              </NavLink>
                            </button>
                          </div>
                        </li>
                        <li className="event">
                          <h3>Select your Car and Create Auction</h3>
                          <div>
                            <button className="advanced-button">
                              <NavLink to="/dashboard/user/show-cars">
                                Select You Car
                              </NavLink>
                            </button>
                          </div>
                        </li>

                        <li className="event">
                          <h3>
                            Find the Highest/Best Bid under Auction Status
                            <div>
                              <button className="advanced-button m-3">
                                <NavLink to="/dashboard/user/get-auction-status">
                                  See Auction Status
                                </NavLink>
                              </button>
                            </div>
                          </h3>
                        </li>
                        <li className="event">
                          <h3>Pay some amount to find your bidder</h3>
                        </li>
                        <li className="event">
                          <h3>Collect your car</h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Auction;
