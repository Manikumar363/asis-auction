import React from "react";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";

const About = () => {
  const pageTitle = "About us";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <PageHeading title={pageTitle} />
      <section className="who-is">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="left-content">
                <div className="heading">
                  <h2>About As Is Auctions</h2>
                  <span>Irony distillery fashion axe</span>
                  <p>
                  As is auctions is completely online auction for motor vehicles that let the sellers and buyers to connect with each other directly and as result of it they will have the best value for the vehicle they are selling or buying.
                    <br />
                    
                   
                  </p>
                  <h2>Why We Have Created Such A Platform</h2>
                  <p>We felt the need of such a platform in this kind of market for so many reasons such as:</p>
                    <h5> → Reliability</h5>
                    <p>Everything in this platform will be sold as is which is its existing condition so the users will prepare themselves for worst case scenario so they will bid for what they see and won't hope for better quality if it comes better then it would be a bonus for the buyer this way is completely opposite way of the many other platforms that does anything to attract users to their platform only for their own profit so no quality assurance will be provided here and its pretty straight forward no Dodgy no dishonesty no hidden subject and its all to the users side.</p>
        <h5> → No Middle man</h5>
        <p>All the deals will be outside this platform directly between the seller and the buyer no charges for using this platform if you didn't sell your Vehicle nor bought any Vehicle</p>
         <h5> → Sales Guarantied</h5>
         <p>We will offer you a value to buy your vehicle if no one has bid on your vehicle and we will collect from your place if its in metro area or you have to deliver to one of our places as long as your car is complete no matter if its damaged or were involved in an accident please contact admin to find out our nearest place to your area.</p>
               <h5> → Its all In your Control</h5>
               <p>So its all in your hand, you can upload your vehicle and create an auction for only 1hour or 10 days, you can sell it for the highest bid however if it didn't reach your target value only if the highest bidder confirms it.</p>
               
 <h2>Who We Are</h2>
 <p>We are a South Australian family owned business that have strong background in Auto and Metal Recycling, Construction and innovation, we deal with many different Auctions and that's one of the reasons that we have created this platform just to be more fairer to the people and for our own stock we believe that this platform is a %100 win win.
 </p>
 <h2>Our Services
 </h2>
 <br />
 <h5> → Admin</h5>
 <p>we have terms and conditions and terms of use and everyone using this platform has to follow its terms BUT our way to run our businesses is to run them friendly and more traditionally for better services thats why we have trained admins which will do their best to look after your inquiries in anyway possible</p>
              
              <h5> → Collection</h5>
              <p>We will provide a collection and delivery services in any state based on your location for a fee please contact admin for collection and delivery.</p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="right-content">
                <img src="assets/images/car3.jpg" alt="Car" />
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
