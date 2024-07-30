import React from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";

const PrivacyNotice = () => {
  const pageTitle = "Privacy Collection Notice";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <br />
      <Container
        style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        className="text-start privacy-notice"
      >
        <div className="p-3" style={{ backgroundColor: "#D7FAF8" }}>
          <h5 className="text-uppercase">
            Explanatory note on using this document (delete before sharing
            externally)
          </h5>
          <p>
            Under the Privacy Act 1988 (Cth), it is a requirement that where we
            collect personal information about an individual, we must take
            reasonable steps either to notify the individual of certain matters
            or to ensure the individual is aware of those matters.
          </p>

          <p>
            As Is Auctions is required to take such steps as are reasonable in
            the circumstances to provide this Notice or otherwise ensure an
            individual is made aware of the matters covered in this Notice, at
            or before the time or, if that is not practicable, as soon as
            practicable after, As Is Auctions collects an individual’s personal
            information. This is regardless of whether the personal information
            has been collected directly from an individual (with or without
            their knowledge) or from a third party.
          </p>

          <p>
            This Notice must be adapted to particular situations;
            <span className="font-weight-bold">
              a generic collection notice to cover all situations in which As Is
              Auctions collects personal information is not sufficient
            </span>
            . However, a generic collection notice for a particular category may
            be appropriate (e.g., where personal information is collected in the
            course of allowing account set up for the auction platform).
            Additionally, if a Notice is provided to an individual related to
            one set of circumstances where their personal information is
            collected but then As Is Auctions collects personal information of
            an individual in other circumstances, an additional Notice will need
            to be provided which applies to those circumstances.
          </p>
        </div>
        <div>
          <p className="text-end">Effective as of 30 November 2023.</p>
          <h5>PERSONAL INFORMATION COLLECTION NOTICE</h5>
          <ol>
            <li>
              <h6>INTRODUCTION</h6>
              <p>
                This Personal Information Collection Notice{" "}
                <span className="font-weight-bold">(Notice)</span> is provided
                to you by{" "}
                <span className="font-weight-bold">
                  AS IS AUCTIONS PTY LTD (ABN 92 672 843 775) (As Is Auctions,
                  our, we or us){" "}
                </span>
                to notify you of certain matters related to how we collect,
                handle and disclose your Personal Information as required under
                the Privacy Act 1988 (Cth)
                <span className="font-weight-bold">(Privacy Act)</span>.
              </p>
              <p>
                When we refer to “Personal Information”, we mean:
                <br />
                <span className="font-italic">
                  Information or an opinion about an identified individual, or
                  an individual who is reasonably identifiable:
                </span>
                <br />{" "}
                <ol type="a" className="font-italic">
                  <li>whether the information or opinion is true or not;</li>
                  <li>
                    and whether the information or opinion is recorded in a
                    material form or not.
                  </li>
                </ol>
              </p>
            </li>
            <li>
              <h6>NOTICE OF COLLECTION</h6>
              <p>
                Where you have been provided this Notice by us, we have done so
                to notify you that we have collected, or will be collecting,
                your Personal Information.
              </p>
            </li>
            <li>
              <h6>HOW WE COLLECT/HAVE COLLECTED PERSONAL INFORMATION</h6>
              <p>
                <ol type="a">
                  <li>
                    We have collected your Personal Information
                    <ol type="i">
                      <li>
                        from the online registration form you completed on our
                        website to set up an account; and
                      </li>
                      <li>
                        from a third-party firm we have engaged to seek
                        potential customers of As Is Auctions.
                      </li>
                    </ol>
                  </li>
                  <li>
                    If we have not yet collected your Personal Information, then
                    we will be collecting your Personal Information:
                    <ol type="i">
                      <li>
                        from web analytics tools, ‘cookies’ or other similar
                        tracking technologies that allow us to track and analyse
                        your website usage. Cookies are small files that store
                        information on your computer, mobile phone or other
                        device and enable and allow the creator of the cookie to
                        identify when you visit different websites;
                      </li>
                      <li>
                        from the online registration form you completed on our
                        website to set up an account ; and
                      </li>
                      <li>
                        from a third-party firm we have engaged to seek
                        potential customers of As Is Auctions.
                      </li>
                    </ol>
                  </li>
                </ol>
              </p>
            </li>
            <li>
              <h6>PURPOSE OF COLLECTION</h6>
              <p>
                WHY ARE WE COLLECTING YOUR PERSONAL INFORMATION?
                <br />
                We are collecting your Personal Information for the following
                purposes:
              </p>
              <p>
                <ol type="a">
                  <li>
                    as part of your engagement of us to provide services to you,
                    so that we may verify your identity;
                  </li>
                  <li>
                    to improve and optimise our service offering, client
                    experience and website usability; and
                  </li>
                  <li>for any other purposes set out in our Privacy Policy.</li>
                </ol>
              </p>
            </li>
            <li>
              <h6>consequences if personal information is not collected</h6>
              <p>
                Without your Personal Information we may not be able to:
                <ol type="a">
                  <li>
                    consider an application to register an account on our
                    website as we are unable to verify your identity;{" "}
                  </li>
                  <li>
                    ensure that we provide an easy-to-use website experience for
                    you and provide you with relevant information about ours
                    goods and services; nor
                  </li>
                  <li>provide our services to you fully and appropriately.</li>
                </ol>
              </p>
            </li>
            <li>
              <h6>DISCLOSURE OF PERSONAL INFORMATION</h6>
              <p>
                We usually disclose Personal Information of the kind we
                have/will collect from you to our professional advisors such as
                third-party identity verifier, lawyers, accountants and
                auditors.
              </p>
            </li>

            <li>
              <p>
                <h6>OUR PRIVACY POLICY</h6>
                <ul>
                  <li>Our Privacy Policy contains details regarding how:</li>
                  <ol>
                    <li>We handle Personal Information;</li>
                    <li>
                      You may complain about a breach of the Australian Privacy
                      Principles contained in the Privacy Act or a registered
                      code which binds us and how we deal with such a complaint;
                      and
                    </li>
                    <li>
                      You can access your Personal Information and seek its
                      correction.
                    </li>
                  </ol>
                  <li>
                    You can find our Privacy Policy at [insert] or contact us
                    via the details below to receive a copy.
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <p>
                {" "}
                <h6>HOW TO CONTACT US</h6>
                <ul>
                  <li>
                    If you have any questions relating to how we handle Personal
                    Information, please contact us using the details set out
                    below:
                  </li>
                  <ul>
                    <li>Privacy Officer: [insert]</li>
                    <li>Email: [insert]</li>
                    <li>Phone: [insert]</li>
                    <li>Address: [insert]</li>
                  </ul>
                </ul>
              </p>
            </li>
          </ol>
        </div>
      </Container>
    </Layout>
  );
};

export default PrivacyNotice;
