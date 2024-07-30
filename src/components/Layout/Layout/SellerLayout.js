import React from "react";
import { Container } from "react-bootstrap";

import PageHeading from "../../../components/Layout/PageHeading";
import Layout from "./Layout";

import SellerMenu from "../../Menu/SellerMenu.js";

const SellerLayout = ({ children, title, description, keywords }) => {
  const pageTitle = "Sell";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <Container className="admin-dashboard mb-4">
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9 admin-details">{children}</div>
        </div>
      </Container>
    </Layout>
  );
};

export default SellerLayout;
