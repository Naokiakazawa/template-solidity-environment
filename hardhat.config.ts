import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: {
        mnemonic:
          process.env.MNEMONIC !== undefined
            ? process.env.MNEMONIC
            : "test test test test test test test test test test test junk",
      },
      //accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: { cache: "hardhat-cache" },
  gasReporter: {
    enabled: process.env.GAS_REPORT ? true : false,
  },
};

export default config;
