// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "forge-std/Test.sol";

import "../../contracts/Lock.sol";

contract LockTest is Test {
  Lock l;

  function setUp() public {
    l = new Lock(1659279600 + 365 * 24 * 60 * 60);
  }

  function testExample() public {
    assertTrue(true);
  }
}