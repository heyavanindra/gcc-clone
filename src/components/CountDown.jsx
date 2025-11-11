"use client";

import Countdown from 'react-countdown';

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Time&apos;s up!</span>;
  } else {
    return (
      <div className="flex space-x-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{hours}</span>
          <span className="text-sm">HOURS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{minutes}</span>
          <span className="text-sm">MINUTES</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{seconds}</span>
          <span className="text-sm">SECONDS</span>
        </div>
      </div>
    );
  }
};

function CountDown({ date }) {

  const countdownDate = new Date(date);

  return (
    <Countdown
      className="countDown"
      date={countdownDate}
      renderer={renderer}
    />
  );
}

export default CountDown;
