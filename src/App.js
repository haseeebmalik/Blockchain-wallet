
import './App.css';
import React,{useEffect} from 'react';
import AccountCreate from './components/AccountCreate';
//walletconnect imports\
import GetAccount from './GetAccount';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal,Web3Button  } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = "c2ff6bdb476f4effb37476ecf730cbf4"


const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
console.log("wagmiConfig",wagmiConfig)
const ethereumClient = new EthereumClient(wagmiConfig, chains)
console.log("ethereumClient",ethereumClient)
function App() {
 
  useEffect(()=>{
    console.log("projectId",projectId)
   
  },[])
  return (
    <div className="App">
      <div className='p-5 m-3 card shadow'>
     <WagmiConfig config={wagmiConfig}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
     <AccountCreate />
     <Web3Button />
     <GetAccount />
     </div>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
     </div>
    </div>
  );
}

export default App;
