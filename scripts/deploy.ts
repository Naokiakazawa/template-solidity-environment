import { ethers } from "hardhat";

async function main() {
  const GameItem = await ethers.getContractFactory("GameItem");
  const gameitem = await GameItem.deploy();

  await gameitem.deployed();

  console.log("GameItem contract is deployed to:", gameitem.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
