import PropTypes from "prop-types";
import "../styles/ChooseUs.css";
import { TickIcon, TimerIcon, CalendarIcon, SaleIcon, EfficiencyIcon, CityIcon } from "../components/icons";

// Updated layout to match reference image positioning
const features = [
  {
    icon: <TickIcon />,
    title: "HONESTY AND RELIABILITY",
    desc: "Here you sell your car as its existing condition so seller knows what they selling and the buyer know what they buying so would be no false description you get what you",
    angle: 220, // upper left
  },
  {
    icon: <TimerIcon />,
    title: "OVERNIGHT ACTIVITY",
    desc: "Your auction is active while you are sleep or your bids are active if you have used our Bidbot to bid on your behalf while you are away.",
    angle: 320, // upper right
  },
  {
    icon: <SaleIcon />,
    title: "SAME DAY SALE IS GUARANTEED",
    desc: "You can create an auction to end same day, if no-one bids on your vehicle we will offer you to buy it if its in metro area on the same day.",
    angle: 140, // lower left
  },
  {
    icon: <CalendarIcon />,
    title: "ADVANCE PLANNING",
    desc: "You can plan ahead and set your auction time and date days before starting.",
    angle: 40, // lower right
  },
  {
    icon: <EfficiencyIcon />,
    title: "TIME EFFICIENCY",
    desc: "You can set a time that works best for you to sell your car.",
    angle: 90, // bottom center
  }
];

const ChooseUs = () => (
  <div className="chooseus-circle-container">
    {features.map((f, i) => {
      const rad = (f.angle * Math.PI) / 180;
      const x = 50 + Math.cos(rad) * 92; // Increased radius from 44 to 52
      const y = 50 + Math.sin(rad) * 52; // Increased radius from 44 to 52
      return (
        <div
          className="chooseus-feature"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)"
          }}
          key={i}
        >
          <span className="chooseus-feature-icon">{f.icon}</span>
          <div className="chooseus-feature-content">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        </div>
      );
    })}
  </div>
);

ChooseUs.propTypes = {
  className: PropTypes.string,
};

export default ChooseUs;