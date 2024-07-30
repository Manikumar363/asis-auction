import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer.js";
// import Headerr from "../Header.js";
import PreviewHeader from "../PreviewHeader.js";
import SocialHeader from "../SocialHeader.js";
import Header2 from "../Header2.js";
import Headerr from "../Header.js";

const Layout = ({ children, title, description, keywords }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SocialHeader />
      <PreviewHeader />
     <Headerr/>
      <main>
        {children}
        <ToastContainer position="top-center" />
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Your Company",
  description: "Products",
  keywords: "Mern ,node,react,express,",
};
export default Layout;
