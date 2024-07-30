import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";
import { sendQuery } from "../features/apiCall";
import { toast } from "react-toastify";

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const pageTitle = "Contact Us";
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
  const successToastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
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
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
    else {
      toast.error("Please fill all the fields", ErrorToastOptions);
    }
  };
  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <div className="contact-form mb-5">
        <Container>
          <Row>
            <Col md={8}>
              <div className="contact-form mb-5">
                <Form id="contact_form" onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <InputGroup className="I-input mb-3">
                        <i className="fa fa-user" />
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup className=" I-input mb-3">
                        <i className="fa fa-envelope" />

                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup className="I-input mb-3">
                        <i className="fa fa-phone" />

                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>

                    <Col md={12}>
                      <InputGroup className="I-input mb-3">
                        <i className="fa fa-comment" />

                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Write message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      {isPlacingBid ? (
                        <button
                          className="advanced-button"
                          type="submit "
                          disabled
                        >
                          Sending...
                        </button>
                      ) : (
                        <button className="advanced-button mb-6" type="submit">
                          Send Message <i className="fa fa-paper-plane" />
                        </button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col md={4}>
              <div className="contact-info">
                <div className="phone">
                  <h4>Phone</h4>
                  <span><a href="tel:08 81234113" title="Call this number">08 81234113</a></span>
                </div>
                {/* <div className="fax">
                  <h4>Fax</h4>
                  <span>+33 20966400 1342</span>
                </div> */}
                <div className="email">
                  <h4>Email</h4>
                  <a
                    href="mailto:admin@asisauctions.com.au
"
                  >
                    admin@asisauctions.com.au
                  </a>
                </div>
                <div className="address">
                  <h4>Address</h4>
                  <span>
                    <a href="https://maps.google.com/?q=185 Eastern Parade, Port Adelaide SA 5015" target="_blank">
                      185 Eastern Parade
                      <br />
                      Port Adelaide SA 5015
                    </a>

                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

const CustomInputGroup = ({ iconClass, children }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={iconClass} />
        </span>
      </div>
      {children}
    </div>
  );
};

export default Contact;
