import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "../../utils/axios";
import "../../styles/ForgotPasswordCustom.css";

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
  const [otp, setOtp] = useState(["", "", "", ""]); // Only 4 digits now
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
    if (value && index < 3) { // Only 4 digits
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Layout>
      <div className="forgot-password-wrapper">
        {!showCodeInput ? (
          <>
            <div className="forgot-password-left">
              <div className="forgot-password-title">
                <div className="forgot-title-top">Forgot</div>
                <div className="forgot-title-bottom"><span className="highlight">Password?</span></div>
              </div>
              <div className="forgot-password-desc">
                Enter your registered email address below. We'll send you a verification code to reset your password securely.
              </div>
            </div>
            <div className="forgot-password-right">
              <form className="forgot-password-form" onSubmit={handleSendLinkClick}>
                <InputGroup>
                  <span className="input-group-text">
                    <i className="fa fa-user" />
                  </span>
                  <input
                    type="email"
                    className="forgot-password-input"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={!editMode}
                  />
                </InputGroup>
                <button className="forgot-password-btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="forgot-password-left">
              <div style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>
                <span style={{ color: '#222' }}>Verify</span> <span style={{ color: '#4747e6' }}>OTP</span>
              </div>
              <div style={{ color: '#888', fontSize: 22, marginBottom: 32, maxWidth: 520, textAlign: 'left', fontWeight: 500, lineHeight: 1.4 }}>
                Enter the 4-digit code sent to your email or mobile number<br/>
                to verify your identity and continue.
              </div>
            </div>
            <div className="forgot-password-right">
              <form className="otp-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="otp-inputs" style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value.replace(/[^0-9]/g, ''))}
                      required
                      style={{
                        width: 64,
                        height: 64,
                        fontSize: 32,
                        textAlign: 'center',
                        borderRadius: 12,
                        border: '1px solid #eee',
                        background: '#f8faff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      }}
                    />
                  ))}
                </div>
                <button
                  className="verify-otp-btn"
                  type="submit"
                  disabled={loading}
                  style={{
                    width: 360,
                    height: 56,
                    background: '#4747e6',
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 14,
                    cursor: 'pointer',
                    marginTop: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
