import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameItem", function () {
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GameItem = await ethers.getContractFactory("GameItem");
    const gameitem = await GameItem.deploy();

    return { gameitem, owner, otherAccount };
  }

  describe("Basic Info", function () {
    it("Should return collect name", async function () {
      const { gameitem } = await loadFixture(deployOneYearLockFixture);

      expect(await gameitem.name()).to.equal("GameItem");
    });
    it("Should return collect symbol", async function () {
      const { gameitem } = await loadFixture(deployOneYearLockFixture);

      expect(await gameitem.symbol()).to.equal("ITM");
    });
  });
});
