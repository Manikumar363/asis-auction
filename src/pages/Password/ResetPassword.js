import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "../../utils/axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;
  useEffect(() => {
    // Check if email is undefined in location state
    if (!email) {
      // Navigate to forgot-password page if email is not available
      navigate("/forgot-password");
    }
  }, [email]);

  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handlePwdChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { newPassword, confirmPassword } = values;

    if (newPassword.length < 8) {
      toast.error("Password must contain 8 characters.", toastOptions);
      return false;
    } else if (confirmPassword !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    }

    return true;
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = values;
    setLoading(true);

    try {
      if (handleValidation()) {
        // console.log(email);
        const { data } = await axios.put("/api/user/reset-password", {
          email,
          newPassword,
          confirmPassword,
        });

        toast.success(data?.message, toastOptions);
        navigate("/login");

        setValues({
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unknown error occurred",
        toastOptions
      );
      // console.log(error);
    }

    setLoading(false);
  };
  return (
    <Layout>
      <div className="heading-section form-container m-auto mt-3 mb-3">
        <h2>Reset Password</h2>
        <Form onSubmit={handlePwdSubmit} className="password-form">
          <ReactPlaceholder
            type="text"
            color="#F0F0F0"
            showLoadingAnimation
            rows={5}
            style={{ width: "80%" }}
            ready={!loading}
          >
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePwdChange}
                name="newPassword"
                required
                value={values?.newPassword}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePwdChange}
                name="confirmPassword"
                required
                value={values?.confirmPassword}
              />
            </Form.Group>
            <div className="form-sub-sec">
              <button type="submit" className="advanced-button">
                Update
              </button>
            </div>
          </ReactPlaceholder>
        </Form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
