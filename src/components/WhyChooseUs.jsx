import ChooseUs from "./ChooseUs";
import "../styles/WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <div className="choose-container">
      <section className="choose-rectangle-parent">
        <img
          className="choose-frame-child"
          alt=""
          src="/assets/images/choose-bg.png"
        />
        <div className="choose-frame-item" />
      </section>
      <div className="choose-heading-2-why-choose-us-parent">
        <h1 className="choose-heading-2">Why choose us?</h1>
        <p className="choose-vivamus-gravida-magna">
          Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam
          suscipit
        </p>
      </div>
      <ChooseUs />
    </div>
  );
};

export default WhyChooseUs;
