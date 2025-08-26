import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SocialHeader.css"; // adjust path as needed

const SocialHeader = () => (
  <div id="sub-header">
    <div className="social-header-container">
      <div className="social-header-left">
        AS IS AUCTIONS PTY LTD<br />
        ABN: 672843775
      </div>
      <div className="social-header-right">
        <Link to="/dashboard/user/upload-product" className="become-seller-btn">
          Become a Seller
        </Link>
        <a href="#" className="social-icon-link"><i className="fa-brands fa-facebook-f" /></a>
        <a href="#" className="social-icon-link"><i className="fa-brands fa-instagram" /></a>
        <a href="#" className="social-icon-link"><i className="fa-brands fa-tiktok" /></a>
      </div>
    </div>
  </div>
);

export default SocialHeader;
