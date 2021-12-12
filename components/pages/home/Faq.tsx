import React, { useState } from "react";

const faqData = [
  {
    q: "What is this project about?",
    a: "The Fantom Freido Club is about NFTs, stories and most importantly, community. Freido is a semi-generative NFT that gives its holders regular airdropped comics, lotteries for ultra rare 1/1 NFTs and the chance to write the main story for the FreidoVerse. 2,222 Freido will be discovered on the 14th when the portal opens for all...",
  },
  {
    q: "Community Fund???",
    a: "The community fund will be available to the team and Freido holders. We can use this fund to create comics, stories and other Freido content. 10% of the revenue received during mint will go to this fund. 5% of each secondary sale is paid directly to the fund as well meaning all royalties go back to the community.",
  },
  {
    q: "When mint?",
    a: "TFreido is touching down on the 14th of December!.",
  },
  {
    q: "What is the Cost and total supply?",
    a: "2,222 Freidos will be available on the 14th for 33FTM each. Each one is unique and gives holders loads of long term value!",
  },
];

function FaqCard({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col w-[85vw]  max-w-[820px] py-4 mb-8 border-b-2 border-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center ">
        <h3 className="text-gray-200 text-xl lg:text-2xl">{q}</h3>
        {isOpen && <span className="text-fg text-xl font-whacky">-</span>}
        {!isOpen && <span className="text-fg text-xl font-whacky">+</span>}
      </div>
      {isOpen && <p className="text-gray-300 mt-4 text-xl">{a}</p>}
    </div>
  );
}

function Faq() {
  return (
    <div
      className=" flex flex-col items-center py-16 px-4 select-none w-full"
      id="faq"
    >
      <span className="text-4xl lg:text-5xl text-fg font-whacky uppercase my-20">
        Faq
      </span>
      <div className="flex flex-col items-center w-full justify-center px-4">
        {faqData.map((item, index) => (
          <FaqCard a={item.a} q={item.q} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
