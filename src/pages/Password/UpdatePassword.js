import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import Layout from "../../components/Layout/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import axios from "../../utils/axios";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const [loading, setLoading] = useState(false);
  // const { token } = useSelector((state) => state.auth);

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
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    }

    return true;
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword } = values;
    setLoading(true);

    try {
      if (handleValidation()) {
        const { data } = await axios.put(
          "/api/user/update-password",
          { oldPassword, newPassword },
          { headers: { Authorization: `${token}` } }
        );

        toast.success(data?.message, toastOptions);

        setValues({
          oldPassword: "",
          newPassword: "",
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
      <Container className=" admin-dashboard">
        <DashboardHeader />
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 admin-details">
            <h3 className=" ">Update Password</h3>
            <div className="card">
              <ReactPlaceholder
                type="text"
                color="#F0F0F0"
                showLoadingAnimation
                rows={5}
                style={{ width: "80%" }}
                ready={!loading}
              >
                <Form onSubmit={handlePwdSubmit} className="password-form">
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">OLD PASSWORD</td>
                        <td>
                          <Form.Control
                            type="password"
                            onChange={handlePwdChange}
                            name="oldPassword"
                            required
                            value={values?.oldPassword}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">NEW PASSWORD</td>
                        <td>
                          <Form.Control
                            type="password"
                            onChange={handlePwdChange}
                            name="newPassword"
                            required
                            value={values?.newPassword}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">CONFIRM PASSWORD</td>
                        <td>
                          <Form.Control
                            type="password"
                            onChange={handlePwdChange}
                            name="confirmPassword"
                            required
                            value={values?.confirmPassword}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="form-sub-sec">
                    <button type="submit" className="advanced-button">
                      Update
                    </button>
                  </div>
                </Form>
              </ReactPlaceholder>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;
