import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { token } = useSelector((state) => state.auth);
  const handleClickLogin = () => {
    if (token) {
      alert("Already Logged in");
    }
  };
  return (
    <>
      <footer>
        <div className="container ">
          <div className="row">
            <div className="col-md-3">
              <div className="logo text-light" style={{
                fontSize: "14px",
                marginTop: "12px",
                fontWeight: 700,
                fontFamily: "Work Sans"

              }}>
                <NavLink to="/">CARASIS</NavLink>
              </div>
              <div className="about-us">
                <ul>
                  <li>
                    <i className="fa fa-map-marker" />
                    <a href="https://maps.google.com/?q=185 Eastern Parade, Port Adelaide SA 5015" target="_blank">
                      185 Eastern Parade Port Adelaide SA 5015
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-phone" />
                    <a href="tel:08 81234113" title="Call this number">08 81234113</a>
                  </li>
                  <li>
                    <i className="fa fa-envelope" />
                    <a href="mailto:email@example.com">admin@asisauctions.com.au</a>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start" }}>
                    <i className="fa fa-bank" />
                    Westpac Bank
                    <br />
                    AS IS AUCTIONS PTY LTD
                    <br />
                    BSB: 035055
                    ACC: 475994
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h4>Featured Links</h4>
              <div className="d-flex column featured-links">
                <div>
                  {/* <ul>
                    <li>
                      <NavLink to="/login" onClick={handleClickLogin}>
                        <i className="fa fa-caret-right" />
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup" onClick={handleClickLogin}>
                        <i className="fa fa-caret-right" />
                        Sign Up
                      </NavLink>
                    </li>
                  </ul> */}
                </div>
                <div>
                  <ul>
                    <li>
                      <NavLink to="/contact">
                        <i className="fa fa-caret-right" />
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/privacynotice">
                        <i className="fa fa-caret-right" />
                        Privacy Collection Notice
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/aboutUs">
                        <i className="fa fa-caret-right" />
                      about us
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <NavLink to="/emaildisclaimer">
                        <i className="fa fa-caret-right" />
                        Email Disclaimer
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/termsofuse">
                        <i className="fa fa-caret-right" />
                        Terms of Use
                      </NavLink>
                    </li>
                  </ul>
                </div>{" "}
                <div>
                  <ul>
                    <li>
                      <NavLink to="/termsconditions">
                        <i className="fa fa-caret-right" />
                        Terms and Conditions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/privacypolicy">
                        <i className="fa fa-caret-right" />
                        Privacy Policy
                      </NavLink>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              height: 2,
              borderWidth: 0,
              color: "gray",
              backgroundColor: "gray",
            }}
          />

          <div className="row text-light d-flex justify-content-center" style={{ fontSize: "small" }}>
            @ 2023 AS IS AUCTIONS PTY LTD. All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
