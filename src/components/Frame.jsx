import { useEffect, useState } from "react";
import FrameComponent from "./FrameComponent";
import "../styles/global.css";
import "../styles/Frame.css";

const Frame = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="frame-parent">
      <div className="heading-2-how-it-works-wrapper">
        <h1 className="heading-2" style={{ paddingBottom: "15px" }}>
          How It Works ?
        </h1>
      </div>
      {isMobile <= 1220 ? (
        isMobile <= 700 ? (
          <img className="mobile-page" src="/assets/images/whyChooseUs.svg" />
        ) : (
          <main className="frame-group">
            <div className="g-1">
              <div className="frame-container">
                <div className="frame-div">
                  <div className="frame-wrapper">
                    <div className="frame-parent1">
                      <div className="container-parent">
                        <div className="container">
                          <img
                            className="advisom-smart-icon-02png"
                            alt=""
                            src="/assets/images/advisomsmarticon02png@2x.png"
                          />
                        </div>
                        <img
                          className="advisom-smart-icon-02png1"
                          alt=""
                          src="/assets/images/advisomsmarticon02png@2x.png"
                        />
                        <div className="frame-child" />
                        <div className="frame-item" />
                        <img
                          className="frame-inner"
                          alt=""
                          src="/assets/images/rectangle-2602@2x.png"
                        />
                      </div>
                      <img
                        className="vector-icon"
                        loading="lazy"
                        alt=""
                        src="/assets/images/vector-6.svg"
                      />
                    </div>
                  </div>
                  <div className="frame-parent2">
                    <div className="heading-2-seller-wrapper">
                      <b className="heading-21">Us</b>
                    </div>
                    <p className="when-seller-and">{`When Seller and Buyer done the payment then we will exchange the details of Seller & Buyer to get in touch with each other and complete their deal outside this platform we work as a platform and we are not in contact for your deal so pls make sure to check your vehicle thoroughly how ever everything will be sold as is, which means its ( existing condition ) but we encourage the users to pay more attention. All the payments are in AUD and will be done outside of this platform and its done by ( PayPal ) so we have no access to your Credit card details and your Bank Account.`}</p>
                  </div>
                </div>
                <div className="frame-wrapper1">
                  <div className="group-div">
                    <div className="frame-parent3">
                      <div className="advisom-smart-icon-02png-parent">
                        <img
                          className="advisom-smart-icon-02png2"
                          alt=""
                          src="/assets/images/advisomsmarticon02png@2x.png"
                        />
                        <div className="ellipse-div" />
                        <div className="frame-child1" />
                        <img
                          className="rectangle-icon"
                          alt=""
                          src="/assets/images/rectangle-2604@2x.png"
                        />
                      </div>
                      <img
                        className="frame-child2"
                        loading="lazy"
                        alt=""
                        src="/assets/images/vector-6.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-wrapper3">
                <div className="frame-parent4">
                  <div className="frame-parent5">
                    <div className="frame-wrapper4">
                      <div className="frame-parent6">
                        <div className="heading-2-seller-container">
                          <b className="heading-22">Seller</b>
                        </div>
                        <p className="we-will-charge">
                          We will charge the buyer $100 fixed rate for
                          administration fee for any cars. Once the buyer won
                          any auction or holds the highest bid regardless of
                          reaching the asked price of the seller then buyer has
                          to wait for seller to confirm the Sales after Auction
                          overs, or seller might not. Buyer will be BAN from
                          using the platform if fails to do the payment and
                          disobey the platform rules
                        </p>
                      </div>
                    </div>
                    <div className="frame-wrapper5">
                      <div className="frame-parent7">
                        <div className="advisom-smart-icon-02png-group">
                          <img
                            className="advisom-smart-icon-02png3"
                            loading="lazy"
                            alt=""
                            src="/assets/images/advisomsmarticon02png@2x.png"
                          />
                          <div className="frame-child3" />
                          <div className="frame-child4" />
                          <img
                            className="frame-child5"
                            alt=""
                            src="/assets/images/rectangle-2604@2x.png"
                          />
                        </div>
                        <img
                          className="frame-child6"
                          alt=""
                          src="/assets/images/vector-7.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="frame-parent8">
                    <div className="heading-2-seller-frame">
                      <b className="heading-23">Buyer</b>
                    </div>
                    <p className="we-will-charge1">
                      We will charge the seller %10 of the sales price for
                      providing the service. Seller will upload a vehicle and
                      create an Auction by their own. If seller disobey the rule
                      of this platform and didn’t confirm the sale which has
                      reached its asking price after auction done then seller
                      will be BAN from this platform for a period of time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-wrapper2">
              <FrameComponent />
            </div>
          </main>
        )
      ) : (
        <main className="frame-group">
          <div className="frame-container">
            <div className="frame-div">
              <div className="frame-wrapper">
                <div className="frame-parent1">
                  <div className="container-parent">
                    <div className="container">
                      <img
                        className="advisom-smart-icon-02png"
                        alt=""
                        src="/assets/images/advisomsmarticon02png@2x.png"
                      />
                    </div>
                    <img
                      className="advisom-smart-icon-02png1"
                      alt=""
                      src="/assets/images/advisomsmarticon02png@2x.png"
                    />
                    <div className="frame-child" />
                    <div className="frame-item" />
                    <img
                      className="frame-inner"
                      alt=""
                      src="/assets/images/rectangle-2602@2x.png"
                    />
                  </div>
                  <img
                    className="vector-icon"
                    loading="lazy"
                    alt=""
                    src="/assets/images/vector-6.svg"
                  />
                </div>
              </div>
              <div className="frame-parent2">
                <div className="heading-2-seller-wrapper">
                  <b className="heading-21">Us</b>
                </div>
                <p className="when-seller-and">{`When Seller and Buyer done the payment then we will exchange the details of Seller & Buyer to get in touch with each other and complete their deal outside this platform we work as a platform and we are not in contact for your deal so pls make sure to check your vehicle thoroughly how ever everything will be sold as is, which means its ( existing condition ) but we encourage the users to pay more attention. All the payments are in AUD and will be done outside of this platform and its done by ( PayPal ) so we have no access to your Credit card details and your Bank Account.`}</p>
              </div>
            </div>
            <div className="frame-wrapper1">
              <div className="group-div">
                <div className="frame-parent3">
                  <div className="advisom-smart-icon-02png-parent">
                    <img
                      className="advisom-smart-icon-02png2"
                      alt=""
                      src="/assets/images/advisomsmarticon02png@2x.png"
                    />
                    <div className="ellipse-div" />
                    <div className="frame-child1" />
                    <img
                      className="rectangle-icon"
                      alt=""
                      src="/assets/images/rectangle-2604@2x.png"
                    />
                  </div>
                  <img
                    className="frame-child2"
                    loading="lazy"
                    alt=""
                    src="/assets/images/vector-6.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper2">
            <FrameComponent />
          </div>
          <div className="frame-wrapper3">
            <div className="frame-parent4">
              <div className="frame-parent5">
                <div className="frame-wrapper4">
                  <div className="frame-parent6">
                    <div className="heading-2-seller-container">
                      <b className="heading-22">Seller</b>
                    </div>
                    <p className="we-will-charge">
                      We will charge the buyer $100 fixed rate for
                      administration fee for any cars. Once the buyer won any
                      auction or holds the highest bid regardless of reaching
                      the asked price of the seller then buyer has to wait for
                      seller to confirm the Sales after Auction overs, or seller
                      might not. Buyer will be BAN from using the platform if
                      fails to do the payment and disobey the platform rules
                    </p>
                  </div>
                </div>
                <div className="frame-wrapper5">
                  <div className="frame-parent7">
                    <div className="advisom-smart-icon-02png-group">
                      <img
                        className="advisom-smart-icon-02png3"
                        loading="lazy"
                        alt=""
                        src="/assets/images/advisomsmarticon02png@2x.png"
                      />
                      <div className="frame-child3" />
                      <div className="frame-child4" />
                      <img
                        className="frame-child5"
                        alt=""
                        src="/assets/images/rectangle-2604@2x.png"
                      />
                    </div>
                    <img
                      className="frame-child6"
                      alt=""
                      src="/assets/images/vector-7.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="frame-parent8">
                <div className="heading-2-seller-frame">
                  <b className="heading-23">Buyer</b>
                </div>
                <p className="we-will-charge1">
                  We will charge the seller %10 of the sales price for providing
                  the service. Seller will upload a vehicle and create an
                  Auction by their own. If seller disobey the rule of this
                  platform and didn’t confirm the sale which has reached its
                  asking price after auction done then seller will be BAN from
                  this platform for a period of time.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Frame;
