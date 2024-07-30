import React, { useState } from "react";
import "./styles.css"; // Import your CSS file

const DateInput = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleInputChange = (e, nextInput) => {
    const { value } = e.target;

    if (value.length <= 2) {
      setDay(value);
    } else if (value.length <= 4) {
      setDay(value.slice(0, 2));
      setMonth(value.slice(2));
      if (nextInput === "year") {
        document.getElementById("year").focus();
      }
    } else {
      setDay(value.slice(0, 2));
      setMonth(value.slice(2, 4));
      setYear(value.slice(4));
    }
  };

  return (
    <div className="date-input">
      <input
        type="text"
        id="day"
        placeholder="DD"
        maxLength="2"
        value={day}
        onChange={(e) => handleInputChange(e, "month")}
      />
      <span>/</span>
      <input
        type="text"
        id="month"
        placeholder="MM"
        maxLength="2"
        value={month}
        onChange={(e) => handleInputChange(e, "year")}
      />
      <span>/</span>
      <input
        type="text"
        id="year"
        placeholder="YYYY"
        maxLength="4"
        value={year}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Autoflipping Date Input</h1>
      <DateInput />
    </div>
  );
}
