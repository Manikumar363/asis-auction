import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/FooterCustom.css";

const Footer = () => {
  return (
    <footer className="footer-custom-bg">
      <div className="footer-custom-container">
        <div className="footer-custom-main">
          <div className="footer-custom-left">
            <div className="footer-custom-title">Carasis</div>
            <ul className="footer-custom-contact-list">
              <li>
                <span className="footer-custom-icon-circle"><i className="fa fa-map-marker" /></span>
                <span>185 Eastern Parade Port Adelaide SA 5015</span>
              </li>
              <li>
                <span className="footer-custom-icon-circle"><i className="fa fa-phone" /></span>
                <span>08 81234113</span>
              </li>
              <li>
                <span className="footer-custom-icon-circle"><i className="fa fa-envelope" /></span>
                <span>admin@asisauctions.com.au</span>
              </li>
              <li>
                <span className="footer-custom-icon-circle"><i className="fa fa-bank" /></span>
                <span>
                  Westpac Bank<br />
                  AS IS AUCTIONS PTY LTD<br />
                  BSB: 035055 ACC: 475994
                </span>
              </li>
            </ul>
          </div>
          <div className="footer-custom-right">
            <div className="footer-custom-links-title">Featured Links</div>
            <div className="footer-custom-links-cols">
              <ul>
                <li><NavLink to="/privacynotice">Privacy Collection Notice</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>
                <li><NavLink to="/aboutUs">About Us</NavLink></li>
                <li><NavLink to="/emaildisclaimer">Email Disclaimer</NavLink></li>
              </ul>
              <ul>
                <li><NavLink to="/termsofuse">Terms of Use</NavLink></li>
                <li><NavLink to="/termsconditions">Terms and Conditions</NavLink></li>
                <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-custom-bottom">
          @ 2023 AS IS AUCTIONS PTY LTD. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
