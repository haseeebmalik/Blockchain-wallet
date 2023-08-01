import React, {useEffect, useState} from 'react';
// import ethers from "ethers";
import { JsonRpcProvider } from "ethers/providers";

import { formatUnits } from "ethers/utils";

// const formattedEther = formatUnits(accountBalance, "ether");
import { sendToken } from '../utils/transactionUtils';
import { goerli,sepolia } from '../utils/chains';

import AccountTransactions from './AccountTransactions';
import { toFixedIfNecessary } from '../utils/accountUtils';
import './Account.css';



const AccountDetail = ({account}) => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(account?.balance)

  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
        // const provider = new ethers.provider.JsonRpcProvider(goerli.rpcUrl);
        const provider = new JsonRpcProvider(sepolia.rpcUrl);
        if(account?.address){
        let accountBalance = await provider.getBalance(account.address);
        setBalance((String(toFixedIfNecessary(formatUnits(accountBalance, "ether")))));
    }}
    fetchData();
}, [account?.address])

  function handleDestinationAddressChange(event) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event) {
    // setAmount(Number.parseFloat(event.target.value));
    setAmount(event.target.value)
  }

  async function transfer() {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    try {
      const { receipt } = await sendToken(amount, account?.address, destinationAddress, account?.privateKey);

      if (receipt.status === 1) {
        //https://sepolia.etherscan.io/tx/0x8eed83b5829b790d91fb476cfa81a7228e4560daded01d3812fe438bb434cd08
        // Set the network response status to "complete" and the message to the transaction hash
        setNetworkResponse({
          status: 'complete',
          message: <p>Transfer complete! <a href={`${sepolia.blockExplorerUrl}/tx/${receipt.hash}`} target="_blank" rel="noreferrer">
            View transaction
            </a></p>,
        });
        return receipt;
      } else {
        // Transaction failed
        console.log(`Failed to send ${receipt}`);
        // Set the network response status to "error" and the message to the receipt
        setNetworkResponse({
          status: 'error',
          message: JSON.stringify(receipt),
        });
        return { receipt };
      }
    } catch (error) {
      // An error occurred while sending the transaction
      console.error({ error });
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: 'error',
        message: error.reason || JSON.stringify(error),
      });
    }
  }

  return (
    <div className='AccountDetail container'>
        <h4>
            Address: <a href={`https://goerli.etherscan.io/address/${account?.address}`} target="_blank" rel="noreferrer">
            {account?.address}
            </a><br/>
            Balance: {balance} ETH
        </h4>

        <div className="form-group">
            <label>Destination Address:</label>
            <input
            className="form-control"
            type="text"
            value={destinationAddress}
            onChange={handleDestinationAddressChange}
            />
        </div>

        <div className="form-group">
            <label>Amount:</label>
            <input
            className="form-control"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            />
        </div>

        <button
            className="btn btn-primary"
            type="button"
            onClick={transfer}
            disabled={!amount || networkResponse.status === 'pending'}
        >
            Send {amount} ETH
        </button>

        {networkResponse.status &&
            <>
            {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
            {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
            {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
            </>
        }

        <AccountTransactions account={account} />
    </div>

  )
}

export default AccountDetail;