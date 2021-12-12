import React, { useContext } from "react";
import Link from "next/link";
import { trimAddress } from "../utils/functions/utils";
import { AppContext } from "../context/AppContext";
function Nav() {
  const { contextState, setContextState } = useContext(AppContext);
  return (
    <div className="flex items-center justify-between px-4 lg:px-16 py-2 bg-fg fixed top-0 z-30 w-screen shadow-lg">
      <h1 className="text-sm lg:text-xl font-whacky text-bg">
        Fantom Freido Club
      </h1>
      {/* menu */}
      <div className="flex items-center justify-center">
        <div className="space-x-16 items-center justify-center hidden text-xl flex-1 px-12 lg:flex">
          <Link href="/#mint">
            <div className="text-gray-600 cursor-pointer">Mint</div>
          </Link>
          <Link href="/#attributes">
            <div className="text-gray-600 cursor-pointer">Attributes</div>
          </Link>
          <Link href="/#roadmap">
            <div className="text-gray-600 cursor-pointer">Roadmap</div>
          </Link>
          <Link href="/#lore">
            <div className="text-gray-600 cursor-pointer">Lore</div>
          </Link>
          <Link href="/#faq">
            <div className="text-gray-600 cursor-pointer">FAQ</div>
          </Link>
        </div>
        <div className="px-4 py-2 bg-bg rounded text-fg text-3xl cursor-pointer hover:bg-gray-800">
          {contextState.addr != "" ? trimAddress(contextState.addr) : "Connect"}
        </div>
      </div>
    </div>
  );
}

export default Nav;
