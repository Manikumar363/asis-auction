import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";

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
        <div className="form-image"></div>
        <div className="heading-section form-container">
          <h2>LOGIN ACCOUNT</h2>
          <Form id="Signup-form" onSubmit={handleSubmit}>
            <InputGroup className="I-input mb-3">
              <i className="fa fa-envelope" />
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </InputGroup>
            <p>We'll never share your email with anyone else.</p>
            <InputGroup className="I-input mb-3">
              <i className="fa fa-lock" />

              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </InputGroup>
            <FormGroup className="mb-3 ">
              <NavLink
                className="text-decoration-none text-muted font-weight-bold "
                to="/forgot-password"
              >
                Forgot Password ?
              </NavLink>
            </FormGroup>
            {isFetching ? (
              <Button variant="dark" size="lg" disabled>
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <button className="advanced-button" type="submit">
                LOGIN
              </button>
            )}
          </Form>
          <div className="signup-link mt-3">
            <p>
              No account?{" "}
              <NavLink
                to="/signup"
                className="text-decoration-none text-muted font-weight-bold"
              >
                Sign up here
              </NavLink>
            </p>
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
