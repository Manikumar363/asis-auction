import PropTypes from "prop-types";
import "../styles/ChooseUs.css";

const ChooseUs = () => {
  return (
    <section className={`choose-frame-parent`}>
      <div className="choose-frame-div">
        <img
          className="choose-location-icons"
          loading="lazy"
          alt=""
          src="/assets/images/choose-pic-1.svg"
        />
        <div className="choose-heading-2-results-of-drivers-group">
          <h3 className="choose-heading-22">Honesty and Reliability</h3>
          <p className="choose-integer-nec-posuere1">
          Here you sell your car as its existing condition so seller knows what they selling and the buyer know what they buying so would be no false description you get what you
          </p>
        </div>
      </div>
      <div className="choose-frame-div">
        <img
          className="choose-location-icons"
          loading="lazy"
          alt=""
          src="/assets/images/choose-pic-2.svg"
        />
        <div className="choose-heading-2-results-of-drivers-group">
          <h3 className="choose-heading-22">Same Day Sale Is Guaranteed</h3>
          <p className="choose-integer-nec-posuere1">
          You can create an auction to end same day, if no-one bids on your vehicle we will offer you to buy it if its in metro area on the same day.
          Time efficiency: Can set to sell your car in any time suits you.
          </p>
        </div>
      </div>
      <div className="choose-frame-div">
        <img
          className="choose-location-icons"
          loading="lazy"
          alt=""
          src="/assets/images/choose-pic-2.svg"
        />
        <div className="choose-heading-2-results-of-drivers-group">
          <h3 className="choose-heading-22">Overnight Activity</h3>
          <p className="choose-integer-nec-posuere1">
          Your auction is active while you are sleep or your bids are active if you have used our Bidbot to bid on your behalf while you are away.
          </p>
        </div>
      </div>
      <div className="choose-frame-div">
        <img
          className="choose-location-icons"
          loading="lazy"
          alt=""
          src="/assets/images/choose-pic-3.svg"
        />
        <div className="choose-heading-2-results-of-drivers-group">
          <h3 className="choose-heading-22">Time efficiency</h3>
          <p className="choose-integer-nec-posuere1">
          Can set to sell your car in any time suits you.
          </p>
        </div>
      </div>
      <div className="choose-frame-div">
        <img
          className="choose-location-icons"
          loading="lazy"
          alt=""
          src="/assets/images/choose-pic-4.svg"
        />
        <div className="choose-heading-2-results-of-drivers-group">
          <h3 className="choose-heading-22">Advance Planning</h3>
          <p className="choose-integer-nec-posuere1">
          You can plan ahead and set your auction time and date days before starting.
          </p>
        </div>
      </div>
     
    </section>
  );
};

ChooseUs.propTypes = {
  className: PropTypes.string,
};

export default ChooseUs;
