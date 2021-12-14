import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { trimAddress } from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Footer from "../components/pages/home/Footer";

import { getOwnedIDs } from "../utils/functions/FriedoFunctions";
import { FRIEDO_ABI, FRIEDO_ADDRESS } from "../utils/contracts/FriedoContract";
import Nav from "../components/Nav";
import { finalmeta } from "../utils/traitsfinal";

declare let window: any;

const Wallet: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);
  const [myFreidos, setMyFreidos] = useState([]);

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

    const addr = await signer.getAddress();

    const ownedIds = await getOwnedIDs(frideoContract, addr);
    setMyFreidos(ownedIds);

    setContextState({
      ...contextState,
      addr,
      isLoading: false,
      isConnected: true,
      frideoContract,
      frideoContractSigner,
    });
  }

  return (
    <main>
      <Nav />
      <div className=" bg-bg items-center justify-center flex max-w-[100vw] ">
        <Head>
          <title>Freidos Owned </title>
          <meta name="description" content="View all your Freidos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="font-vt323 min-h-screen flex flex-col items-center justify-center max-w-screen-xl py-12">
          <Nav />
          <div className="flex flex-col flex-1 mt-24 px-4 bg-black/30 border-2 border-white/70 w-[90vw] h-full rounded-xl">
            <div className="text-4xl font-bold text-white text-center py-12">
              Freidos Owned
            </div>
            {contextState.isLoading && (
              <div className="flex items-center justify-center text-3xl font-bold text-white h-full">
                Loading....
              </div>
            )}
            {contextState.isConnected && myFreidos.length == 0 && (
              <div className="flex items-center justify-center text-3xl font-bold text-white flex-1 mb-12 text-center">
                You don't own any Freidos
              </div>
            )}

            {!contextState.isLoading && myFreidos.length != 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
                {myFreidos.map((freido, index) => (
                  <div
                    className="bg-bg font-vt323 rounded-xl relative min-h-[300px] max-w-[80vw]"
                    key={index}
                  >
                    <div className="p-4 bg-white/80 text-bg text-xl z-20 absolute top-0 right-0">
                      #{freido}
                    </div>
                    <div>
                      <img src={finalmeta[parseInt(freido)].image} alt="" />
                    </div>
                    <div className="py-4 px-2 text-white text-center text-3xl">
                      {finalmeta[parseInt(freido)].name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </main>
  );
};

export default Wallet;
