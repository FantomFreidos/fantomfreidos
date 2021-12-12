function Attributes() {
  return (
    <div
      className="flex items-center justify-center w-full flex-col lg:flex-row py-8 px-8 "
      id="attributes"
    >
      <div className="flex-1 flex items-center justify-center lg:p-8 mb-8">
        <div className="grid grid-cols-2 gap-2 ">
          <img
            className=""
            src="/assets/images/friedo/Freido_rand5.png"
            alt=""
          />
          <img
            className=""
            src="/assets/images/friedo/Freido_rand2.png"
            alt=""
          />
          <img
            className=""
            src="/assets/images/friedo/Freido_rand3.png"
            alt=""
          />
          <img
            className=""
            src="/assets/images/friedo/Freido_rand4.png"
            alt=""
          />
        </div>
        {/* <img src="/assets/images/friedos.png" alt="" /> */}
      </div>

      <div className="flex-1 flex flex-col items-start justify-center ">
        <span className=" flex  w-full text-2xl justify-center lg:justify-start text-center lg:text-left lg:text-4xl text-fg font-whacky uppercase my-12 lg:mb-20">
          Attributes
        </span>
        <span className="text-gray-200 text-lg lg:text-2xl text-center lg:text-left">
          Freido has an almost limitless amount of combinations to be found all
          over the Freidoverse. With over 70 unique attributes no two Fredios
          are alike. Each attribute has been meticulously hand crafted to create
          the coolest frogs on the Fantom blockchain. There are some ultra rare
          Freido attributes from blinged out grills to dark and light sparkle
          skinned froggies!.
        </span>
      </div>
    </div>
  );
}

export default Attributes;
