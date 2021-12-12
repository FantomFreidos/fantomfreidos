import React from "react";

function Lore() {
  return (
    <div className="flex items-center flex-col  px-8" id="lore">
      <span className="text-3xl lg:text-4xl text-fg font-whacky uppercase mb-20">
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
        <div className="flex flex-col flex-[2] items-start mt-8 text-center lg:text-left justify-center lg:mr-12">
          <span className="text-fg  text-sm lg:text-xl font-whacky mb-8">
            The first community driven storytelling experience on Fantom
          </span>
          <span className="flex-1 text-gray-200 lg:pr-24 text-lg ">
            We’ve created the Stake to Storytelling mechanism around the idea of
            a community driven Freido multiverse. Not to be confused with a
            MetaVerse, the multiverse means that all NFTs are different versions
            of the same lovable frog - Freido. Take part in this epic tale by
            minting and staking your very own Freidos. Once staked, holders will
            be able to create new adventures and storylines all funded via the
            community fund.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Lore;
