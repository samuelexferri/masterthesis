// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MappingsAnnidati {
    struct S { 
        uint128 a; 
        uint128 b; 
        uint256 c;
    }
    
    uint x;
    
    mapping(uint => mapping(uint => S)) data;
}