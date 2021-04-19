// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Mappings {
    mapping(uint256 => uint256) itemsA;
    mapping(uint256 => uint256) itemsB;    
    
    function map() public {
      itemsA[0xAAAA] = 0xAAAA;
      itemsB[0xBBBB] = 0xBBBB;
    }
}