import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  configureChains,
  createClient,
  useAccount,
  useBalance,
  useConnect,
  useNetwork,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { gnosis, mainnet, localhost } from "@wagmi/core/chains";
import { useEffect, useState } from "react";
import { INFURA_ID } from './data/config';
import tokens from './data/addresses.json';
import ShowToken from './components/ShowToken';

const chains = [localhost, mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: INFURA_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function AppMainPart() {
  return (
    <div className="App" style={{textAlign: 'center'}}>
      Your wallet: <span style={{display: 'inline-block'}}><Web3Button /></span>
      {tokens.map(t => <ShowToken key={t.wrapper} wrapped={t.wrapped as `0x${string}`} wrapper={t.wrapper as `0x${string}`}/>)}
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = "Donations - World Science DAO";
  }, []);
  return (
    <div className="App">
      <h1>ERC-777 USD Tokens</h1>
      <WagmiConfig client={wagmiClient}>
        <AppMainPart />
      </WagmiConfig>
      <Web3Modal
        projectId={INFURA_ID}
        ethereumClient={ethereumClient}
      />
    </div>
  );
}

export default App;
