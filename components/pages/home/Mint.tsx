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
    <div className="flex font-halloweek flex-col relative items-center  w-full py-16 ">
      <div className="flex items-center">
        <img src="/assets/images/minus.png" alt="" />
        <span className="text-7xl font-vt323 text-gray-300 px-8">5</span>
        <img src="/assets/images/plus.png" alt="" />
      </div>
      <div className="text-white text-4xl px-6 py-2 border-2 mt-12 border-white rounded-md">
        MINT
      </div>
      <span className="text-6xl lg:text-7xl font-vt323 text-gray-300 py-8 px-8">
        66/1111
      </span>
    </div>
  );
}

export default Mint;
