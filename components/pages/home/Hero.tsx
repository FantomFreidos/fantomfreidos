import React from "react";
import CountdownTimer from "../../countdown";

function Hero() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-between py-20 px-4 lg:px-8 bg-hero bg-cover bg-center  relative  ">
      <div className="flex flex-col space-y-4 lg:space-y-8 text-fg text-shadow text-[32px] lg:text-7xl font-whacky text-center">
        <span>Welcome to</span> <span>the</span> <span>FREIDOVERSE</span>
      </div>
      <div className="flex flex-col items-center bg-gray-800/40 lg:px-8 rounded-xl">
        <span className="text-4xl text-shadow lg:text-5xl text-center text-fg font-whacky  my-8">
          Portal Opening in
        </span>
        <CountdownTimer />
      </div>
    </div>
  );
}

export default Hero;
