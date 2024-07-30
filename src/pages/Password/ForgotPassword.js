import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "../../utils/axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const toastOption = {
    position: "top-center",
    autoClose: 2000,
    draggable: true,
    theme: "light",
  };

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSendLinkClick = async (e) => {
    e.preventDefault();

    if (email.length > 0) {
      const sendCode = async () => {
        setLoading(true);
        try {
          const { data } = await axios.post(
            "/api/user/send-forgot-password-code",
            {
              email,
            }
          );

          if (data) {
            setLoading(false);
            setEditMode(false);
            toast.success("Code sent", toastOption);
            setShowCodeInput(true);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error?.response?.data?.message, toastOptions);
        }
      };

      if (emailIsValid(email)) {
        setLoading(true);
        await sendCode();
      } else {
        // Handle invalid email address
      }
    } else {
      toast.error("Enter Your Mail!", toastOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const enteredCode = otp.join("");
      const { data } = await axios.post("/api/user/validate-code", {
        email,
        code: enteredCode,
      });

      setLoading(false);
      navigate("/reset-password", { state: email });
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, toastOptions);
    }
  };

  const handleOtpChange = (index, value) => {
    // Update the OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if the current one is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Layout>
      <div className="heading-section form-container m-auto mt-3 mb-3">
        <h2>Forgot Password</h2>
        <Form id="Signup-form">
          <InputGroup className="I-input mb-3">
            <i className="fa fa-envelope" />
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              required
            />
          </InputGroup>

          {showCodeInput ? (
            <>
              <p>You have receieved an OTP!. Kindly Input here</p>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="otp-input"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <p>
                Enter your email, and we'll send a code to reset your password.
              </p>
            </>
          )}
          {!showCodeInput && (
            <button
              className="advanced-button"
              type="submit"
              onClick={handleSendLinkClick}
            >
              SEND CODE
            </button>
          )}
          {showCodeInput && (
            <button
              className="advanced-button"
              type="submit"
              onClick={handleSubmit}
            >
              VERIFY CODE
            </button>
          )}
        </Form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
