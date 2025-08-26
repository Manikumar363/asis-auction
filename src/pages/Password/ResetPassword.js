import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "../../utils/axios";
import "../../styles/ResetPasswordCustom.css";

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
      <div className="reset-password-wrapper">
        <div className="reset-password-left">
          <div className="reset-password-title">
            <span className="highlight">Reset</span> Your
            <br />
            Password
          </div>
          <div className="reset-password-desc">
            Enter your new password below to update your account and regain access. Make sure it’s strong and secure.
          </div>
        </div>
        <div className="reset-password-right">
          <form className="reset-password-form" onSubmit={handlePwdSubmit} autoComplete="off">
            <div className="reset-input-group">
              <span className="input-group-text">
                <i className="fa fa-key" />
              </span>
              <input
                type="password"
                className="reset-password-input"
                placeholder="New Password"
                name="newPassword"
                value={values.newPassword}
                onChange={handlePwdChange}
                required
              />
              <span className="input-group-icon">
                <i className="fa fa-eye" />
              </span>
            </div>
            <div className="reset-input-group">
              <span className="input-group-text">
                <i className="fa fa-key" />
              </span>
              <input
                type="password"
                className="reset-password-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handlePwdChange}
                required
              />
              <span className="input-group-icon">
                <i className="fa fa-eye-slash" />
              </span>
            </div>
            <button className="reset-password-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
