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
import { gnosis, mainnet } from "@wagmi/core/chains";
import { useEffect, useState } from "react";
import * as dotenv from 'dotenv';

dotenv.config();

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ infuraId: process.env.INFURA_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <div className="App">
      <h1>ERC-777 USD Tokens</h1>
      <Web3Button />
    </div>
  );
}

export default App;
