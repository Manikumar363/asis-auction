import React from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";

const EmailDisclaimer = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const pageTitle = "  Disclaimer for Emails";
  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <br />
      <Container
        style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        className="text-start"
      >
        <br />
        <h4>AS IS AUCTIONS PTY LTD (ABN 92 672 843 775) </h4>
        <span>
          The contents of this email are confidential and for the intended
          recipient only. If you have received this email in error, please
          delete it.
          <br /> Our liability for information contained in this email is
          limited in accordance with our commercial agreements with you, and the
          terms and conditions on our website: [insert website URL] We’ll never
          email you about a change to our bank account details. If you receive
          an email requesting payment into a different As Is Auctions bank
          account, please don’t make any payments before calling us on [insert
          number].
        </span>
      </Container>
    </Layout>
  );
};

export default EmailDisclaimer;
