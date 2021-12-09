function Attributes() {
  return (
    <div className="flex items-center justify-center w-full flex-col lg:flex-row py-8 px-8 ">
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
        <span className="text-4xl lg:text-5xl text-fg font-whacky uppercase my-20">
          Attributes
        </span>
        <span className="text-gray-200 text-lg lg:text-2xl text-center lg:text-left">
          Freido is hand crafted and all attributes have been carefully thought
          out. with over 70 unique attributes there are thousands of possible
          Friedo’s to find.
        </span>
      </div>
    </div>
  );
}

export default Attributes;
