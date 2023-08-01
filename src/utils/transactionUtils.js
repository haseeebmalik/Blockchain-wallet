import {  Wallet } from 'ethers';
import { JsonRpcProvider } from "ethers/providers";
import { formatUnits,parseEther } from "ethers/utils";

import { goerli,CHAINS_CONFIG,sepolia } from './chains';

export async function sendToken(
  amount,
  from,
  to,
  privateKey,
) {
console.log("amountIntransactionUtils",amount)
  const chain = CHAINS_CONFIG[sepolia.chainId];
  console.log("chain",chain)

  // Create a provider using the Infura RPC URL for Goerli
  const provider = new JsonRpcProvider(chain.rpcUrl);

  // Create a wallet instance from the sender's private key
  const wallet = new Wallet(privateKey, provider);

  // Construct the transaction object
  const tx = {
    to,
    value: parseEther(amount.toString()),
  
  };

  // Sign the transaction with the sender's wallet
  const transaction = await wallet.sendTransaction(tx);
  console.log("transaction",transaction)
  // Wait for the transaction to be mined
  const receipt = await transaction.wait();
  console.log("receipt",receipt)


  return {transaction, receipt};
}