// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "forge-std/Test.sol";

import "../../contracts/GameItem.sol";

contract LockTest is Test {
  GameItem g;

  function setUp() public {
    g = new GameItem();
  }

  function testExample() public {
    assertTrue(true);
  }
}