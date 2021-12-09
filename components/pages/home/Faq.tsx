import React, { useState } from "react";

const faqData = [
  {
    q: "What is this project?",
    a: "Fantom Freidos is primarily about community and creating a new community of Freido holders. We're an NFT project releasing on the Fantom network soon! The Freido NFT is at the core a generative PFP token. But this token will grant you access to this discord post launch. It will grant you access to exclusive art airdrops, competitions, giveaways and much more! Our plans are to make the BAYC of Fantom and have the biggest froggie family, croak croak!",
  },
  {
    q: "Community Fund???",
    a: "The final stage in our V1.0 Roadmap ends with the allocation of 10% of the mint revenue to a multisig community wallet. The wallet will be used for development of the FredioVerse and create unique benefits for hodling you Fredio/s. There will also be a 5% royalty on secondary sales of all Freidos, with 100% of this going back to the community wallet!",
  },
  {
    q: "When mint?",
    a: "The mint is still TBA but the timeframe we have is a full release before December 1st.",
  },
  {
    q: "Token Cost?",
    a: "We've decided on a mint cost of 33 FTM. We hope this price reflects our inclusive ambitions for the project. We want as many people to be able to participate in the FreidoVerse!",
  },
];

function FaqCard({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col w-full  md:w-[820px]  py-4   mb-8 border-b-2 border-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center flex-1">
        <h3 className="text-gray-200 text-xl lg:text-2xl">{q}</h3>
        {isOpen && (
          <img
            className="h-6"
            src="/assets/images/minus.png"
            onClick={() => setIsOpen(false)}
            alt=""
          />
        )}
        {!isOpen && (
          <img
            className="h-6"
            src="/assets/images/plus.png"
            onClick={() => setIsOpen(true)}
            alt=""
          />
        )}
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
      <div className="flex flex-col items-center w-full justify-center">
        {faqData.map((item, index) => (
          <FaqCard a={item.a} q={item.q} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
