import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  hashToLink,
  metadataFromUri,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Popup from "../components/Popup";
import Hero from "../components/pages/home/Hero";
import Mint from "../components/pages/home/Mint";
import Footer from "../components/pages/home/Footer";
import { FRIEDO_ABI, FRIEDO_ADDRESS } from "../utils/contracts/FriedoContract";

import {
  buyFriedo,
  buyWhitelistFriedo,
  freeMint,
  freeMintBal,
  getPrice,
  getSupply,
  saleStatus,
} from "../utils/functions/FriedoFunctions";
import Roadmap from "../components/pages/home/Roadmap";
import Lore from "../components/pages/home/Lore";
import Faq from "../components/pages/home/Faq";
import Attributes from "../components/pages/home/Attributes";
import PopupBody from "../components/pages/home/PopupBody";
import Nav from "../components/Nav";

declare let window: any;

type Popup = {
  isLoading: boolean;
  message: string;
  isError: boolean;
  txHash: string;
  show: boolean;
};

const Presale: NextPage = () => {
  const [buyAmount, setBuyAmount] = useState(1);
  const [hasFreeMint, setHasFreeMint] = useState(false);
  const { contextState, setContextState } = useContext(AppContext);

  function increment() {
    if (buyAmount < 3) {
      setBuyAmount(buyAmount + 1);
    }
  }
  function decrement() {
    if (buyAmount > 1) {
      setBuyAmount(buyAmount - 1);
    }
  }

  useEffect(() => {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    connectWallet();
    window.ethereum.on("accountsChanged", () => {
      connectWallet();
    });

    window.ethereum.on("chainChanged", () => {
      document.location.reload();
    });
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    const addr = await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    const frideoContract = new ethers.Contract(
      FRIEDO_ADDRESS,
      FRIEDO_ABI,
      provider
    );
    const frideoContractSigner = new ethers.Contract(
      FRIEDO_ADDRESS,
      FRIEDO_ABI,
      signer
    );

    const price = await getPrice(frideoContract);
    const currentSupply = await getSupply(frideoContract);
    const hasfree = await freeMintBal(frideoContract, addr[0]);
    setHasFreeMint(hasfree);

    // let saleStats = isPaused ? 0 : 1;

    setContextState({
      ...contextState,
      price,
      currentSupply,
      frideoContract,
      frideoContractSigner,
      addr: addr[0],
      isLoading: false,
      isConnected: true,
    });
  }

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
      const txHash = await buyWhitelistFriedo(
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
  async function handleFreeMint() {
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
      const txHash = await freeMint(contextState.frideoContractSigner);
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
    <div className="font-vt323 bg-bg items-center justify-center flex overflow-x-hidden py-12">
      <Head>
        <title>Fantom Freido</title>
        <meta name="description" content="Welcome to the Friedoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center relative max-w-screen-xl">
        <Nav />
        {hasFreeMint && (
          <div className="flex flex-col items-center justify-center mt-20 bg-gray-400/20 lg:px-8 rounded-xl border border-white/20 py-12">
            <span className="text-2xl text-white">
              You're eligible for a free mint!
            </span>
            <div
              className="flex items-center justify-center bg-hallow rounded-md py-2 mt-2 px-12 cursor-pointer"
              onClick={handleFreeMint}
            >
              <span className="text-lg text-bg bg-fg flex items-center justify-center hover:text-white hover:bg-gray-700 font-whacky uppercase px-8 py-2 rounded-sm">
                FreeMint
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-center flex-col relative items-center  w-full py-16 sc-pd ">
          <h1 className="text-xl lg:text-4xl text-center font-whacky text-fg mb-12">
            Mint a Freido
          </h1>
          <div className="flex flex-col items-center justify-center bg-gray-400/20 lg:px-8 rounded-xl border border-white/20 py-8 px-4 ">
            <div className="flex items-center justify-center ">
              <div className="flex items-center justify-center  text-8xl text-center font-bold text-fg w-32">
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
              <span className="text-lg text-bg bg-fg flex items-center justify-center hover:text-white hover:bg-gray-700 font-whacky uppercase px-20 py-2 rounded-sm">
                PreMint
              </span>
            </div>

            <span className="text-xl lg:text-3xl font-whacky text-fg py-8 px-8">
              {contextState.currentSupply}/2222
            </span>
          </div>
        </div>

        <Popup>
          <PopupBody />
        </Popup>
      </main>
    </div>
  );
};

export default Presale;
