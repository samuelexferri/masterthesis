// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract DeadCodeOpaquePredicate {
    function deadCode(uint x) public pure returns (uint out) {
        if(x < 1) {
            if(x > 2) {
                return x;
            }
        }
    }
    
    function opaquePredicate(uint x) public pure returns (uint out) {
        if(x < 1) {
            if(x < 0) {
                return x;
            }
        }
    }
}