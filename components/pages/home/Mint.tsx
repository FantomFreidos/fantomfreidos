import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { buyFriedo, getSupply } from "../../../utils/functions/FriedoFunctions";

function Mint() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { contextState, setContextState } = useContext(AppContext);

  function increment() {
    if (buyAmount < 10) {
      setBuyAmount(buyAmount + 1);
    }
  }
  function decrement() {
    if (buyAmount > 1) {
      setBuyAmount(buyAmount - 1);
    }
  }

  type Popup = {
    isLoading: boolean;
    message: string;
    isError: boolean;
    txHash: string;
    show: boolean;
  };

  async function handleMint() {
    const popupState: Popup = {
      isLoading: true,
      isError: false,
      message: "",
      txHash: "",
      show: true,
    };
    setContextState({
      ...contextState,
      popupState,
    });
    try {
      const txHash = await buyFriedo(
        contextState.frideoContractSigner,
        contextState.price,
        buyAmount
      );
      console.log("minting");
      const currentSupply = await getSupply(contextState.frideoContract);
      const popupState: Popup = {
        isLoading: false,
        isError: false,
        message: "",
        txHash: txHash,
        show: true,
      };
      setContextState({
        ...contextState,
        popupState,
        currentSupply,
      });
    } catch (e: any) {
      let message = e.message;
      if (e.data) {
        message = e.data.message;
      }
      const popupState: Popup = {
        isLoading: false,
        isError: true,
        message: message,
        txHash: "",
        show: true,
      };
      setContextState({
        ...contextState,
        popupState,
      });
    }
  }

  return (
    <div
      className="flex justify-center flex-col relative items-center  w-full py-16 "
      id="mint"
    >
      <h1 className="text-xl lg:text-4xl text-center font-whacky text-fg mb-12">
        Mint a Freido
      </h1>
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center  text-5xl text-center font-bold font-whacky text-fg w-32">
          {buyAmount}
        </div>

        <div className="flex flex-col space-y-2 font-whacky text-lg">
          <div
            className="w-10 h-10  text-bg select-none bg-fg hover:text-white hover:bg-gray-700  flex items-center justify-center mb-2 font-bold p-2 rounded-lg cursor-pointer"
            onClick={() => increment()}
          >
            +
          </div>
          <div
            className="w-10 h-10 text-bg select-none bg-fg hover:text-white hover:bg-gray-700  flex items-center justify-center font-bold p-2 rounded-lg cursor-pointer"
            onClick={() => decrement()}
          >
            -
          </div>
        </div>
      </div>
      <div className="text-lg mt-8 text-fg font-whacky">
        <span className="">You Pay: </span>
        <span>{buyAmount * 33} FTM</span>
      </div>

      {/* Mint Button */}
      <div
        className="flex items-center justify-center bg-hallow rounded-md py-2 mt-2 px-12 cursor-pointer"
        onClick={handleMint}
      >
        <span className="text-xl text-bg bg-fg flex items-center justify-center hover:text-white hover:bg-gray-700 font-whacky uppercase px-20 py-2 rounded-sm">
          Mint
        </span>
      </div>

      <span className="text-xl lg:text-3xl font-whacky text-fg py-8 px-8">
        0/2222
      </span>
    </div>
  );
}

export default Mint;
