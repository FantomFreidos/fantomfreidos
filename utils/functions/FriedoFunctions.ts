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

export const freeMintBal = async function (contract: any, addr: string) {
  const hasfree = await contract.freeMintBalance(addr);
  const bal = BigNumber.from(hasfree).toNumber();
  return bal == 1 ? true : false;
};

export const getOwnedIDs = async function (contract: any, addr: string) {
  let ids = await contract.freidosOwned(addr);
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
  let transaction = await contract.buyFreido(amount, overrides);
  let tx = await transaction.wait();

  return tx.transactionHash;
};

export const buyWhitelistFriedo = async function (
  contract: any,
  price: any,
  amount: any
) {
  const totalPrice = (price * amount).toString();
  let overrides = {
    value: ethers.utils.parseEther(totalPrice),
  };
  let transaction = await contract.buyWhitelistedFreido(amount, overrides);
  let tx = await transaction.wait();

  return tx.transactionHash;
};

export const freeMint = async function (contract: any) {
  let transaction = await contract.freeMint();
  let tx = await transaction.wait();
  return tx.transactionHash;
};
