
import "../styles/global.css";
import "../styles/Frame.css";
import { VectorDesignIcon } from "./icons";

const steps = [
  {
    number: "1",
    title: "Seller",
    img: "/assets/images/seller.png",
    desc:
      "We will charge the buyer $100 fixed rate for administration fee for any cars. Once the buyer won any auction or holds the highest bid regardless of reaching the asked price of the seller then buyer has to wait for seller to confirm the Sales after Auction overs, or seller might not. Buyer will be BAN from using the platform if fails to do the payment and disobey the platform rules",
  },
  {
    number: "2",
    title: "Us",
    img: "/assets/images/us.png",
    desc:
      "When Seller and Buyer done the payment then we will exchange the details of Seller & Buyer to get in touch with each other and complete their deal outside this platform we work as a platform and we are not in contact for your deal so pls make sure to check your vehicle thoroughly how ever everything will be sold as is, which means its ( existing condition ) but we encourage the users to pay more attention. All the payments are in AUD and will be done outside of this platform and its done by ( PayPal ) so we have no access to your Credit card details and your Bank Account.",
  },
  {
    number: "3",
    title: "Buyer",
    img: "/assets/images/buyer.png",
    desc:
      "We will charge the seller %10 of the sales price for providing the service. Seller will upload a vehicle and create an Auction by their own. If seller disobey the rule of this platform and didn’t confirm the sale which has reached its asking price after auction done then seller will be BAN from this platform for a period of time.",
  },
];

const Frame = () => {
  return (
    <div className="howitworks-root">
      <div className="howitworks-bg-corner top-right" />
      <div className="howitworks-bg-corner bottom-right" />
      <h1 className="howitworks-title">
        How It <span className="howitworks-highlight">Works</span>?
      </h1>
      {/* Use the imported icon for the blue curve */}
      <VectorDesignIcon className="howitworks-steps-curve" />
      <div className="howitworks-steps-container">
        {/* Seller */}
        <div className="howitworks-step howitworks-step-seller">
          <div className="howitworks-step-number">1</div>
          <img className="howitworks-step-img" src={steps[0].img} alt="Seller" />
          <div className="howitworks-step-title">{steps[0].title}</div>
          <div className="howitworks-step-desc">{steps[0].desc}</div>
        </div>
        {/* Us */}
        <div className="howitworks-step howitworks-step-us">
          <div className="howitworks-step-number">2</div>
          <img className="howitworks-step-img" src={steps[1].img} alt="Us" />
          <div className="howitworks-step-title">{steps[1].title}</div>
          <div className="howitworks-step-desc">{steps[1].desc}</div>
        </div>
        {/* Buyer */}
        <div className="howitworks-step howitworks-step-buyer">
          <div className="howitworks-step-number">3</div>
          <img className="howitworks-step-img" src={steps[2].img} alt="Buyer" />
          <div className="howitworks-step-title">{steps[2].title}</div>
          <div className="howitworks-step-desc">{steps[2].desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Frame;