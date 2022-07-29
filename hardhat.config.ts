import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  paths: { cache: "hardhat-cache" },
  gasReporter: {
    enabled: process.env.GAS_REPORT ? true : false,
  },
};

export default config;
