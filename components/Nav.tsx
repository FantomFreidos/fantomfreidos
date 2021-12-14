import React, { useContext } from "react";
import Link from "next/link";
import { trimAddress } from "../utils/functions/utils";
import { AppContext } from "../context/AppContext";
function Nav() {
  const { contextState, setContextState } = useContext(AppContext);
  return (
    <div className="flex items-center justify-between px-4 lg:px-16 py-4 bg-fg fixed top-0 z-30 w-screen shadow-lg">
      <Link href="/">
        <h1 className="text-xs lg:text-lg font-whacky text-bg cursor-pointer">
          Fantom Freido Club
        </h1>
      </Link>
      {/* menu */}
      <div className="flex items-center justify-center font-vt323">
        <div className="space-x-8 items-center justify-center hidden text-2xl flex-1 px-12 lg:flex">
          <Link href="/#mint">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Mint
            </div>
          </Link>
          <Link href="/#attributes">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Attributes
            </div>
          </Link>
          <Link href="/#roadmap">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Roadmap
            </div>
          </Link>
          <Link href="/#lore">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Lore
            </div>
          </Link>
          <Link href="/#faq">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              FAQ
            </div>
          </Link>
          <Link href="/presale">
            <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Presale
            </div>
          </Link>
        </div>

        <div className="px-4 py-2 bg-bg rounded text-fg text-2xl lg:text-3xl cursor-pointer hover:bg-gray-800 mr-2">
          <Link href="/wallet">
            <div className=" cursor-pointer">Wallet</div>
          </Link>
        </div>
        <div className="px-4 py-2 bg-bg rounded text-fg text-2xl lg:text-3xl cursor-pointer hover:bg-gray-800">
          {contextState.addr != "" ? trimAddress(contextState.addr) : "Connect"}
        </div>
      </div>
    </div>
  );
}

export default Nav;
