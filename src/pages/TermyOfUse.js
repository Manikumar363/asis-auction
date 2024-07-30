import React from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";

const TermyOfUse = () => {
  const pageTitle = "Website Terms of Use";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <PageHeading title={pageTitle} />

      <Container
        style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        className="text-start mt-5"
      >
        <ul className="mt-5" style={{}}>
          <li>
            <h4>INTRODUCTION</h4>
          
            <span>
              (a) These terms and conditions (Terms) apply when you use this
              website, [insert URL] (Website).
              <br />
              (b) You agree to be bound by these Terms which form a binding
              contractual agreement between you and us, AS IS AUCTIONS PTY LTD
              (ABN 92 672 843 775) (As Is Auctions, our, we or us).
              <br />
              (c) If you don’t agree to these Terms, you must refrain from using
              the Website.
              <br />
              (d) We may change these Terms at any time by updating this page of
              the Website, and your continued use of the Website following such
              an update will represent an agreement by you to be bound by the
              Terms as amended.
            </span>
          </li>
          <li>
            <h4 className="mt-2"> ACCESS AND USE OF THE WEBSITE</h4>

          
            <span>
              You must only use the Website in accordance with these Terms and
              any applicable laws, and must ensure that your employees,
              sub-contractors and any other agents who use or access the Website
              comply with the Terms and any applicable laws.
            </span>
          </li>
          <li>
            <h4 className="mt-3"> YOUR OBLIGATIONS</h4>
            
            <span>
              You must not:
              <br />
              (a) copy, mirror, reproduce, translate, adapt, vary, modify, sell,
              decipher or decompile any part or aspect of the Website without
              our express consent;
              <br />
              (b) use the Website for any purpose other than the purposes of
              browsing, selecting or purchasing goods;
              <br />
              (c) use, or attempt to use, the Website in a manner that is
              illegal or fraudulent or facilitates illegal or fraudulent
              activity;
              <br />
              (d) use, or attempt to use, the Website in a manner that may
              interfere with, disrupt or create undue burden on the Website or
              the servers or networks that host the Website;
              <br />
              (e) use the Website with the assistance of any automated scripting
              tool or software;
              <br />
              (f) act in a way that may diminish or adversely impact our
              reputation, including by linking to the Website on any other
              website; and
              <br />
              (g) attempt to breach the security of the Website, or otherwise
              interfere with the normal functions of the Website, including by:
              <br />
              (i) gaining unauthorized access to Website accounts or data;
              <br />
              (ii) scanning, probing or testing the Website for security
              vulnerabilities;
              <br />
              (iii) overloading, flooding, mail bombing, crashing or submitting
              a virus to the Website; or
              <br />
              (iv) instigating or participating in a denial-of-service attack
              against the Website.
            </span>
          </li>{" "}
          <li>
            <h4 className="mt-3"> INFORMATION ON THE WEBSITE</h4>

            <span>
              While we will use our best endeavors to ensure the Website is as
              up-to-date and accurate as possible, you acknowledge and agree
              that from time to time, you may encounter the following issues:
              <br />
              (a) the Website may have errors or defects;
              <br />
              (b) the Website may not be accessible at times;
              <br />
              (c) messages sent through the Website may not be delivered
              promptly, or delivered at all;
              <br />
              (d) information you receive or supply through the Website may not
              be secure or confidential; or
              <br />
              (e) any information provided through the Website may not be
              accurate or true.
              <br />
              We reserve the right to change any information or functionality on
              the Website by updating the Website at any time without notice,
              including product descriptions, prices and other Website Content.
            </span>
          </li>
          <li>
            <h4 className="mt-3"> INTELLECTUAL PROPERTY</h4>

           
            <span>
              (a) We retain ownership of the Website and all materials on the
              Website (including text, graphics, logos, design, icons, images,
              sound and video recordings, pricing, downloads and software)
              (Website Content) and reserves all rights in any intellectual
              property rights owned or licensed by it not expressly granted to
              you.
              <br />
              (b) You may make a temporary electronic copy of all or part of the
              Website for the sole purpose of viewing it. You must not otherwise
              reproduce, transmit, adapt, distribute, sell, modify or publish
              the Website or any Website Content without prior written consent
              from us or as permitted by law.
            </span>
          </li>
          <li>
            <h4 className="mt-3"> LINKS TO OTHER WEBSITES</h4>

          
            <ol type="a">
              <li>
                The Website may contain links to other websites that are not our
                responsibility. We have no control over the content of the
                linked websites and we are not responsible for it.
              </li>

              <li>
                Inclusion of any linked website on the Website does not imply
                our approval or endorsement of the linked website.
              </li>
            </ol>
          </li>
          <li>
            <h4 className="mt-3">SECURITY</h4>

         
            <span>
              We do not accept responsibility for loss or damage to computer
              systems, mobile phones or other electronic devices arising in
              connection with use of the Website. You should take your
              precautions to ensure that the process that you employ for
              accessing the Website does not expose you to risk of viruses,
              malicious computer code or other forms of interference.
            </span>
          </li>{" "}
          <li>
            <h4 className="mt-3"> REPORTING MISUSE</h4>

           
            <span>
              If you become aware of misuse of the Website by any person, any
              errors in the material on the Website or any difficulty in
              accessing or using the Website, please contact us immediately
              using the contact details or form provided on our Website.
            </span>
          </li>
          <li>
            <h4 className="mt-3"> PRIVACY</h4>

           
            <span>
              You agree to be bound by our Privacy Policy, which can be found{" "}
              <a href="[insert link]">here</a>.
            </span>
          </li>
          <li>
            <h4 className="mt-1"> LIABILITY</h4>

           

            <span>
              We make no warranties or representations about this Website or any
              of its content and will not be responsible to you or any third
              party for any direct or consequential loss suffered in connection
              with the use of this Website. To the maximum extent permitted by
              law, we each exclude each other from any liability that may arise
              due to your use of our Website and/or the information or materials
              contained on it.
            </span>
          </li>
          <li>
            <h4 className="mt-3"> GENERAL</h4>

            <ol >
              <li style={{marginBottom:"4px"}}>
                <strong> GOVERNING LAW AND JURISDICTION</strong>
                <br />
                This agreement is governed by the law applying in South
                Australia, Australia. Each party irrevocably submits to the
                exclusive jurisdiction of the courts of South Australia,
                Australia and courts of appeal from them in respect of any
                proceedings arising out of or in connection with this agreement.
                Each party irrevocably waives any objection to the venue of any
                legal process on the basis that the process has been brought in
                an inconvenient forum.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> WAIVER</strong>
                <br />
                No party to this agreement may rely on the words or conduct of
                any other party as a waiver of any right unless the waiver is in
                writing and signed by the party granting the waiver.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> SEVERANCE</strong>
                <br />
                Any term of this agreement which is wholly or partially void or
                unenforceable is severed to the extent that it is void or
                unenforceable. The validity and enforceability of the remainder
                of this agreement are not limited or otherwise affected.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> JOINT AND SEVERAL LIABILITY</strong>
                <br />
                An obligation or a liability assumed by, or a right conferred
                on, two or more persons binds or benefits them jointly and
                severally.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> ASSIGNMENT</strong>
                <br />A party cannot assign, novate or otherwise transfer any of
                its rights or obligations under this agreement without the prior
                written consent of the other party.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> ENTIRE AGREEMENT</strong>
                <br />
                This agreement embodies the entire agreement between the parties
                and supersedes any prior negotiation, conduct, arrangement,
                understanding or agreement, express or implied, in relation to
                the subject matter of this agreement.
              </li>

              <li style={{marginBottom:"4px"}}>
                <strong> INTERPRETATION</strong>
                <ol type="a">
                  <li>
                    (singular and plural) words in the singular include the
                    plural (and vice versa);
                  </li>
                  <li>
                    (gender) words indicating a gender include the corresponding
                    words of any other gender;
                  </li>
                  <li>
                    (defined terms) if a word or phrase is given a defined
                    meaning, any other part of speech or grammatical form of
                    that word or phrase has a corresponding meaning;
                  </li>
                  <li>
                    (person) a reference to “person” or “you” includes an
                    individual, the estate of an individual, a corporation, an
                    authority, an association, consortium or joint venture
                    (whether incorporated or unincorporated), a partnership, a
                    trust and any other entity;
                  </li>
                  <li>
                    (party) a reference to a party includes that party’s
                    executors, administrators, successors and permitted assigns,
                    including persons taking by way of novation and, in the case
                    of a trustee, includes any substituted or additional
                    trustee;
                  </li>
                  <li>
                    (this agreement) a reference to a party, clause, paragraph,
                    schedule, exhibit, attachment or annexure is a reference to
                    a party, clause, paragraph, schedule, exhibit, attachment or
                    annexure to or of this agreement, and a reference to this
                    agreement includes all schedules, exhibits, attachments, and
                    annexures to it;
                  </li>
                  <li>
                    (document) a reference to a document (including this
                    agreement) is to that document as varied, novated, ratified,
                    or replaced from time to time;
                  </li>
                  <li>
                    (headings) headings and words in bold type are for
                    convenience only and do not affect interpretation;
                  </li>
                  <li>
                    (includes) the word “includes” and similar words in any form
                    are not words of limitation;
                  </li>
                  <li>
                    (adverse interpretation) no provision of this agreement will
                    be interpreted adversely to a party because that party was
                    responsible for the preparation of this agreement or that
                    provision; and
                  </li>
                  <li>
                    (currency) a reference to $, or “dollar”, is to Australian
                    currency unless otherwise agreed in writing.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ul>
      </Container>
    </Layout>
  );
};

export default TermyOfUse;
