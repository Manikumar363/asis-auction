import React, { useState } from "react";
import Layout from "../components/Layout/Layout/Layout";
import "../styles/ContactCustom.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendQuery } from "../features/apiCall";
import { toast } from "react-toastify";
import { EmailIcon,PhoneIcon,AddressIcon } from "../components/icons";

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isPlacingBid } = useSelector((state) => state.bid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };
  const send = async () => {
    const { name, email, phone, message } = formData;
    if (name && email && phone && message) {
      sendQuery(dispatch, { name, email, phone, message });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error("Please fill all the fields", ErrorToastOptions);
    }
  };
  return (
    <Layout>
      <div className="contact-banner">
        <img src="/assets/images/contact-car.png" alt="Contact Banner" className="contact-banner-img" />
        <div className="contact-banner-title">Contact</div>
      </div>
      <section className="contact-main-section">
        <div className="contact-main-flex">
          <div className="contact-left">
            <h2>
              <span className="contact-heading-black">Keep in</span><br />
              <span className="contact-heading-blue">Touch</span>
            </h2>
            <p className="contact-desc">
              Have a query? Let us know — we're just a message away.
            </p>
            <p className="contact-desc-2">
              Have questions about bidding or selling your vehicle? Our support team is here to assist you at every step of the auction process. Reach out anytime — we're just a call or message away!
            </p>
          </div>
          <form className="contact-form-modern" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="contact-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="contact-input"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="contact-input"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="contact-input contact-textarea"
              rows={5}
            />
            <button className="contact-submit-btn" type="submit" disabled={isPlacingBid}>
              {isPlacingBid ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
      <div className="contact-info-bar">
        <div className="contact-info-item">
          <span className="contact-info-icon-bg"><EmailIcon /></span>
          <div>
            <span className="contact-info-label">Email</span>
            <div className="contact-info-value">admin@asisauctions.com.au</div>
          </div>
        </div>
        <div className="contact-info-item">
          <span className="contact-info-icon-bg"><PhoneIcon /></span>
          <div>
            <span className="contact-info-label">Phone</span>
            <div className="contact-info-value">08 81234113</div>
          </div>
        </div>
        <div className="contact-info-item">
          <span className="contact-info-icon-bg"><AddressIcon /></span>
          <div>
            <span className="contact-info-label">Address</span>
            <div className="contact-info-value">185 Eastern Parade<br />Port Adelaide SA 5015</div>
          </div>
        </div>
      </div>
      <div className="contact-map">
        <iframe
          title="map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=138.5000%2C-34.8500%2C138.5100%2C-34.8400&amp;layer=mapnik"
          style={{ width: "100%", height: "220px", border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </Layout>
  );
};

export default Contact;
