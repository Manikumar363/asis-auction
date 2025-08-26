import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";
import "../../styles/login.css";

import { login } from "../../features/apiCall";

const Login = () => {
  const { isFetching, error, errMsg, token } = useSelector(
    (state) => state.auth
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoogedIn, setIsLoogedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      navigate("/");
    }
  }, [navigate, token, error, isFetching, isLoogedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { email, mobile } = values;
    const { email, password } = values;
    await login(dispatch, { email, password });

    setIsLoogedIn(true);
  };
  useEffect(() => {
    if (error && !isFetching && isLoogedIn) {
      toast.error(errMsg || "Unknown error occurred", ErrorToastOptions);
      setIsLoogedIn(false);
    }
  }, [error, isFetching, isLoogedIn, errMsg]);
  return (
    <Layout>
      <section className="Signup-container">
      <img src="/assets/images/top-decorative.png" alt="" className="login-decoration-top" />
        <div className="login-left">
          <h1>
            <span className="highlight">Login</span> to<br />
            Bid, Buy & Sell
          </h1>
          <p className="login-description">
          Access exclusive vehicle auctions, place winning bids, and manage your listings — all in one place. Sign in to start your car trading journey today!
          </p>
        </div>
        <div className="login-right">
          <Form id="Signup-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <i className="fa fa-envelope" />
              <Form.Control
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
              </div>
              <div className="input-wrapper">
              <i className="fa fa-lock" />
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              </div>
              <div className="login-options">
              <NavLink
                className="forgot-link "
                to="/forgot-password"
              >
                Forgot Password ?
              </NavLink>
              </div>
            {isFetching ? (
              <Button className="login-btn" size="lg" disabled>
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <button className="login-btn" type="submit">
                LOGIN
              </button>
            )}
          </Form>
          <div className="signup-link ">
              <span>No account?</span>
              <NavLink
                to="/signup"
                className="signup-link-highlight"
              >
                Sign up here
              </NavLink>
          </div>
          {/* <div className=" social-login">
            <span className="social-label">
              Or <br />
              Continue with
            </span>
            <div className="d-flex socials w-25 justify-content-between m-auto mt-3">
              <a href="/users/auth/google">
                <img src="assets/social-icons/001-google.png" alt="Google" />
              </a>
              <a href="/users/auth/google">
                <img
                  src="assets/social-icons/002-facebook.png"
                  alt="Facebook"
                />
              </a>
            </div>
          </div> */}
        </div>
      </section>
    </Layout>
  );
};

export default Login;
