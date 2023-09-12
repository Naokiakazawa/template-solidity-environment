import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

const mnemonic: string =
  process.env.MNEMONIC !== undefined
    ? process.env.MNEMONIC
    : "test test test test test test test test test test test junk";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    matic: {
      url: `https://rpc-mainnet.maticvigil.com/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    arbitrumGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    arbitrumOne: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: {
        mnemonic: mnemonic,
      },
    },
  },
  paths: { cache: "hardhat-cache" },
  gasReporter: {
    enabled: process.env.GAS_REPORT ? true : false,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY !== undefined ? process.env.ETHERSCAN_KEY : "",
  },
};

export default config;
