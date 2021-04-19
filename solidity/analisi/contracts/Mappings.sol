// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default e si può omettere
// pragma experimental ABIEncoderV2;

contract Mappings {
    mapping(uint256 => uint256) itemsA;
    mapping(uint256 => uint256) itemsB;    
    
    function map() public {
      itemsA[0xAAAA] = 0xAAAA;
      itemsB[0xBBBB] = 0xBBBB;
    }
}