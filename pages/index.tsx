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

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);

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
    // const frideoContract = new ethers.Contract(
    //   FRIEDO_ADDRESS,
    //   FRIEDO_ABI,
    //   provider
    // );
    // const frideoContractSigner = new ethers.Contract(
    //   FRIEDO_ADDRESS,
    //   FRIEDO_ABI,
    //   signer
    // );

    // const price = await getPrice(frideoContract);
    // const currentSupply = await getSupply(frideoContract);
    // const isPaused = await saleStatus(frideoContract);
    // let saleStats = isPaused ? 0 : 1;
    // if (currentSupply == 4444) {
    //   saleStats = 3;
    // }
    setContextState({
      ...contextState,
      // price,
      // currentSupply,
      // isPaused,
      // saleStats,
      // frideoContract,
      // frideoContractSigner,
      addr: addr[0],
      isLoading: false,
      isConnected: true,
    });
  }

  return (
    <div className="font-vt323 bg-bg items-center justify-center flex overflow-x-hidden">
      <Head>
        <title>Fantom Freido</title>
        <meta name="description" content="Welcome to the Friedoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center relative max-w-screen-xl">
        <Nav />
        <Hero />
        <Mint />
        <Attributes />
        <Roadmap />
        <Lore />
        <Faq />
        <Footer />
        <Popup>
          <PopupBody />
        </Popup>
      </main>
    </div>
  );
};

export default Home;
