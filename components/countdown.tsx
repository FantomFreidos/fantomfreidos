import React, { useContext } from "react";
import Countdown from "react-countdown";

import { AppContext } from "../context/AppContext";

function CountdownTimer() {
  const { contextState, setContextState } = useContext(AppContext);

  function countdownComplete() {
    const saleStats = 1;
    setContextState({
      ...contextState,
      saleStats,
    });
  }

  const Completionist = () => (
    <span className="text-purple-700 text-4xl mb-4 font-semibold"></span>
  );

  // Renderer callback with condition
  const renderer = ({
    hours,
    minutes,
    seconds,
    days,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="flex flex-col items-center justify-center font-whacky">
          <div className="grid grid-cols-4 gap-2 lg:gap-8 py-4">
            <div className="flex flex-col items-center justify-center">
              <span className=" text-2xl text-fg text-shadow lg:text-3xl lg:tracking-widest">
                {days}
              </span>
              <span className="text-sm lg:text-xl mt-4 text-fg text-shadow  uppercase">
                Days
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className=" text-xl text-fg text-shadow lg:text-3xl lg:tracking-widest">
                {hours > 9 ? hours : "0" + hours}
              </span>
              <span className="text-sm lg:text-xl mt-4 text-fg text-shadow  uppercase">
                Hours
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className=" text-xl text-fg text-shadow lg:text-3xl lg:tracking-widest">
                {minutes > 9 ? minutes : "0" + minutes}
              </span>
              <span className="text-sm lg:text-xl mt-4 text-fg text-shadow  uppercase">
                Mins
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className=" text-xl text-fg text-shadow lg:text-3xl lg:tracking-widest">
                {seconds > 9 ? seconds : "0" + seconds}
              </span>
              <span className="text-sm lg:text-xl mt-4 text-fg text-shadow  uppercase">
                Secs
              </span>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <span className="text-blackish text-3xl mb-4 font-semibold">
        <Countdown
          date={1639490400000}
          onComplete={countdownComplete}
          renderer={renderer}
        />
      </span>
    </div>
  );
}

export default CountdownTimer;
