import { HardhatUserConfig } from "hardhat/config";
// require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
import { INFURA_ID } from './config';

const config: any /*HardhatUserConfig | { namedAccounts: any }*/ = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: '0x0e206566a53a138f9500dd3ffaf12bbf3c773a34a0e78e6710b0726b82951e6d', // 0xfd95BF6727416050008dB2551c94C86D21bA3b77
          balance: '1188422437713965063903159255040',
        },
        // {
        //   privateKey: '0x3d258b188e1e2bd69821990cc143830ce2be03dc24774c787090de8ef6bca214', // 0x4948C09461d37946Ea13b98d2C3f2D3C185fde2f
        //   balance: '1188422437713965063903159255040',
        // },
        // {
        //   privateKey: '0xdfe891177936f97142e0b8c6eefb7042d051536984a2bf2c46def1f01d37bf87', // 0x5530B1eC2bCD7B2fbDF780Ab5e7A4dE40541F3A8
        //   balance: '276701161105643274240',
        // },
      ],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY] : [],
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
    erc1820Registry: {
      'mainnet': "0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24",
    },
    USDT: {
      'mainnet': "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    USDC: {
      'mainnet': "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
  }
};

module.exports = config;
