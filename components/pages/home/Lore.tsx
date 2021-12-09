import React from "react";

function Lore() {
  return (
    <div className="flex items-center flex-col  px-8">
      <span className="text-4xl lg:text-5xl text-fg font-whacky uppercase my-20">
        Lore
      </span>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center">
        <div className="flex-1 ">
          <img
            className=" w-full "
            src="/assets/images/Friedo/Freido_rand6.png"
            alt=""
          />
        </div>
        <div className="flex-[2] items-center mt-8 text-center lg:text-left justify-center">
          <span className="flex-1 text-gray-200 lg:pr-24 text-lg ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            minima voluptatibus rem fuga rerum inventore ipsum nihil porro
            doloremque error voluptates, esse distinctio numquam odio,
            aspernatur neque! Tenetur.Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Ducimus minima voluptatibus rem fuga rerum
            inventore ipsum nihil porro doloremque error voluptates, esse
            distinctio numquam odio, aspernatur neque! Tenetur.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Lore;
