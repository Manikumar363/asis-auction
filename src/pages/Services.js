import React from "react";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";

const Services = () => {
  const pageTitle = "Services";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <section className="why-us">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="left-content">
                <div className="heading-section">
                  <h2>Why choose us?</h2>
                  <span>
                    {/* Vivamus gravida magna massa in cursus mi vehicula at. Nunc
                    sem quam suscipit */}
                  </span>
                  <div className="line-dec" />
                </div>
                <div className="services d-flex flex-wrap">
                  <div className="col-md-6">
                    <div className="service-item">
                      <i className="fa fa-bar-chart" />
                      <div className="tittle">
                        <h2>Honesty and Reliability</h2>
                      </div>
                      <p>
                      Here you sell your car as its existing condition so seller knows what they selling and the buyer know what they buying so would be no false description you get what you
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item">
                      <i className="fa fa-gears" />
                      <div className="tittle">
                        <h2>SAME DAY SALE IS GUARANTEED</h2>
                      </div>
                      <p>
                      You can create an auction to end same day, if no-one bids on your vehicle we will offer you to buy it if its in metro area on the same day. Time efficiency: Can set to sell your car in any time suits you.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item second-row">
                      <i className="fa fa-pencil" />
                      <div className="tittle">
                        <h2>OVERNIGHT ACTIVITY</h2>
                      </div>
                      <p>
                      Your auction is active while you are sleep or your bids are active if you have used our Bidbot to bid on your behalf while you are away.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item second-row last-service">
                      <i className="fa fa-wrench" />
                      <div className="tittle">
                        <h2>TIME EFFICIENCY
                        </h2>
                      </div>
                      <p>
                      Can set to sell your car in any time suits you.


                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="service-item second-row last-service">
                      <i className="fa fa-wrench" />
                      <div className="tittle">
                        <h2>ADVANCE PLANNING
                        </h2>
                      </div>
                      <p>
                      You can plan ahead and set your auction time and date days before starting.


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
        </div>
      </section>
    </Layout>
  );
};

export default Services;
