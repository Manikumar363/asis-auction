import React from "react";

const Timer = ({ timer, status }) => {
  let statusMessage;

  if (status === "closed") {
    statusMessage = <p className="text-danger font-weight-bold"></p>;
  } else if (status === "inactive") {
    statusMessage = (
      <p className="text-muted font-weight-bold">
        Will Start after! {timer.days} days, {timer.hours} hours,{" "}
        {timer.minutes} minutes, {timer.seconds} seconds
      </p>
    );
  } else if (status === "active") {
    if (timer.days > 1) {
      statusMessage = (
        <p className="text-success font-weight-bold">
          Ongoing,
          <span>
            {" "}
            will be close in {timer.days} days, {timer.hours} hours,{" "}
            {timer.minutes} minutes, {timer.seconds} seconds
          </span>
        </p>
      );
    } else if (timer.days === 1) {
      statusMessage = (
        <p className="text-success font-weight-bold">
          Closes Soon!
          <span>
            {timer.days} day, {timer.hours} hours, {timer.minutes} minutes,{" "}
            {timer.seconds} seconds
          </span>
        </p>
      );
    } else if (timer.days === 0) {
      statusMessage = (
        <p className="text-danger font-weight-bold">
          Hurry Up!
          <span>
            {timer.hours} hours, {timer.minutes} minutes, {timer.seconds}{" "}
            seconds
          </span>
        </p>
      );
    }
  }

  return <div>{statusMessage}</div>;
};

export default Timer;
