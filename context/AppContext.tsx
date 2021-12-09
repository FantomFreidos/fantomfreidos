import { ethers } from "ethers";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Popup = {
  isLoading: boolean;
  message: string;
  isError: boolean;
  txHash: string;
  show: boolean;
};

type Context = {
  isLoading: boolean;
  isFantom: boolean;
  showPopup: boolean;
  saleStats: number;
  isPaused: boolean;
  addr: string;
  popupState: Popup;
  price: any;
  currentSupply: number;
  isConnected: boolean;
  frideoContract: any;
  frideoContractSigner: any;
  txHash: string;
};

const initialContext = {
  contextState: {
    isLoading: false,
    isFantom: true,
    showPopup: false,
    isPaused: true,
    addr: "",
    saleStats: 0,
    price: 0,
    currentSupply: 0,
    isConnected: false,
    popupState: {
      isLoading: true,
      txHash: "",
      isError: false,
      message: "",
      show: false,
    },
    frideoContract: null,
    frideoContractSigner: null,
    txHash: "",
  },
  setContextState: (state: Context) => {},
};

const AppContext = createContext(initialContext);

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContextState] = useState(initialContext.contextState);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
