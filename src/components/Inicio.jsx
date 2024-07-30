import ChooseUs from "../components/ChooseUs";
import "../styles/WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <div className="inicio">
      <section className="rectangle-parent">
        <img className="frame-child" alt="" src="/rectangle-2605@2x.png" />
        <div className="frame-item" />
      </section>
      <div className="heading-2-why-choose-us-parent">
        <h1 className="heading-2">Why choose us?</h1>
        <p className="vivamus-gravida-magna">
          Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam
          suscipit
        </p>
      </div>
      <ChooseUs />
    </div>
  );
};

export default WhyChooseUs;
