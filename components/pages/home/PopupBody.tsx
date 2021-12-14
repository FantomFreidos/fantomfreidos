import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "../../../context/AppContext";
import { hashToLink, trimHash } from "../../../utils/functions/utils";

function PopupBody() {
  const { contextState, setContextState } = useContext(AppContext);

  type Popup = {
    isLoading: boolean;
    message: string;
    isError: boolean;
    txHash: string;
    show: boolean;
  };

  function togglePop() {
    const popupState: Popup = {
      isLoading: false,
      isError: false,
      message: "",
      txHash: "",
      show: false,
    };
    setContextState({
      ...contextState,
      showPopup: false,
      popupState,
    });
  }
  return (
    <div className=" flex rounded-2xl flex-col items-center justify-evenly text-spooky text-xl py-12 px-4 space-y-4 w-full max-w-xl bg-white/80 font-halloweek">
      <div className=" flex flex-col items-center justify-center">
        {contextState.popupState.isLoading && (
          <div className="flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-spooky">
              Scanning Freidos...
            </span>
          </div>
        )}
        {contextState.popupState.isError && (
          <div className="flex items-center justify-center flex-col">
            <img src="/assets/images/error.png" alt="" />
            <span className="text-4xl text-red-600 mb-6">ERROR</span>
            <span className="text-2xl font-bold text-black text-center capitalize">
              {contextState.popupState.message}
            </span>
          </div>
        )}
        {!contextState.popupState.isLoading &&
          !contextState.popupState.isError && (
            <div className="flex items-center justify-center flex-col">
              <span className="text-4xl font-bold text-green-600 text-center">
                Scan Succesfull
              </span>
              <div className="flex text-green-400 mt-4 hover:text-gray-600">
                <a
                  href={hashToLink(contextState.popupState.txHash)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {trimHash(contextState.popupState.txHash)}
                </a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          )}
      </div>
      <div className="flex">
        {
          <div
            className="rounded  bg-bg text-fg leading-3 text-center px-6 py-4 font-bold cursor-pointer"
            onClick={() => togglePop()}
          >
            Close
          </div>
        }
        {contextState.txHash != "" && (
          <div className="ml-4 rounded  bg-spooky text-hallow leading-3 text-center px-6 py-4 font-bold cursor-pointer">
            <Link href="/lanterns">View NFT</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupBody;
