import React,{useState,useEffect} from 'react';
import { formatUnits,parseEther } from "ethers/utils";
import { providers } from 'ethers';
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import web3 from 'web3'
import { configureChains, createConfig, WagmiConfig ,useAccount} from 'wagmi'

import { useSendTransaction, usePrepareSendTransaction,useNetwork } from 'wagmi'
import { sendTransaction, prepareSendTransaction,waitForTransaction ,watchPendingTransactions } from '@wagmi/core'

const GetAccount = () => {

 async function sendThroughEtherjs(){
 let provider = new ethers.BrowserProvider(window.ethereum)
 console.log("provider",provider)
 const { chainId } = await provider.getNetwork()
console.log(chainId) // 42
let signer = await provider.getSigner();
console.log("signer",signer)
let tx = await signer.sendTransaction({
  to: "0xd08C7C3ff3C00Cf12F94A47B68D1BB7b5a88a026",
  value: parseEther("0.00000000000001")
});

// Often you may wish to wait until the transaction is mined
let receipt = await tx.wait();
console.log("receipt",receipt)
  }
    

    
     
    //   const { data, isLoading, isSuccess } =
    //   useSendTransaction(config)
    const {sendTransaction}=useSendTransaction()
const {address  }=useAccount()
const { chain } = useNetwork();

if(address&&chain ){
    console.log('address ',address)
    console.log('chain ',chain )

}

async function send(){
    const recipient = "0xd08C7C3ff3C00Cf12F94A47B68D1BB7b5a88a026"
    const amount = "0.00000001";
    const config = await prepareSendTransaction({
        chainId:11155111,
        account:address,
        to: '0xd08C7C3ff3C00Cf12F94A47B68D1BB7b5a88a026',
        amount
      })
    try {
    //     const tx = await sendTransaction({
    //      to: recipient,
    //       amount,
    // });
   const res=await  sendTransaction({
        chainId:11155111,
        account:address,
        to: '0xd08C7C3ff3C00Cf12F94A47B68D1BB7b5a88a026',
        amount
     }
        )
         

        // const data = await waitForTransaction({
        //     hash,
        //   })
        console.log("data",res)
        console.log('Transaction sent successfully!');
      } catch (error) {
        console.error(error);
      }
}
function test(){
  const transactions = [
    {
    "to": "0x000",
    "from": "0x000",
    "amount": "1"
    },
    {
    "to": "0x000",
    "from": "0x000",
    "amount": "1"
    },
    {
    "to": "0x0001",
    "from": "0x000",
    "amount": "1"
    },
    {
    "to": "0x0001",
    "from": "0x000",
    "amount": "2"
    },
    {
      "to": "0x0001",
      "from": "0x000",
      "amount": "2"
      },
      {
        "to": "0x0002",
        "from": "0x000",
        "amount": "2"
        }
    ];
    const result = {};

    for (const obj of transactions) {
      const toAddress = obj.to;
      const amount = parseInt(obj.amount);
  
      if (result[toAddress]) {
        result[toAddress] += amount;
      } else {
        result[toAddress] = amount;
      }
    }
    console.log("result",result)
  
    const resultList = Object.keys(result).map((address) => ({
      address: address,
      amount: result[address].toString(),
    }));

console.log(resultList);
}




  return (
    <div>
     
   
     {/* <button onClick={send}>sendWithNoReceiptGetting</button> */}
     {/* <button onClick={sendThroughEtherjs}>Trans._from_etherjs</button> */}
     {/* <button onClick={test}>test</button> */}
    </div>
  );
};

export default GetAccount;
