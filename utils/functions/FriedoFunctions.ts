import { ethers, BigNumber, Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { metadataFromId, metadataFromUri } from "./utils";

export const getSupply = async function (contract: any) {
  const totalSupply = await contract.totalSupply();
  return BigNumber.from(totalSupply).toNumber();
};
export const getPrice = async function (contract: any) {
  const price = await contract.price();
  return formatUnits(BigNumber.from(price), 18);
};
export const saleStatus = async function (contract: any) {
  const isPaused = await contract.paused();
  return isPaused;
};

export const getOwnedIDs = async function (contract: any, addr: string) {
  let ids = await contract.lanternsOwned(addr);
  const ownedIds = ids.map((id: any) => BigNumber.from(id).toNumber());
  return ownedIds;
};

export const buyFriedo = async function (
  contract: any,
  price: any,
  amount: any
) {
  const totalPrice = (price * amount).toString();
  let overrides = {
    value: ethers.utils.parseEther(totalPrice),
  };
  let transaction = await contract.buyFriedo(amount, overrides);
  let tx = await transaction.wait();

  return tx.transactionHash;
};
